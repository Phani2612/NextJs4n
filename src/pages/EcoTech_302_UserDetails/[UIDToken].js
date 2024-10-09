import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import './EcoTech_302_UserDetails.css';
import {useRouter} from 'next/router.js';
import Axios from 'axios'

import SERVER_URL from '@/src/components/URL.js';

import CryptoJS from 'crypto-js';
// import { v4 as uuidv4 } from 'uuid';

import secretKey from '@/src/components/Secret.js';


import styles from '../../styles/EcoTech_302_UserDetails.module.css'

const EcoTech_302_UserDetails = () => {

 
const Router = useRouter()

const {UIDToken} = Router.query

const bytes = CryptoJS.AES.decrypt(decodeURIComponent(UIDToken), secretKey);

  const UID = bytes.toString(CryptoJS.enc.Utf8);




const validationSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  gender: Yup.string().required('Gender is required'),
  userType: Yup.array().min(1, 'Select at least one user type'),
  dateOfBirth: Yup.date().required('Date of Birth is required'),
  addressType: Yup.array().min(1, 'Select at least one address type'),
  addressLine1: Yup.string().required('Address Line 1 is required'),
  addressLine2: Yup.string(),
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required'),
  pincode: Yup.string().required('Pincode is required'),
  country: Yup.string().required('Country is required'),
  landmark: Yup.string().required('Landmark is required')
});



  return (
    <div className={styles["form-container"]}>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          gender: '',
          userType: [],
          dateOfBirth: '',
          addressType: [],
          addressLine1: '',
          addressLine2: '',
          state: '',
          city: '',
          pincode: '',
          country: '', // New field
          landmark: '' // New field
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);

          Axios.post(`${SERVER_URL}/api/EcoTech_0801_Details`,{values , UID}).then(function(output)
        {
            const { status, message, redirectUrl } = output.data;
            alert(message);
            window.location.href = redirectUrl;
        }).catch(function(error)
        {
             console.error(error)
        })
        }}
      >
        {() => (
          <Form className={styles.form}>
            <h1 className={styles.h1tag}>Registration Form</h1>

            <div className={styles["form-group"]}>
              <label className={styles.label} htmlFor="firstName">First Name</label>
              <Field name="firstName" type="text" className={styles['form-control']} />
              <ErrorMessage name="firstName" component="div" className={styles.error} />
            </div>

            <div className={styles["form-group"]}>
              <label  className={styles.label} htmlFor="lastName">Last Name</label>
              <Field name="lastName" type="text" className={styles['form-control']}/>
              <ErrorMessage name="lastName" component="div" className={styles.error} />
            </div>

            <div className={styles["form-group"]}>

              <label    className={styles.label}>Gender</label>
              <div role="group" className={styles["checkbox-group"]}>
                <label   className={styles.label}>
                  <Field type="radio" name="gender" value="Male" />
                  Male
                </label  >
                <label   className={styles.label}>
                  <Field type="radio" name="gender" value="Female" />
                  Female
                </label>
                <label  className={styles.label}>
                  <Field type="radio" name="gender" value="Not to disclose" />
                  Not to disclose
                </label>
              </div>
              <ErrorMessage name="gender" component="div" className={styles.error} />
            </div>

            <div className={styles["form-group"]}>
              <label   className={styles.label}>User Type</label>
              <div role="group" className={styles["checkbox-group"]}>
                {/* <label>
                  <Field type="checkbox" name="userType" value="Employer" />
                  Employer
                </label>
                <label>
                  <Field type="checkbox" name="userType" value="Employee" />
                  Employee
                </label> */}
                {/* <label>
                  <Field type="checkbox" name="userType" value="Educational Institutes" disabled />
                  Educational Institutes
                </label> */}
                <label  className={styles.label}>
                  <Field type="checkbox" name="userType" value="Print Designer" />
                  Print Designer
                </label>

                <label  className={styles.label}>
                  <Field type="checkbox" name="userType" value="Tee Manufacturer" />
                  Tee Manufacturer
                </label>

                <label  className={styles.label}>
                  <Field type="checkbox" name="userType" value="Buyer" />
                  Buyer
                </label>


                <label  className={styles.label}>
                  <Field type="checkbox" name="userType" value="Shipping Company" />
                  Shipping Company
                </label>


              </div>
              <ErrorMessage name="userType" component="div" className={styles.error}/>
            </div>



            <div className={styles["form-group"]}>
    <label  className={styles.label} htmlFor="country">Country</label>
    <Field name="country" type="text" className={styles["form-control"]}/>
    <ErrorMessage name="country" component="div" className={styles.error}/>
  </div>

  <div className={styles["form-group"]}>
    <label  className={styles.label} htmlFor="landmark">Landmark</label>
    <Field name="landmark" type="text" className={styles["form-control"]} />
    <ErrorMessage name="landmark" component="div" className={styles.error} />
  </div>

            <div className={styles["form-group"]}>
              <label  className={styles.label} htmlFor="dateOfBirth">Date of Birth</label>
              <Field name="dateOfBirth" type="date" className={styles["form-control"]} />
              <ErrorMessage name="dateOfBirth" component="div" className={styles.error} />
            </div>

            <div className={styles["form-group"]}>
              <label   className={styles.label}>Address Type</label>
              <div role="group" className={styles["checkbox-group"]}>
                <label  className={styles.label}>
                  <Field type="checkbox" name="addressType" value="Permanent" />
                  Permanent
                </label>
                <label  className={styles.label}>
                  <Field type="checkbox" name="addressType" value="Communication" />
                  Communication
                </label>
                <label  className={styles.label}>
                  <Field type="checkbox" name="addressType" value="Work/Office" />
                  Work/Office
                </label>
                <label  className={styles.label}>
                  <Field type="checkbox" name="addressType" value="Others" />
                  Others
                </label>
              </div>
              <ErrorMessage name="addressType" component="div" className={styles.error} />
            </div>

            <div className={styles["form-group"]}>
              <label  className={styles.label} htmlFor="addressLine1">Address Line 1</label>
              <Field name="addressLine1" type="text" className={styles["form-control"]} />
              <ErrorMessage name="addressLine1" component="div" className={styles.error} />
            </div>

            <div className={styles["form-group"]}>
              <label  className={styles.label} htmlFor="addressLine2">Address Line 2</label>
              <Field name="addressLine2" type="text" className={styles["form-control"]} />
            </div>

            <div className={styles["form-group"]}>
              <label  className={styles.label} htmlFor="state">State</label>
              <Field name="state" type="text" className={styles["form-control"]} />
              <ErrorMessage name="state" component="div" className={styles.error} />
            </div>

            <div className={styles["form-group"]}>
              <label  className={styles.label} htmlFor="city">City</label>
              <Field name="city" type="text" className={styles["form-control"]} />
              <ErrorMessage name="city" component="div" className={styles.error} />
            </div>

            <div className={styles["form-group"]}>
              <label  className={styles.label} htmlFor="pincode">Pincode</label>
              <Field name="pincode" type="text" className={styles["form-control"]}/>
              <ErrorMessage name="pincode" component="div" className={styles.error}  />
            </div>

            <button type="submit" className={styles["submit-button"]}>Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EcoTech_302_UserDetails;
