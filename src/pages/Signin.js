import React, { useEffect } from 'react';
import GoogleButton from "react-google-button";
import { UserAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
  

const Signin = () => {
    const { googleSignIn, user } = UserAuth();
    const navigate = useNavigate();
  
    const handleGoogleSignIn = async () => {
      try {
        await googleSignIn();
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      if (user != null) {
        navigate('/home');
      }
    }, [user]);

return (
    <div>
        <GoogleButton onClick={handleGoogleSignIn} />
    </div>
)
}

export default Signin;