import React from 'react';
import { UserAuth } from '../contexts/AuthContext';

const NavBar = () => {
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div >
      <h3>
        Sidejar Todo
      </h3>
        <button onClick={handleSignOut}>Logout</button>
    </div>
  );
};

export default NavBar;