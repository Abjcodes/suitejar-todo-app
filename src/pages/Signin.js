import React, { useEffect } from 'react';
import GoogleButton from "react-google-button";
import { UserAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './pagesStyles.css';
  

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
    <div className='mainContainer'>
      <div className='SleftContainer'>
        <div className='login-content'>
        <h2 className='login-header'>
          LOGIN
        </h2>
        <p className='login-body'>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
  Aliquet at eleifend feugiat vitae faucibus nibh dolor dui. 
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
  Aliquet at eleifend feugiat vitae faucibus nibh dolor dui. 
        </p>
        <div className="signBtn">
        <GoogleButton onClick={handleGoogleSignIn} />
        </div>
        </div>
      </div>
      <div className='SrightContainer'>
        Illustration
      </div>
    </div>
)
}

export default Signin;