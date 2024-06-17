// Import Files & Components
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';

const RegisterPage = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  const initialValues = {
    firstName: '',
    surname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    surname: Yup.string().required('Surname is required'),
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Simulate successful registration (you would replace this with actual logic)
    setTimeout(() => {
      console.log('Registering user:', values);
      setIsRegistered(true);
      setSubmitting(false);
      resetForm();
    }, 500); // Simulating delay

    // Reset registration state after 5 seconds
    setTimeout(() => {
      setIsRegistered(false);
    }, 5000);
  };

  return (
    <div className="container mt-5">
      <h1>Register</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <Field type="text" name="firstName" className="form-control" />
              <ErrorMessage name="firstName" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label className="form-label">Surname</label>
              <Field type="text" name="surname" className="form-control" />
              <ErrorMessage name="surname" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <Field type="text" name="username" className="form-control" />
              <ErrorMessage name="username" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <Field type="email" name="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <Field type="password" name="password" className="form-control" />
              <ErrorMessage name="password" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <Field type="password" name="confirmPassword" className="form-control" />
              <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              Register
            </button>
          </Form>
        )}
      </Formik>

      {isRegistered && (
        <div className="alert alert-success mt-3" role="alert">
          Registration successful! You can now log in with your credentials.
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
