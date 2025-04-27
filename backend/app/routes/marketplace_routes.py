from fastapi import APIRouter, HTTPException
from database.giftcards import gift_cards
from fastapi.responses import JSONResponse
from database.user import user_name


# Method	Endpoint	Purpose
# POST	/redeem	Redeem a gift card via QR or NFC scan

router = APIRouter()

@router.get("/giftcards")
def get_giftcards(vendor_id: str):
    for user in user_name:
        if user["email"] == vendor_id:
            return JSONResponse(status_code=200, content={"message": "Gift cards retrieved successfully", "gift_cards": user["giftCardOwned"]})
    raise HTTPException(status_code=404, detail="No gift cards found for this email")

@router.post("/giftcards")
def put_giftcards(email: str, card_code: str, balance: float, active: bool,id:str,date: str, store_location: str):
    for user in user_name:
        if user["email"] == email:
            new_card = {
                "gift_card_id":id,
                "vendor_id": user["id"],
                "balance": balance,
                "active": active,
                "expiry_date": date,
                "store_location": store_location,
            }
            user["giftCardOwned"].append(new_card)
            return JSONResponse(status_code=201, content={"message": "Gift card added successfully", "gift_card": new_card})
    raise HTTPException(status_code=404, detail="User not found")
    
