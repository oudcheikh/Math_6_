import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  useEffect(() => {
    // Rediriger l'utilisateur vers le tableau de bord s'il est déjà connecté
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSignIn = async (email, password) => {
    // Logique pour authentifier l'utilisateur (exemple fictif)
    const fetchedUser = { email, id: '123' }; // Simuler une récupération d'utilisateur
    localStorage.setItem('user', JSON.stringify(fetchedUser));
    setUser(fetchedUser);
    navigate('/dashboard');
  };

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <div>
      {user ? (
        <div>
          <p>You are logged in as {user.email}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>
          {/* Les champs et le bouton pour se connecter */}
          <button onClick={() => handleSignIn('user@example.com', 'password')}>Sign In</button>
        </div>
      )}
    </div>
  );
};

export default App;
