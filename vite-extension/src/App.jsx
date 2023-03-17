import React from 'react';
import './App.css'

function App() {
  return (
    <div className='popup-container'>
      <div className='innerDiv'>
      <h2 className='title'>About the Extension</h2>
      <p>This extension helps you to find if a GitHub user has an account on OpenSauced. If they do, it adds a button to navigate to their profile</p>

      <h2 style={{color: "#ed5332"}}>Features</h2>
      <ul className='feature-list'>
        <li className='feature-item'>Checks if a GitHub user has an account on OpenSauced</li>
        <li className='feature-item'>Adds a button to their profile page</li>
        <li className='feature-item'>Quickly navigate to their OpenSauced</li>
      </ul>
      </div>
    </div>
  );
}

export default App;
