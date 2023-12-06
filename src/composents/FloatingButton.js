// FloatingButton.js
import React from 'react';

const FloatingButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const buttonStyle = {
    position: 'fixed',
    top: '10px',
    right: '10px',
    padding: '10px 15px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
    fontSize: '20px',
    zIndex: 1000,
  };

  return (
    <button onClick={scrollToTop}>
      &#9650; {/* Unicode arrow up */}
    </button>
  );
};

export default FloatingButton;

