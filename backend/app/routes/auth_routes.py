from fastapi import APIRouter, HTTPException, Body
from fastapi.responses import JSONResponse
from database.user import user_name
from pydantic import BaseModel
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Method	Endpoint	Purpose
# POST	/register	Register a new user account (email, password)
# POST	/login	Login user and get JWT token
# POST	/connect-wallet	Connect Ethereum wallet address

class LoginRequest(BaseModel):
    username: str
    password: str

auth_router = APIRouter()  # Renamed from 'router' to 'auth_router'

@auth_router.post("/register")
def register(email: str, name: str, user_name: list, password: str, isVendor: bool):
    logger.info(f"Attempting to register new user: {name} with email: {email}")
    user = {
        "id": len(user_name) + 1,
        "name": name,
        "password": password,
        "isVendor": isVendor,
        "email": email,
        "giftCardOwned": [],
        "history": [],
        "balance": 0.0,
    }
    user_name.append(user)
    logger.info(f"Successfully registered user: {name}")
    return JSONResponse(status_code=200, content={"message": "User registered successfully", "user": user})


@auth_router.post("/login")
def login(login_data: LoginRequest = Body(...)):
    logger.info(f"Login attempt for username: {login_data.username}")
    logger.info(f"Available users in database: {[user['name'] for user in user_name]}")
    
    for user in user_name:
        logger.info(f"Checking user: {user['name']}")
        if user["name"] == login_data.username and user["password"] == login_data.password:
            logger.info(f"Login successful for user: {login_data.username}")
            return JSONResponse(status_code=200, content={"message": "Login successful", "user": user})
    
    logger.warning(f"Login failed for username: {login_data.username}")
    raise HTTPException(status_code=401, detail="Invalid username or password")
