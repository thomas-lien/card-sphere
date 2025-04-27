from fastapi import APIRouter, HTTPException, status, Request
from typing import List
from datetime import datetime
from database.friends import friend_requests, friendships
from database.user import user_name

router = APIRouter()

# Add some mock users
user_name = [
    {"id": 1, "name": "John Doe", "email": "JohnDoe@gmail.com"},
    {"id": 2, "name": "Jane Smith", "email": "Jane@gmail.com"},
    {"id": 3, "name": "Alice Johnson", "email": "Alice@gmail.com"},
    {"id": 4, "name": "Bob Brown", "email": "Bob@gmail.com"},
    {"id": 5, "name": "Charlie Davis", "email": "Charlie@gmail.com"},
    {"id": 6, "name": "Eve Adams", "email": "Eve@gmail.com"},
]

# Mock friend requests (id, sender_id, receiver_id, status, created_at)
friend_requests = [
    {"id": 1, "sender_id": 2, "receiver_id": 1, "status": "pending", "created_at": "2024-04-22T09:00:00"},  # Jane -> John
    {"id": 2, "sender_id": 1, "receiver_id": 3, "status": "pending", "created_at": "2024-04-23T09:00:00"},  # John -> Alice
    {"id": 3, "sender_id": 4, "receiver_id": 1, "status": "pending", "created_at": "2024-04-24T09:00:00"},  # Bob -> John
    {"id": 4, "sender_id": 5, "receiver_id": 6, "status": "pending", "created_at": "2024-04-25T09:00:00"},  # Charlie -> Eve
]

# Mock friendships (id, user_id, friend_id, created_at)
friendships = [
    {"id": 1, "user_id": 1, "friend_id": 2, "created_at": "2024-04-20T09:00:00"},  # John & Jane
    {"id": 2, "user_id": 1, "friend_id": 4, "created_at": "2024-04-21T09:00:00"},  # John & Bob
    {"id": 3, "user_id": 3, "friend_id": 6, "created_at": "2024-04-22T09:00:00"},  # Alice & Eve
]

# Mock gift cards (simulate a simple in-memory store)
gift_cards = [
    {"card_code": "GC1", "owner_email": "JohnDoe@gmail.com", "store_location": "Amazon", "balance": 50, "expiry_date": "2024-12-31"},
    {"card_code": "GC4", "owner_email": "JohnDoe@gmail.com", "store_location": "Starbucks", "balance": 15, "expiry_date": "2024-09-30"},
    {"card_code": "GC2", "owner_email": "Jane@gmail.com", "store_location": "Target", "balance": 30, "expiry_date": "2024-11-30"},
    {"card_code": "GC5", "owner_email": "Jane@gmail.com", "store_location": "Best Buy", "balance": 25, "expiry_date": "2024-08-31"},
    {"card_code": "GC3", "owner_email": "Bob@gmail.com", "store_location": "Walmart", "balance": 20, "expiry_date": "2024-10-31"},
    {"card_code": "GC6", "owner_email": "Alice@gmail.com", "store_location": "Apple", "balance": 100, "expiry_date": "2024-12-01"},
    {"card_code": "GC7", "owner_email": "Charlie@gmail.com", "store_location": "Nike", "balance": 40, "expiry_date": "2024-09-15"},
    {"card_code": "GC8", "owner_email": "Eve@gmail.com", "store_location": "Sephora", "balance": 60, "expiry_date": "2024-11-20"},
]

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
    # Return a mock list for demo
    return [
        {"id": 2, "name": "Jane Smith", "email": "Jane@gmail.com", "created_at": "2024-04-20T09:00:00"},
        {"id": 3, "name": "Alice Johnson", "email": "Alice@gmail.com", "created_at": "2024-04-21T09:00:00"},
    ]

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

@router.get("/giftcards")
async def get_gift_cards(email: str):
    # Return all gift cards owned by the user
    cards = [c for c in gift_cards if c["owner_email"].lower() == email.lower()]
    return {"gift_cards": cards}

@router.post("/{card_code}/transfer")
async def transfer_gift_card(card_code: str, email_sender: str, recipient_email: str, request: Request):
    # Find the card
    card = next((c for c in gift_cards if c["card_code"] == card_code and c["owner_email"].lower() == email_sender.lower()), None)
    if not card:
        raise HTTPException(status_code=404, detail="Gift card not found or not owned by sender")
    # Transfer ownership
    card["owner_email"] = recipient_email
    return {"message": f"Gift card {card_code} sent from {email_sender} to {recipient_email}"}