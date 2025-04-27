import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  Store as StoreIcon, 
  AccessTime as AccessTimeIcon,
  CardGiftcard as GiftIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import GiftToFriend from './GiftToFriend';

const GiftCard = ({ card, onRefresh }) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  
  const handleDetailsOpen = () => {
    setDetailsOpen(true);
  };
  
  const handleDetailsClose = () => {
    setDetailsOpen(false);
  };
  
  const handleGiftSent = () => {
    if (onRefresh) {
      onRefresh();
    }
  };
  
  // Format date to be more readable
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Calculate days until expiry
  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const daysUntilExpiry = getDaysUntilExpiry(card.expiry_date);
  const isExpiringSoon = daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  const isExpired = daysUntilExpiry <= 0;
  
  return (
    <>
      <Card 
        sx={{ 
          mb: 2, 
          position: 'relative',
          border: isExpiringSoon ? '1px solid #ff9800' : '1px solid #e0e0e0',
          borderRadius: 2,
          boxShadow: 2,
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 4
          }
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              {card.store_location}
            </Typography>
            <Box>
              {isExpiringSoon && (
                <Chip 
                  label={`Expires in ${daysUntilExpiry} days`} 
                  color="warning" 
                  size="small" 
                  sx={{ mr: 1 }}
                />
              )}
              {isExpired && (
                <Chip 
                  label="Expired" 
                  color="error" 
                  size="small" 
                  sx={{ mr: 1 }}
                />
              )}
              <Chip 
                label={`$${card.balance.toFixed(2)}`} 
                color="primary" 
                size="small"
              />
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <StoreIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {card.store_location}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <AccessTimeIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              Expires: {formatDate(card.expiry_date)}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button 
              variant="outlined" 
              size="small" 
              startIcon={<InfoIcon />}
              onClick={handleDetailsOpen}
            >
              Details
            </Button>
            
            <GiftToFriend card={card} onGiftSent={handleGiftSent} />
          </Box>
        </CardContent>
      </Card>
      
      <Dialog open={detailsOpen} onClose={handleDetailsClose} maxWidth="sm" fullWidth>
        <DialogTitle>Gift Card Details</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Store: {card.store_location}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Balance: ${card.balance.toFixed(2)}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Expiry Date: {formatDate(card.expiry_date)}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Card Code: {card.card_code}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Status: {card.active ? 'Active' : 'Inactive'}
            </Typography>
          </Box>
          
          {isExpiringSoon && (
            <Box sx={{ bgcolor: '#fff3e0', p: 2, borderRadius: 1, mb: 2 }}>
              <Typography variant="body2" color="warning.dark">
                This gift card will expire in {daysUntilExpiry} days. Consider using it soon!
              </Typography>
            </Box>
          )}
          
          {isExpired && (
            <Box sx={{ bgcolor: '#ffebee', p: 2, borderRadius: 1, mb: 2 }}>
              <Typography variant="body2" color="error">
                This gift card has expired and cannot be used.
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDetailsClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GiftCard; 