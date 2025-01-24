import React, { useEffect, useState } from 'react';
import './home.css';
import NavBar from '../Navbar/NavBar';
// import axios from 'axios';

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');

  // Fetch the saved data and logged-in user
  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));

  }, []);

  return (
    <div>
      <NavBar />
      <div>
        <h1 className="welcome-message">
          Welcome!
        </h1>
        {loggedInUser && (
          <h2 className="user-greeting">Hello, {loggedInUser}!</h2>
        )}
        <p className="slogan">
        </p>
      </div>
    </div>
  );
}

export default Home;
