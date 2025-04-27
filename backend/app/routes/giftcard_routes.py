from fastapi import APIRouter, HTTPException
from database.giftcards import gift_cards
from fastapi.responses import JSONResponse
from database.user import user_name
from datetime import datetime

# Method	Endpoint	Purpose
# GET	/giftcards/	List all user's gift cards
# POST	/giftcards/	Add a new gift card manually
# POST	/giftcards/scan	Scan QR or NFC to import a gift card
# GET	/giftcards/{card_id}	View details of a specific card (vendor, value, expiration)
# DELETE	/giftcards/{card_id}	Delete a card (optional)
# POST	/giftcards/{card_id}/transfer	Send/gift a card to another user

giftcard_router = APIRouter()  # Renamed from 'router' to 'giftcard_router'

@giftcard_router.get("/giftcards")
def get_cards_owned(email: str):
    for user in user_name:
        if user["email"] == email:
            return JSONResponse(status_code=200, content={"message": "Gift cards retrieved successfully", "gift_cards": user["giftCardOwned"]})
    raise HTTPException(status_code=404, detail="No gift cards found for this email")

@giftcard_router.post("/giftcards")
def add_card(card_code: str, balance: float, active: bool, email: str,date: str, store_location: str):
    for user in user_name:
        if user["email"] == email:
            new_card = {
                "card_code": card_code,
                "vendor_id": user["id"],
                "balance": balance,
                "active": active,
                "expiry_date": date,
                "store_location": store_location,
            }
            user["giftCardOwned"].append(new_card)
            return JSONResponse(status_code=201, content={"message": "Gift card added successfully", "gift_card": new_card})
    raise HTTPException(status_code=404, detail="User not found")

@giftcard_router.get("/giftcards/{card_id}")
def get_giftcard(card_id: int):
    for card in gift_cards:
        if card["gift_card_id"] == card_id:
            return JSONResponse(status_code=200, content={"message": "Gift card retrieved successfully", "gift_card": card})
    raise HTTPException(status_code=404, detail="Gift card not found")

@giftcard_router.post("/giftcaards/{card_id}/transfer")
def transfer_giftcard(card_id: int, email_sender: str, recipient_email: str):
    """Transfer gift card from one user to another"""
    card = None
    user_send = None
    for card_ in gift_cards:
        if card_["gift_card_id"] == card_id:
            card = card_
            break

    if card is None:
        raise HTTPException(status_code=404, detail="Gift card not found")
    for user in user_name:
        if user["email"] == email_sender:
            user_send = user
            user["giftCardOwned"].remove(card)
            user["user_balance"] += card["balance"]
            user["history"].append({"card": card, "action": "transferred","time": datetime.now()})
            break
    for user in user_name:
        if user["email"] == recipient_email:
            if user["user_balance"] < card["balance"]:
                raise HTTPException(status_code=400, detail="Insufficient balance to transfer gift card")
            user["giftCardOwned"].append(card)
            user["user_balance"] -= card["balance"]
            user["history"].append({"card": card, "action": "received","vendor":user,"time": datetime.now()})
            return JSONResponse(status_code=200, content={"message": "Gift card transferred successfully", "gift_card": card})
    raise HTTPException(status_code=404, detail="Recipient not found")



