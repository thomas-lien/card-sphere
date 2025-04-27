import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Paper, 
  TextField, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  FormControlLabel,
  Switch,
  CircularProgress,
  Alert
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import axios from 'axios';
import GiftCard from '../components/GiftCard';

const GiftCards = () => {
  const [giftCards, setGiftCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newCard, setNewCard] = useState({
    card_code: '',
    balance: '',
    active: true,
    expiry_date: '',
    store_location: ''
  });
  const [addError, setAddError] = useState('');
  const [addLoading, setAddLoading] = useState(false);
  
  // Mock current user for now - replace with actual auth
  const currentUser = { id: 1, email: 'user@example.com' };
  
  useEffect(() => {
    fetchGiftCards();
  }, []);
  
  const fetchGiftCards = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`/api/giftcards/giftcards?email=${currentUser.email}`);
      setGiftCards(response.data.gift_cards || []);
    } catch (error) {
      console.error('Error fetching gift cards:', error);
      setError('Failed to load gift cards. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
    setAddError('');
  };
  
  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewCard({
      card_code: '',
      balance: '',
      active: true,
      expiry_date: '',
      store_location: ''
    });
  };
  
  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setNewCard({
      ...newCard,
      [name]: name === 'active' ? checked : value
    });
  };
  
  const handleAddCard = async () => {
    // Validate inputs
    if (!newCard.card_code || !newCard.balance || !newCard.expiry_date || !newCard.store_location) {
      setAddError('Please fill in all required fields');
      return;
    }
    
    setAddLoading(true);
    setAddError('');
    
    try {
      await axios.post('/api/giftcards/giftcards', null, {
        params: {
          card_code: newCard.card_code,
          balance: parseFloat(newCard.balance),
          active: newCard.active,
          email: currentUser.email,
          date: newCard.expiry_date,
          store_location: newCard.store_location
        }
      });
      
      handleCloseAddDialog();
      fetchGiftCards();
    } catch (error) {
      console.error('Error adding gift card:', error);
      setAddError(error.response?.data?.detail || 'Failed to add gift card. Please try again.');
    } finally {
      setAddLoading(false);
    }
  };
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          My Gift Cards
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleOpenAddDialog}
        >
          Add Gift Card
        </Button>
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {giftCards.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            You don't have any gift cards yet
          </Typography>
          <Typography color="text.secondary" paragraph>
            Add your first gift card to start managing them all in one place.
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={handleOpenAddDialog}
          >
            Add Gift Card
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {giftCards.map((card) => (
            <Grid item xs={12} sm={6} md={4} key={card.card_code}>
              <GiftCard card={card} onRefresh={fetchGiftCards} />
            </Grid>
          ))}
        </Grid>
      )}
      
      {/* Add Gift Card Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Gift Card</DialogTitle>
        <DialogContent>
          {addError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {addError}
            </Alert>
          )}
          
          <TextField
            autoFocus
            margin="dense"
            name="card_code"
            label="Card Code"
            type="text"
            fullWidth
            variant="outlined"
            value={newCard.card_code}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          
          <TextField
            margin="dense"
            name="balance"
            label="Balance"
            type="number"
            fullWidth
            variant="outlined"
            value={newCard.balance}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          
          <TextField
            margin="dense"
            name="store_location"
            label="Store Location"
            type="text"
            fullWidth
            variant="outlined"
            value={newCard.store_location}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          
          <TextField
            margin="dense"
            name="expiry_date"
            label="Expiry Date"
            type="date"
            fullWidth
            variant="outlined"
            value={newCard.expiry_date}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 2 }}
          />
          
          <FormControlLabel
            control={
              <Switch
                checked={newCard.active}
                onChange={handleInputChange}
                name="active"
                color="primary"
              />
            }
            label="Active"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog} disabled={addLoading}>
            Cancel
          </Button>
          <Button 
            onClick={handleAddCard} 
            variant="contained" 
            color="primary"
            disabled={addLoading}
          >
            {addLoading ? 'Adding...' : 'Add Card'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GiftCards; 