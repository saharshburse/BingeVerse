// Profile.jsx
import React from 'react';

const Profile = () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    // Redirect to login if there's no token
    window.location.href = '/login';
  }

  return (
    <div>
      <h1>Profile Page</h1>
      {/* Display user information here */}
    </div>
  );
};

export default Profile;
