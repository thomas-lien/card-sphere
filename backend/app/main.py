from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import models
from app.routes.profile_routes import profile_router
from app.routes.vendor_routes import vendor_router
from app.routes.campaign_routes import campaign_router
from app.routes.giftcard_routes import giftcard_router
from app.routes.auth_routes import auth_router
from app.routes.security import security_router
from app.routes.friend_routes import router as friend_router

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(profile_router, prefix="/profile", tags=["Profile"])
app.include_router(vendor_router, prefix="/vendor", tags=["Vendor"])
app.include_router(campaign_router, prefix="/campaign", tags=["Campaign"])
app.include_router(giftcard_router, prefix="/giftcard", tags=["GiftCard"])
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(security_router, prefix="/security", tags=["Security"])
app.include_router(friend_router, prefix="/api/friends", tags=["Friends"])


@app.get("/")
def read_root():
    return {"Hello": "World"}


