import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import SERVER_URL from '@/src/components/URL';
// import './EcoTech_304_TwoFactorAuth.css'; // Import the new CSS file
import secretKey from '@/src/components/Secret';
import CryptoJS from 'crypto-js';
// import { useAuth } from './Authcontext.js'; // Import useAuth
import {useRouter} from 'next/router.js';

import styles from '../../styles/EcoTech_304_TwoFactorAuth.module.css'

const EcoTech_304_TwoFactorAuth = () => {

    
const Router = useRouter()

  const { Name} = Router.query; //session token should also be there const {Name , sessiontoken} = Router.query

//   const { setAuth } = useAuth(); // Destructure setAuth from useAuth

//   const encryptedtoken = CryptoJS.AES.encrypt(sessiontoken , secretKey).toString();
//   const encryptedsessiontoken = encodeURIComponent(encryptedtoken);

//   localStorage.setItem('Session_token' , encryptedsessiontoken )





  const bytes = CryptoJS.AES.decrypt(decodeURIComponent(Name), secretKey);

 

  const Email = bytes.toString(CryptoJS.enc.Utf8);




  const [qrCode, setQrCode] = useState(null);
  const [otp, setOtp] = useState('');

//   const navigate = useNavigate();


console.log('Email' , Name)


  useEffect(() => {
    // Fetch QR code from the backend
    const fetchQRCode = async () => {
      try {
        const response = await Axios.get(`${SERVER_URL}/api/EcoTech_0801_api/2fa/${Email}`); // Adjust endpoint as needed

        console.log("QRCODE data" , response.data.qrCode)
        
        if (response.data.qrCode) {
          setQrCode(response.data.qrCode);
        }
      } catch (error) {
        console.error('Error fetching QR code:', error);
      }
    };

    fetchQRCode();
  }, [Email]);

  

  


  const handleSubmit = async (event) => {
    event.preventDefault();

   

    

    try {
      const response = await Axios.post(`${SERVER_URL}/api/EcoTech_0801_api/2fa/verify/${Email}`, { otp},  { withCredentials: true });
      if (response.data.success) {

      
    


        // setAuth(true);

        window.location.href = 'http://localhost:3000'

        // navigate(`/TEE_519_Landing_Page/${encryptedsessiontoken}`); // Redirect to home on successful 2FA
      } else {
        alert('Invalid OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  return (
    <div className={styles["two-factor-auth-container"]}>
      <h2 className={styles.h2}  >Two-Factor Authentication</h2>
      <div className={styles["qr-code-container"]}>
        {qrCode && <img src={qrCode} alt="2FA QR Code" className={styles["qr-code-img" ]}/>}
      </div>
      <form onSubmit={handleSubmit} className={styles["otp-form"]}>
        <label htmlFor="otp" className={styles["otp-label"]}>Enter OTP:</label>
        <input
          type="text"
          id={styles.otp}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          className={styles["otp-input"]}
        />
        <button type="submit" className={styles["submit-btn"]}>Verify OTP</button>
      </form>
    </div>
  );
};

export default EcoTech_304_TwoFactorAuth;
