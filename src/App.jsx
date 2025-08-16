import React from "react";

function App() {
  // Simple test to see if React is working
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#1976d2' }}>Changa DAO - Test Page</h1>
      <p>If you can see this, React is working!</p>
      <p>Current time: {new Date().toLocaleString()}</p>
      <button 
        onClick={() => alert('Button works!')}
        style={{ 
          padding: '10px 20px', 
          background: '#1976d2', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Test Button
      </button>
    </div>
  );
}

export default App;
