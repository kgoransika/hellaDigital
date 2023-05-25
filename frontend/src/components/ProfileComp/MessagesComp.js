import React, { useState, useEffect } from 'react';

export default function MessagesComp() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const div1Style = {
    padding: '20px',
    width: '100%',
    height: '60vh',
    margin: '20px',
    border: '1px solid #dee2e6',
    boxShadow: '0 0 1px 1px #dee2e6',
    borderRadius: '10px',
  };

  const div2Style = {
    padding: '20px',
    width: '40%',
    height: '60vh',
    margin: '20px',
    float: 'right',
    border: '1px solid #dee2e6',
    boxShadow: '0 0 1px 1px #dee2e6',
    borderRadius: '10px',
  };

  // Fetch the list of users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch the list of users from the API
  const fetchUsers = () => {
    // Make an API request to get the list of users
    // Replace this with your actual API endpoint
    fetch('/api/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  };

  // Fetch the messages for the selected user
  const fetchMessages = (userId) => {
    // Make an API request to get the messages for the selected user
    // Replace this with your actual API endpoint
    fetch(`/api/messages/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setMessages(data.messages);
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
      });
  };

  // Handle user selection
  const handleUserSelect = (userId) => {
    setSelectedUser(userId);
    fetchMessages(userId);
  };

  // Handle sending a new message
  const handleSendMessage = () => {
    // Make an API request to send the new message
    // Replace this with your actual API endpoint and payload
    fetch(`/api/messages/${selectedUser}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: newMessage }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Clear the new message input
        setNewMessage('');

        // Refresh the messages for the selected user
        fetchMessages(selectedUser);
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });
  };

  return (
    <>
      <div className="mt-20 ml-20 mr-20">
        <div style={{ display: 'flex' }}>
          <div style={div2Style}>
            <h3>People</h3>
            <ul>
              {users.map((user) => (
                <li key={user.id} onClick={() => handleUserSelect(user.id)}>
                  {user.name}
                </li>
              ))}
            </ul>
          </div>
          <div style={div1Style}>
            <h3>Messages</h3>
            <textarea
              rows="4"
              cols="50"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
            ></textarea>
            <button onClick={handleSendMessage}>Send</button>
            <ul>
              {messages.map((message) => (
                <li key={message.id}>{message.text}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
