from fastapi import APIRouter, HTTPException, status
from typing import List
from datetime import datetime
from database.friends import friend_requests, friendships
from database.user import user_name

router = APIRouter()

@router.post("/send-request/{receiver_id}")
async def send_friend_request(receiver_id: int, sender_id: int):
    # Check if sender exists
    sender = next((user for user in user_name if user["id"] == sender_id), None)
    if not sender:
        raise HTTPException(status_code=404, detail="Sender not found")
    
    # Check if receiver exists
    receiver = next((user for user in user_name if user["id"] == receiver_id), None)
    if not receiver:
        raise HTTPException(status_code=404, detail="Receiver not found")
    
    if sender_id == receiver_id:
        raise HTTPException(status_code=400, detail="Cannot send friend request to yourself")
    
    # Check if request already exists
    existing_request = next(
        (req for req in friend_requests 
         if ((req["sender_id"] == sender_id and req["receiver_id"] == receiver_id) or
             (req["sender_id"] == receiver_id and req["receiver_id"] == sender_id)) and
         req["status"] == "pending"),
        None
    )
    
    if existing_request:
        raise HTTPException(status_code=400, detail="Friend request already exists")
    
    # Check if already friends
    existing_friendship = next(
        (friendship for friendship in friendships
         if ((friendship["user_id"] == sender_id and friendship["friend_id"] == receiver_id) or
             (friendship["user_id"] == receiver_id and friendship["friend_id"] == sender_id))),
        None
    )
    
    if existing_friendship:
        raise HTTPException(status_code=400, detail="Already friends")
    
    # Create new friend request
    new_request = {
        "id": len(friend_requests) + 1,
        "sender_id": sender_id,
        "receiver_id": receiver_id,
        "status": "pending",
        "created_at": datetime.now().isoformat()
    }
    
    friend_requests.append(new_request)
    return {"message": "Friend request sent successfully", "request": new_request}

@router.post("/accept-request/{request_id}")
async def accept_friend_request(request_id: int, user_id: int):
    # Find the request
    request = next((req for req in friend_requests if req["id"] == request_id), None)
    if not request:
        raise HTTPException(status_code=404, detail="Friend request not found")
    
    if request["receiver_id"] != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to accept this request")
    
    if request["status"] != "pending":
        raise HTTPException(status_code=400, detail="Request is not pending")
    
    # Create friendship
    new_friendship = {
        "id": len(friendships) + 1,
        "user_id": request["sender_id"],
        "friend_id": request["receiver_id"],
        "created_at": datetime.now().isoformat()
    }
    
    friendships.append(new_friendship)
    
    # Update request status
    request["status"] = "accepted"
    
    return {"message": "Friend request accepted", "friendship": new_friendship}

@router.post("/reject-request/{request_id}")
async def reject_friend_request(request_id: int, user_id: int):
    # Find the request
    request = next((req for req in friend_requests if req["id"] == request_id), None)
    if not request:
        raise HTTPException(status_code=404, detail="Friend request not found")
    
    if request["receiver_id"] != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to reject this request")
    
    if request["status"] != "pending":
        raise HTTPException(status_code=400, detail="Request is not pending")
    
    # Update request status
    request["status"] = "rejected"
    
    return {"message": "Friend request rejected"}

@router.get("/requests/{user_id}")
async def get_friend_requests(user_id: int):
    # Get all pending requests for the user
    user_requests = [
        req for req in friend_requests
        if req["receiver_id"] == user_id and req["status"] == "pending"
    ]
    
    # Add sender information to each request
    requests_with_sender = []
    for req in user_requests:
        sender = next((user for user in user_name if user["id"] == req["sender_id"]), None)
        if sender:
            requests_with_sender.append({
                "id": req["id"],
                "sender": {
                    "id": sender["id"],
                    "email": sender["email"],
                    "name": sender.get("name", "")
                },
                "created_at": req["created_at"]
            })
    
    return requests_with_sender

@router.get("/friends/{user_id}")
async def get_friends(user_id: int):
    # Get all friendships for the user
    user_friendships = [
        friendship for friendship in friendships
        if friendship["user_id"] == user_id or friendship["friend_id"] == user_id
    ]
    
    # Add friend information to each friendship
    friends_list = []
    for friendship in user_friendships:
        friend_id = friendship["friend_id"] if friendship["user_id"] == user_id else friendship["user_id"]
        friend = next((user for user in user_name if user["id"] == friend_id), None)
        if friend:
            friends_list.append({
                "id": friend["id"],
                "email": friend["email"],
                "name": friend.get("name", ""),
                "created_at": friendship["created_at"]
            })
    
    return friends_list

@router.get("/possible-friends/{user_id}")
async def get_possible_friends(user_id: int):
    # Get all user IDs that are already friends with the user
    friend_ids = set()
    for friendship in friendships:
        if friendship["user_id"] == user_id:
            friend_ids.add(friendship["friend_id"])
        elif friendship["friend_id"] == user_id:
            friend_ids.add(friendship["user_id"])
    # Exclude self and current friends
    possible = [
        {"id": user["id"], "name": user["name"], "email": user["email"]}
        for user in user_name
        if user["id"] != user_id and user["id"] not in friend_ids
    ]
    return possible 