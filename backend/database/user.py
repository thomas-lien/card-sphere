from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    email: str

class UserResponse(UserCreate):
    id: int

    class Config:
        orm_mode = True

user_name = [
    {
        "id": 1,
        "name": "John Doe",
        "password": "password123",
        "isVendor": False,
        "email": "JohnDoe@gmail.com",
        "giftCardOwned": [
            "ABC123",
            "XYZ456",
        ],
        "history": [],
        "user_balance": 0.0,
    },
    {
        "id": 2,
        "name": "Jane Smith",
        "password": "password456",
        "isVendor": True,
        "email": "Jane@gmail.com",
        "giftCardOwned": [
            "LMN789",
            "DEF012",
        ],
        "history": [],
        "user_balance": 0.0,
    },
    {
        "id": 3,
        "name": "Alice Johnson",
        "password": "password789",
        "isVendor": False,
        "email": "Alice@gmail.com",
        "giftCardOwned": [
            "GHI345",
            "JKL678",
        ],
        "history": [],
        "user_balance": 0.0,
    },
    {
        "id": 4,
        "name": "Bob Brown",
        "password": "password012",
        "isVendor": True,
        "email": "Bob@gmail.com",
        "giftCardOwned": [
            "MNO901",
            "PQR234",
        ],
        "history": [],
        "user_balance": 0.0,
    },
    {
        "id": 5,
        "name": "Charlie Davis",
        "password": "password345",
        "isVendor": False,
        "email": "Charlie@gmail.com",
        "giftCardOwned": [
            "STU567",
            "VWX890",
        ],
        "history": [],
        "user_balance": 0.0,
    }
]

