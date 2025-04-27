"use client"
import React, { useEffect, useState } from "react";

const CURRENT_USER_ID = 1; // Replace with real auth/user context if available
const API_BASE = "http://localhost:8000/api/friends";

type Friend = {
  id: number;
  name?: string;
  email: string;
  created_at: string;
};

type FriendRequest = {
  id: number;
  sender: { name?: string; email: string };
  created_at: string;
};

type PossibleFriend = {
  id: number;
  name?: string;
  email: string;
};

export default function FriendsPage() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [possibleFriends, setPossibleFriends] = useState<PossibleFriend[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [requestedIds, setRequestedIds] = useState<number[]>([]);
  const [showGiftDialog, setShowGiftDialog] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [giftCards, setGiftCards] = useState<any[]>([]);
  const [selectedCard, setSelectedCard] = useState<string>("");

  // Fetch friends, requests, and possible friends
  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const [friendsRes, requestsRes, possibleRes] = await Promise.all([
        fetch(`${API_BASE}/friends/${CURRENT_USER_ID}`).then((r) => r.json()),
        fetch(`${API_BASE}/requests/${CURRENT_USER_ID}`).then((r) => r.json()),
        fetch(`${API_BASE}/possible-friends/${CURRENT_USER_ID}`).then((r) => r.json()),
      ]);
      // Debug log
      console.log("friendsRes", friendsRes, "requestsRes", requestsRes, "possibleRes", possibleRes);
      setFriends(Array.isArray(friendsRes) ? friendsRes : []);
      setRequests(Array.isArray(requestsRes) ? requestsRes : []);
      setPossibleFriends(Array.isArray(possibleRes) ? possibleRes : []);
    } catch (e) {
      setError("Failed to load friends data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Accept friend request
  const handleAccept = async (requestId: number) => {
    setActionLoading(requestId);
    setError("");
    try {
      await fetch(`${API_BASE}/accept-request/${requestId}?user_id=${CURRENT_USER_ID}`, {
        method: "POST",
      });
      // Move the accepted user from requests to friends
      const acceptedRequest = requests.find((r) => r.id === requestId);
      if (acceptedRequest) {
        setFriends((prev) => [
          ...prev,
          {
            id: acceptedRequest.sender.id,
            name: acceptedRequest.sender.name,
            email: acceptedRequest.sender.email,
            created_at: new Date().toISOString(),
          },
        ]);
        setRequests((prev) => prev.filter((r) => r.id !== requestId));
        setPossibleFriends((prev) => prev.filter((u) => u.id !== acceptedRequest.sender.id));
      }
    } catch (e) {
      setError("Failed to accept request.");
    } finally {
      setActionLoading(null);
    }
  };

  // Reject friend request
  const handleReject = async (requestId: number) => {
    setActionLoading(requestId);
    setError("");
    try {
      await fetch(`${API_BASE}/reject-request/${requestId}?user_id=${CURRENT_USER_ID}`, {
        method: "POST",
      });
      setRequests((prev) => prev.filter((r) => r.id !== requestId));
    } catch (e) {
      setError("Failed to reject request.");
    } finally {
      setActionLoading(null);
    }
  };

  // Send friend request
  const handleSendRequest = async (userId: number) => {
    setActionLoading(userId);
    setError("");
    try {
      await fetch(`${API_BASE}/send-request/${userId}?sender_id=${CURRENT_USER_ID}`, {
        method: "POST",
      });
      setRequestedIds((prev) => [...prev, userId]);
      setPossibleFriends((prev) => prev.filter((u) => u.id !== userId));
    } catch (e) {
      setError("Failed to send friend request.");
    } finally {
      setActionLoading(null);
    }
  };

  const fetchGiftCards = async () => {
    // Fetch gift cards owned by CURRENT_USER_ID
    const res = await fetch(`http://localhost:8000/api/giftcards/giftcards?email=JohnDoe@gmail.com`);
    const data = await res.json();
    setGiftCards(data.gift_cards || []);
  };

  const handleOpenGiftDialog = (friend: Friend) => {
    setSelectedFriend(friend);
    setShowGiftDialog(true);
    fetchGiftCards();
  };

  const handleSendGift = async () => {
    if (!selectedFriend || !selectedCard) return;
    await fetch(`http://localhost:8000/api/giftcards/${selectedCard}/transfer?email_sender=JohnDoe@gmail.com&recipient_email=${selectedFriend.email}`, {
      method: "POST",
    });
    setShowGiftDialog(false);
    setSelectedCard("");
    alert("Gift card sent!");
  };

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 24, background: "white", borderRadius: 16, boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}>
      <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, letterSpacing: -1 }}>👫 Friends</h1>
      <p style={{ color: "#666", marginBottom: 32, fontSize: 18 }}>
        Connect, collaborate, and celebrate with your friends! 🚀
      </p>
      {error && <div style={{ color: "red", marginBottom: 16 }}>{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Your Friends</h2>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", marginBottom: 40 }}>
            {friends.length === 0 ? (
              <div style={{ color: "#aaa", fontStyle: "italic" }}>No friends yet. Go make some connections!</div>
            ) : (
              friends.map((friend) => (
                <div key={friend.id} style={{
                  background: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
                  borderRadius: 16,
                  padding: 24,
                  minWidth: 160,
                  textAlign: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}>
                  <div style={{ fontSize: 48, marginBottom: 8 }}>{friend.name?.charAt(0) || friend.email.charAt(0)}</div>
                  <div style={{ fontWeight: 700, fontSize: 20 }}>{friend.name || friend.email}</div>
                  <div style={{ color: "#555", fontSize: 14 }}>Friends since {new Date(friend.created_at).toLocaleDateString()}</div>
                  <button onClick={() => handleOpenGiftDialog(friend)}>Send Gift</button>
                </div>
              ))
            )}
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Pending Friend Requests</h2>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 32 }}>
            {requests.length === 0 ? (
              <div style={{ color: "#aaa", fontStyle: "italic" }}>No pending requests. You're all caught up!</div>
            ) : (
              requests.map((req) => (
                <div key={req.id} style={{
                  background: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
                  borderRadius: 16,
                  padding: 20,
                  minWidth: 140,
                  textAlign: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}>
                  <div style={{ fontSize: 40, marginBottom: 6 }}>{req.sender.name?.charAt(0) || req.sender.email.charAt(0)}</div>
                  <div style={{ fontWeight: 600, fontSize: 18 }}>{req.sender.name || req.sender.email}</div>
                  <div style={{ color: "#888", fontSize: 13, marginBottom: 8 }}>Requested on {new Date(req.created_at).toLocaleDateString()}</div>
                  <button
                    style={{
                      background: "linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)",
                      border: "none",
                      borderRadius: 8,
                      color: "white",
                      fontWeight: 700,
                      padding: "6px 18px",
                      marginRight: 8,
                      cursor: "pointer",
                      transition: "background 0.2s",
                      opacity: actionLoading === req.id ? 0.6 : 1,
                    }}
                    disabled={actionLoading === req.id}
                    onClick={() => handleAccept(req.id)}
                  >
                    {actionLoading === req.id ? "Accepting..." : "Accept"}
                  </button>
                  <button
                    style={{
                      background: "linear-gradient(90deg, #fa709a 0%, #fee140 100%)",
                      border: "none",
                      borderRadius: 8,
                      color: "white",
                      fontWeight: 700,
                      padding: "6px 18px",
                      cursor: "pointer",
                      transition: "background 0.2s",
                      opacity: actionLoading === req.id ? 0.6 : 1,
                    }}
                    disabled={actionLoading === req.id}
                    onClick={() => handleReject(req.id)}
                  >
                    {actionLoading === req.id ? "Rejecting..." : "Reject"}
                  </button>
                </div>
              ))
            )}
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Find New Friends</h2>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 32 }}>
            {possibleFriends.length === 0 ? (
              <div style={{ color: "#aaa", fontStyle: "italic" }}>No users available to add as friends.</div>
            ) : (
              possibleFriends.map((user) => (
                <div key={user.id} style={{
                  background: "linear-gradient(135deg, #c2e9fb 0%, #a1c4fd 100%)",
                  borderRadius: 16,
                  padding: 20,
                  minWidth: 140,
                  textAlign: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}>
                  <div style={{ fontSize: 40, marginBottom: 6 }}>{user.name?.charAt(0) || user.email.charAt(0)}</div>
                  <div style={{ fontWeight: 600, fontSize: 18 }}>{user.name || user.email}</div>
                  <button
                    style={{
                      background: requestedIds.includes(user.id)
                        ? "linear-gradient(90deg, #b2fefa 0%, #0ed2f7 100%)"
                        : "linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)",
                      border: "none",
                      borderRadius: 8,
                      color: "white",
                      fontWeight: 700,
                      padding: "6px 18px",
                      marginTop: 8,
                      cursor: requestedIds.includes(user.id) ? "not-allowed" : "pointer",
                      transition: "background 0.2s",
                      opacity: actionLoading === user.id ? 0.6 : 1,
                    }}
                    disabled={actionLoading === user.id || requestedIds.includes(user.id)}
                    onClick={() => handleSendRequest(user.id)}
                  >
                    {requestedIds.includes(user.id)
                      ? "Requested!"
                      : actionLoading === user.id
                      ? "Sending..."
                      : "Add Friend"}
                  </button>
                </div>
              ))
            )}
          </div>
        </>
      )}
      {showGiftDialog && (
        <div style={{ background: "#fff", border: "1px solid #ccc", padding: 24, borderRadius: 12, position: "fixed", top: "30%", left: "50%", transform: "translate(-50%, -30%)", zIndex: 1000 }}>
          <h3>Send Gift Card to {selectedFriend?.name || selectedFriend?.email}</h3>
          <select value={selectedCard} onChange={e => setSelectedCard(e.target.value)}>
            <option value="">Select a card</option>
            {giftCards.map(card => (
              <option key={card.card_code} value={card.card_code}>
                {card.store_location} (${card.balance}) - Expires {new Date(card.expiry_date).toLocaleDateString()}
              </option>
            ))}
          </select>
          <div style={{ marginTop: 16 }}>
            <button onClick={handleSendGift} disabled={!selectedCard}>Send</button>
            <button onClick={() => setShowGiftDialog(false)} style={{ marginLeft: 8 }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
} 