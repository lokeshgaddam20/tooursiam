import React, { useContext, useState } from 'react';
import { AuthContext } from '../components/auth/authcontext';
import '../styles/profile.css';

const Profile = () => {
  const { userId } = useContext(AuthContext);
  const [email, setEmail] = useState(''); // Example user email
  const [username, setUsername] = useState(''); // Example username

  // Example handler for saving changes
  const handleSave = () => {
    alert('Changes saved!');
  };

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      <div className="profile-info">
        <label>User ID:</label>
        <p>{userId}</p>
      </div>
      <div className="profile-info">
        <label>Email:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
      </div>
      <div className="profile-info">
        <label>Username:</label>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
      </div>
      <button className="btn primary__btn" onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
};

export default Profile;
