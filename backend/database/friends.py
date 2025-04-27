# Store friend requests and friendships in memory
friend_requests = [
    {
        "id": 1,
        "sender_id": 2,  # Jane Smith
        "receiver_id": 1,  # John Doe
        "status": "pending",
        "created_at": "2024-04-27T10:00:00"
    },
    {
        "id": 2,
        "sender_id": 3,  # Alice Johnson
        "receiver_id": 1,  # John Doe
        "status": "pending",
        "created_at": "2024-04-27T11:00:00"
    }
]

friendships = [
    {
        "id": 1,
        "user_id": 1,  # John Doe
        "friend_id": 4,  # Bob Brown
        "created_at": "2024-04-20T09:00:00"
    },
    {
        "id": 2,
        "user_id": 1,  # John Doe
        "friend_id": 5,  # Charlie Davis
        "created_at": "2024-04-21T09:00:00"
    }
]

# Example friend request structure:
# {
#     "id": 1,
#     "sender_id": 1,
#     "receiver_id": 2,
#     "status": "pending",  # pending, accepted, rejected
#     "created_at": "2024-03-20T10:00:00"
# }

# Example friendship structure:
# {
#     "id": 1,
#     "user_id": 1,
#     "friend_id": 2,
#     "created_at": "2024-03-20T10:00:00"
# } 