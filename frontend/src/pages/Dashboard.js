import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Card, 
  CardContent, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  Divider,
  CircularProgress
} from '@mui/material';
import { 
  CardGiftcard as GiftCardIcon,
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [giftCards, setGiftCards] = useState([]);
  const [friends, setFriends] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);
  
  // Mock current user for now - replace with actual auth
  const currentUser = { id: 1, email: 'user@example.com' };
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch gift cards
        const giftCardsResponse = await axios.get(`/api/giftcards/giftcards?email=${currentUser.email}`);
        setGiftCards(giftCardsResponse.data.gift_cards || []);
        
        // Calculate total balance
        const balance = giftCardsResponse.data.gift_cards.reduce((sum, card) => sum + card.balance, 0);
        setTotalBalance(balance);
        
        // Fetch friends
        const friendsResponse = await axios.get(`/api/friends/friends/${currentUser.id}`);
        setFriends(friendsResponse.data || []);
        
        // Mock recent activity
        setRecentActivity([
          { id: 1, type: 'received', description: 'Received a $50 gift card from John', date: '2023-06-15' },
          { id: 2, type: 'sent', description: 'Sent a $30 gift card to Sarah', date: '2023-06-10' },
          { id: 3, type: 'added', description: 'Added a new gift card', date: '2023-06-05' },
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [currentUser]);
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={4}>
          <Paper 
            sx={{ 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column', 
              height: 140,
              bgcolor: '#e3f2fd'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <GiftCardIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">Gift Cards</Typography>
            </Box>
            <Typography variant="h4" component="div" sx={{ mb: 1 }}>
              {giftCards.length}
            </Typography>
            <Typography color="text.secondary">
              Total Balance: ${totalBalance.toFixed(2)}
            </Typography>
            <Button 
              component={Link} 
              to="/giftcards" 
              sx={{ mt: 'auto' }}
            >
              View All
            </Button>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper 
            sx={{ 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column', 
              height: 140,
              bgcolor: '#f3e5f5'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PeopleIcon sx={{ mr: 1, color: 'secondary.main' }} />
              <Typography variant="h6">Friends</Typography>
            </Box>
            <Typography variant="h4" component="div" sx={{ mb: 1 }}>
              {friends.length}
            </Typography>
            <Typography color="text.secondary">
              Connect with friends
            </Typography>
            <Button 
              component={Link} 
              to="/friends" 
              sx={{ mt: 'auto' }}
            >
              View Friends
            </Button>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper 
            sx={{ 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column', 
              height: 140,
              bgcolor: '#e8f5e9'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TrendingUpIcon sx={{ mr: 1, color: 'success.main' }} />
              <Typography variant="h6">Activity</Typography>
            </Box>
            <Typography variant="h4" component="div" sx={{ mb: 1 }}>
              {recentActivity.length}
            </Typography>
            <Typography color="text.secondary">
              Recent transactions
            </Typography>
            <Button 
              sx={{ mt: 'auto' }}
            >
              View Activity
            </Button>
          </Paper>
        </Grid>
        
        {/* Recent Activity */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <List>
              {recentActivity.map((activity, index) => (
                <React.Fragment key={activity.id}>
                  <ListItem>
                    <ListItemText 
                      primary={activity.description} 
                      secondary={new Date(activity.date).toLocaleDateString()} 
                    />
                  </ListItem>
                  {index < recentActivity.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
        
        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button 
                variant="contained" 
                component={Link} 
                to="/giftcards"
                startIcon={<GiftCardIcon />}
              >
                Add Gift Card
              </Button>
              <Button 
                variant="outlined" 
                component={Link} 
                to="/friends"
                startIcon={<PeopleIcon />}
              >
                Find Friends
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 