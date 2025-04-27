import React, { useState, useEffect } from 'react';
import { Box, Typography, Tabs, Tab, Button, Avatar, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, Divider, Paper, TextField, IconButton } from '@mui/material';
import { PersonAdd, Check, Close, Search } from '@mui/icons-material';
import axios from 'axios';

const Friends = () => {
  const [tabValue, setTabValue] = useState(0);
  const [friendRequests, setFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Mock current user for now - replace with actual auth
  useEffect(() => {
    // This should be replaced with your actual auth logic
    setCurrentUser({ id: 1, email: 'user@example.com' });
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchFriendRequests();
      fetchFriends();
    }
  }, [currentUser]);

  const fetchFriendRequests = async () => {
    try {
      const response = await axios.get(`/api/friends/requests/${currentUser.id}`);
      setFriendRequests(response.data);
    } catch (error) {
      console.error('Error fetching friend requests:', error);
    }
  };

  const fetchFriends = async () => {
    try {
      const response = await axios.get(`/api/friends/friends/${currentUser.id}`);
      setFriends(response.data);
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      await axios.post(`/api/friends/accept-request/${requestId}?user_id=${currentUser.id}`);
      fetchFriendRequests();
      fetchFriends();
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      await axios.post(`/api/friends/reject-request/${requestId}?user_id=${currentUser.id}`);
      fetchFriendRequests();
    } catch (error) {
      console.error('Error rejecting friend request:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      // This should be replaced with your actual search API
      const response = await axios.get(`/api/users/search?query=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const handleSendFriendRequest = async (userId) => {
    try {
      await axios.post(`/api/friends/send-request/${userId}?sender_id=${currentUser.id}`);
      setSearchQuery('');
      setSearchResults([]);
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Friends
      </Typography>

      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Friends" />
        <Tab label="Friend Requests" />
        <Tab label="Find Friends" />
      </Tabs>

      {tabValue === 0 && (
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Your Friends
          </Typography>
          {friends.length === 0 ? (
            <Typography color="textSecondary">You don't have any friends yet.</Typography>
          ) : (
            <List>
              {friends.map((friend) => (
                <React.Fragment key={friend.id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>{friend.name?.charAt(0) || friend.email.charAt(0)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={friend.name || friend.email} 
                      secondary={`Friends since ${new Date(friend.created_at).toLocaleDateString()}`} 
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          )}
        </Paper>
      )}

      {tabValue === 1 && (
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Friend Requests
          </Typography>
          {friendRequests.length === 0 ? (
            <Typography color="textSecondary">No pending friend requests.</Typography>
          ) : (
            <List>
              {friendRequests.map((request) => (
                <React.Fragment key={request.id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>{request.sender.name?.charAt(0) || request.sender.email.charAt(0)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={request.sender.name || request.sender.email} 
                      secondary={`Requested on ${new Date(request.created_at).toLocaleDateString()}`} 
                    />
                    <ListItemSecondaryAction>
                      <IconButton 
                        edge="end" 
                        color="primary" 
                        onClick={() => handleAcceptRequest(request.id)}
                        sx={{ mr: 1 }}
                      >
                        <Check />
                      </IconButton>
                      <IconButton 
                        edge="end" 
                        color="error" 
                        onClick={() => handleRejectRequest(request.id)}
                      >
                        <Close />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          )}
        </Paper>
      )}

      {tabValue === 2 && (
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Find Friends
          </Typography>
          <Box sx={{ display: 'flex', mb: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search by name or email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ mr: 1 }}
            />
            <Button 
              variant="contained" 
              startIcon={<Search />}
              onClick={handleSearch}
            >
              Search
            </Button>
          </Box>
          
          {searchResults.length > 0 && (
            <List>
              {searchResults.map((user) => (
                <React.Fragment key={user.id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>{user.name?.charAt(0) || user.email.charAt(0)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={user.name || user.email} 
                    />
                    <ListItemSecondaryAction>
                      <Button
                        variant="outlined"
                        startIcon={<PersonAdd />}
                        onClick={() => handleSendFriendRequest(user.id)}
                      >
                        Add Friend
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          )}
          
          {searchQuery && searchResults.length === 0 && (
            <Typography color="textSecondary" align="center">
              No users found matching your search.
            </Typography>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default Friends; 