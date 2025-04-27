import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  TextField,
  Alert,
  CircularProgress
} from '@mui/material';
import { CardGiftcard } from '@mui/icons-material';
import axios from 'axios';

const GiftToFriend = ({ card, onGiftSent }) => {
  const [open, setOpen] = useState(false);
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Mock current user for now - replace with actual auth
  useEffect(() => {
    // This should be replaced with your actual auth logic
    setCurrentUser({ id: 1, email: 'user@example.com' });
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchFriends();
    }
  }, [currentUser]);

  const fetchFriends = async () => {
    try {
      const response = await axios.get(`/api/friends/friends/${currentUser.id}`);
      setFriends(response.data);
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
    setError('');
    setSuccess(false);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFriend('');
    setMessage('');
    setError('');
    setSuccess(false);
  };

  const handleSendGift = async () => {
    if (!selectedFriend) {
      setError('Please select a friend to send the gift to');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const friend = friends.find(f => f.id === selectedFriend);
      
      await axios.post(`/api/giftcards/giftcards/${card.card_code}/transfer`, null, {
        params: {
          email_sender: currentUser.email,
          recipient_email: friend.email
        }
      });

      setSuccess(true);
      setTimeout(() => {
        handleClose();
        if (onGiftSent) {
          onGiftSent();
        }
      }, 2000);
    } catch (error) {
      console.error('Error sending gift:', error);
      setError(error.response?.data?.detail || 'Failed to send gift card');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<CardGiftcard />}
        onClick={handleOpen}
        fullWidth
      >
        Gift to Friend
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Send Gift Card to Friend</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Gift card sent successfully!
            </Alert>
          )}

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Gift Card Details:
            </Typography>
            <Typography>
              Balance: ${card.balance}
            </Typography>
            <Typography>
              Store: {card.store_location}
            </Typography>
            <Typography>
              Expires: {new Date(card.expiry_date).toLocaleDateString()}
            </Typography>
          </Box>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="friend-select-label">Select Friend</InputLabel>
            <Select
              labelId="friend-select-label"
              value={selectedFriend}
              label="Select Friend"
              onChange={(e) => setSelectedFriend(e.target.value)}
            >
              {friends.map((friend) => (
                <MenuItem key={friend.id} value={friend.id}>
                  {friend.name || friend.email}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Message (Optional)"
            multiline
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Add a personal message to your gift..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button 
            onClick={handleSendGift} 
            variant="contained" 
            color="primary"
            disabled={loading || !selectedFriend}
            startIcon={loading ? <CircularProgress size={20} /> : <CardGiftcard />}
          >
            {loading ? 'Sending...' : 'Send Gift'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GiftToFriend; 