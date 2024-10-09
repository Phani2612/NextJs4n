import React, { useState , useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from 'axios';
import SERVER_URL from '../components/URL';
// import secretKey from './components/Secret.js';
import CryptoJS from 'crypto-js';

import secretKey from '../components/Secret';

import styles from '../styles/EcoTech_303_Login.module.css'

// import { useAuth } from './Authcontext.js'; // Import useAuth

function EcoTech_303_Login() {
  const [loginError, setLoginError] = useState('');
  // const { setAuth } = useAuth(); // Destructure setAuth from useAuth

  // const navigate = useNavigate();

  const validUsers = [
    'nishant@4necotech.in',
    'pratima.singh@4necotech.in',
    'amar.naik@4necotech.in',
    'ajay.j@4necotech.in',
    'komal@4necotech.in',
    'phani@4necotech.in',
    'prakhar@4necotech.in',
    'satya@4necotech.in',
    'aditya@4necotech.in'
  ];




  function getBrowserAndDeviceDetails() {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    return { userAgent, platform };
  }





  const validationSchema = Yup.object().shape({

    // email: Yup.string().email('Invalid email format').required('Email is required'),


    email: Yup.string()
    .email('Invalid email format')
    .required('Email is required')
    .test(
      'is-valid-user',
      'You are not allowed to log in',
      (value) => validUsers.includes(value)
    ),


    // password: Yup.string().required('Password is required'),

    password: Yup.string()
    .required('Password is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),

  });

  const handleSubmit = async (values) => {
    try {
      const response = await Axios.post(`${SERVER_URL}/api/EcoTech_0801_Login`, {
        email: values.email,
        password: values.password,
        userAgent: navigator.userAgent,
        platform: navigator.platform
      }, { withCredentials: true });
  

      console.log("Response details" , response)
      switch (response.status) {
        case 200:
          if (response.data.message === '2FA required') {
            const encryptingEmail = CryptoJS.AES.encrypt(values.email, secretKey).toString();
            const encryptedEmail = encodeURIComponent(encryptingEmail);
            localStorage.setItem('Userdata', encryptedEmail);
            // setAuth(true);
            window.location.href = response.data.redirectUrl;
          } else if (response.data.message === 'Login successful') {
            // setAuth(true);
            window.location.href = response.data.redirectUrl;
          } else {
            navigate('/EcoTech_301_UserRegister');
            setLoginError(response.data.message);
          }
          break;
  
        case 401:
          setLoginError('Invalid email or password');
          navigate('/EcoTech_303_Login'); // Ensure navigate is called
          break;
  
        case 404:
          console.log("User not found - redirecting to /register");
          navigate('/EcoTech_301_UserRegister'); // Ensure navigate is called
          setLoginError('User not found');
          break;
  
        default:
          setLoginError('An unexpected error occurred. Please try again.');
      }
    } catch (error) {
      setLoginError('An error occurred. Please try again.');
      console.error('Error during login:', error);
    }
  };
  
  
  return (
    <div className={styles['login-container']}>

      
      <h2 className={styles.h2} >Admin Login</h2>
      <Formik
        initialValues={{ email: '', password: '', token: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className={styles['input-group']}>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" placeholder="Enter your email" className={styles['input-box']} />
              <ErrorMessage name="email" component="div" className={styles['error-message']} />
            </div>
            <div className={styles['input-group']}>
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" placeholder="Enter your password" className={styles['input-box']} />
              <ErrorMessage name="password" component="div" className={styles['error-message']} />
            </div>



            {/* <button type="submit" className="btn" disabled={isSubmitting}>Login</button> */}

            
            <button type="submit" className={styles.btn} id={styles.loginbutton} disabled={isSubmitting}>Login</button>

          </Form>
        )}
      </Formik>
      {loginError && <div className="error-message">{loginError}</div>}
    </div>
  );
}

export default EcoTech_303_Login;

