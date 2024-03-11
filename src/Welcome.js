import React from 'react';

const Welcome = ({ user }) => {
  return (
    <div>
      <h2>Bienvenue, {user.name}!</h2>
      <p>Content de vous revoir.</p>
    </div>
  );
};

export default Welcome;
