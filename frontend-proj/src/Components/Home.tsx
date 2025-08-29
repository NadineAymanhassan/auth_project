import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const Signout = () => {
    // Clear token 
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="home-page-container">
      <div className="home-card" >
      <h2>Welcome to the application.</h2>
      <p>You are logged in.</p>
        <button onClick={Signout}>
          Sign out 
        </button>
      </div>
    </div>
  );
};

export default Home;


