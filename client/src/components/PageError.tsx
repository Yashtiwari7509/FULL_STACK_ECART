import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom';
const PageError = () => {
  return (
    <div className="container">
      <h1>404</h1>
      <p>Page Not Found</p>
      <Link to='/'>
        <p className="home-button">Go to Homepage</p>
      </Link>
    </div>
  );
}

export default PageError