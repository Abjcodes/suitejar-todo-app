import React, { useEffect } from 'react';
import { UserAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './pagesStyles.css';

//Navigate to dashboard on succesful sign in
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
        <div className="signInBtnContainer">
        <button className = "signInBtn" onClick={handleGoogleSignIn}>Sign in With Google</button>
        </div>
        </div>
      </div>
      <div className='SrightContainer'>
      <img src={require('../assets/Illustration.svg').default} alt='mySvgImage' />
      </div>
    </div>
)
}

export default Signin;