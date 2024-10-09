


import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
// import './App.css';
import Axios from 'axios';

import SERVER_URL from '../components/URL';
// import { format } from 'date-fns';
// import { useAuth } from './Authcontext'; // Import useAuth   I need to uncomment this later
// import { useNavigate } from 'react-router-dom'; I need to uncomment this later

import styles from '../styles/EcoTech_301_UserRegister.module.css'

const EcoTech_301_UserRegister = () => {

//   const { setAuth } = useAuth(); // Destructure setAuth from useAuth


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


//   const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    // email: Yup.string()
    //   .email('Please enter a valid email address.'),


    email: Yup.string()
    .email('Invalid email format')
    .required('Email is required')
    .test(
      'is-valid-user',
      'You are not allowed to log in',
      (value) => validUsers.includes(value)
    ),


    phone: Yup.string()
      .matches(/^\+?\d{5,15}$/, 'Please enter a valid phone number.'),
    // password: Yup.string()
    //   .min(8, 'Password must be at least 8 characters.')
    //   .matches(
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/,
    //     'Password requires: uppercase, lowercase, digit, special character.'
    //   )
    //   .required('Password is required.'),



    password: Yup.string()
    .required('Password is required'),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match.')
      .required('Please confirm your password.'),
    countryCode: Yup.string()
      .matches(/^\+\d+$/, 'Please enter a valid country code.'),
  }).test(
    'email-or-phone',
    'Either email or phone number is required.',
    function (value) {
      return value.email || value.phone;
    }
  );


  


  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [defaultCountry, setDefaultCountry] = useState('');


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  useEffect(() => {
    const fetchGeoIP = async () => {
      try {
        const response = await Axios.get('https://ipinfo.io');
        if (response && response.data && response.data.country) {
          const country = response.data.country.toUpperCase();
          setDefaultCountry(country); // Set default country based on IP
        } else {
          console.error('Failed to fetch GeoIP data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching GeoIP data:', error);
      }
    };
    fetchGeoIP(); // Initial fetch of GeoIP data on component mount
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    // Handle form submission logic here, e.g., API calls
    console.log(values);
    
    Axios.post(`${SERVER_URL}/api/EcoTech_0801_Register`, values)
      .then(function (output) {
        console.log(output);

        const { status, message, redirectUrl} = output.data;
        alert(message);

        console.log(redirectUrl)

        
        window.location.href = redirectUrl
    

       


      })
      .catch(function (error) {
        console.error(error);
      });

    setShowConfirmPassword(false);
    setShowPassword(false);
    resetForm();
  };


 







  return (
    <div className={styles['register-form-container']}>
      <h2>Register</h2>
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
          countryCode: '',
          phone: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className={styles['register-form']}>

            <div className={styles['form-group']}>
              <label htmlFor="phone">Phone Number:</label>
              <div className="phone-input-container">
                <PhoneInput
                  international
                  defaultCountry={defaultCountry}
                  value={values.phone}
                  onChange={(phone) => {
                    setFieldValue('phone', phone);
                    if (phone) {
                      const phoneNumber = parsePhoneNumberFromString(phone);
                      if (phoneNumber) {
                        setFieldValue('countryCode', `+${phoneNumber.countryCallingCode}`);
                      }
                    } else {
                      setFieldValue('countryCode', '');
                    }
                  }}
                  id={styles['phone-input']} // I need to change it
                  className={styles["input-field"]}
                />
              </div>
              <ErrorMessage     name="phone" component="div" className={styles["error-message"]} />
            </div>

            <div className={styles['form-group']}>
              <label htmlFor="email">Email:</label><br/>
              <Field
                type="email"
                id={styles.email}
                name="email"
                className={styles["input-field"]}
              />
              <ErrorMessage name="email" component="div" className={styles["error-message"]} id={styles['email-error']}/>
            </div>

            <div className={styles['form-group']}>
              <label htmlFor="password">Password:</label>
              <div className={styles.both}>
                <Field
                  type={showPassword ? 'text' : 'password'}
                  id={styles.password}
                  name="password"
                  className={styles["input-field"]}
                />
                <span onClick={togglePasswordVisibility}>
                  <i id={styles.eye} style={{ color: showPassword ? 'red' : 'gray' }} className={styles["fa fa-eye"]}></i>
                </span>
              </div>
              <ErrorMessage name="password" component="div" className={styles["error-message" ]} id={styles.passerror} />
            </div>

            <div className={styles['form-group']}>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <div className={styles.both}>
                <Field
                  type={showConfirmPassword ? 'text' : 'password'}
                  id={styles.confirmPassword}
                  name="confirmPassword"
                  className={styles["input-field"]}
                />
                <span onClick={toggleConfirmPasswordVisibility}>
                  <i id={styles.Eye} style={{ color: showConfirmPassword ? 'red' : 'gray' }} className={styles["fa fa-eye"]}></i>
                </span>
                {values.password === values.confirmPassword && values.confirmPassword !== '' && (
                  <span className={styles["tick-icon"]}>
                    <i className={styles["fa fa-check"]} id={styles.check} style={{ color: 'green' }}></i>
                  </span>
                )}
              </div>
              <ErrorMessage name="confirmPassword" component="div" className={styles["error-message"]}  id={styles.conferror} />
            </div>

            <button type="submit" className={styles["submit-btn" ]} disabled={isSubmitting}>
              Register
            </button>


         



          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EcoTech_301_UserRegister;

