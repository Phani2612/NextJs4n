


import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import './URL_404_Contact.css';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import 'bootstrap/dist/css/bootstrap.min.css';
import SERVER_URL from './URL';
import Swal from 'sweetalert';

const URL_404_Contact = () => {
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('Please enter your first name.'),
        lastName: Yup.string().required('Please enter your last name.'),
        email: Yup.string()
            .email('Please enter a valid email address.')
            .required('Email is required.'),
        phone: Yup.string()
            .required('Phone number is required.')
            .test('is-valid-phone', 'Please enter a valid phone number.', (value) => {
                if (!value) return false;
                const phoneNumber = parsePhoneNumberFromString(value);
                return phoneNumber ? phoneNumber.isValid() : false;
            }),
        country: Yup.string().required('Country is required.'),
        city: Yup.string().required('City is required.'),
        message: Yup.string()
            .min(25, 'Message must be at least 25 characters.')
            .max(4000, 'Message length cannot exceed 4000 characters.')
            .required('Message is required.'),
    });

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const response = await fetch(`${SERVER_URL}/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                Swal({
                    icon: 'success',
                    title: 'Success',
                    text: 'Form submitted successfully!',
                });
                resetForm();
            } else {
                Swal({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to submit form. Please try again later.',
                });
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            Swal({
                icon: 'error',
                title: 'Error',
                text: 'Failed to submit form. Please try again later.',
            });
        }
    };


    return (
        <div className='container contact-form-container'>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    country: '',
                    city: '',
                    message: ''
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue, isSubmitting }) => (
                    <Form id="contact_form" className='contact-form'>
                        <div className='row mb-4'>
                            <div className='col'>
                                <label htmlFor="firstName" className='form-label'>First Name</label>
                                <Field
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    className="form-control"
                                />
                                <ErrorMessage name="firstName" component="div" className="text-danger" />
                            </div>
                            <div className='col'>
                                <label htmlFor="lastName" className='form-label'>Last Name</label>
                                <Field
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    className="form-control"
                                />
                                <ErrorMessage name="lastName" component="div" className="text-danger" />
                            </div>
                        </div>
                        <div className='row mb-4'>
                            <div className='col'>
                                <label htmlFor="email" className='form-label'>E-mail</label>
                                <Field
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="name@example.com"
                                    style={{ marginTop: "4px" }}
                                />
                                <ErrorMessage name="email" component="div" className="text-danger" />
                            </div>
                            <div className='col'>
                                <label htmlFor="phone" className='form-label'>Phone</label>
                                <PhoneInput
                                    international
                                    defaultCountry="IN"
                                    value={values.phone}
                                    onChange={(phone) => setFieldValue('phone', phone)}
                                    className="form-control"
                                />
                                <ErrorMessage name="phone" component="div" className="text-danger" />
                            </div>
                        </div>
                        <div className='row mb-4'>
                            <div className='col'>
                                <label htmlFor="country" className='form-label'>Country</label>
                                <Field
                                    type="text"
                                    id="country"
                                    name="country"
                                    className="form-control"
                                />
                                <ErrorMessage name="country" component="div" className="text-danger" />
                            </div>
                            <div className='col'>
                                <label htmlFor="city" className='form-label'>City</label>
                                <Field
                                    type="text"
                                    id="city"
                                    name="city"
                                    className="form-control"
                                />
                                <ErrorMessage name="city" component="div" className="text-danger" />
                            </div>
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="message" className='form-label'>Message</label>
                            <Field
                                as="textarea"
                                id="message"
                                name="message"
                                className="form-control"
                                rows="5"
                            />
                            <ErrorMessage name="message" component="div" className="text-danger" />
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-lg px-4">
                                Send
                            </button>
                            <Link to="/" className="btn btn-secondary btn-lg px-4 ml-3" style={{ marginTop: "10px" }}>Homepage</Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default URL_404_Contact;
