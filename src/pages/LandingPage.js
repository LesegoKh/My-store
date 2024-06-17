// Import Files & Components
import React from 'react';
import RegisterPage from '../pages/RegisterPage';

const LandingPage = () => {
  return (
    <div className="container mt-5">
      <h1>Welcome to Our Store</h1>
      <p>Register below to start shopping!</p>
      <RegisterPage />
    </div>
  );
};

export default LandingPage;
