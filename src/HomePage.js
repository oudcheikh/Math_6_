import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [user, setUser] = useState(null); // État pour stocker les données utilisateur récupérées depuis localStorage
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData)); // Mettre à jour l'état avec les données utilisateur si elles existent
    }
  }, []);

  const handleSignUp = () => {
    navigate('/signup'); // Rediriger vers la page d'inscription
  };

  const handleMyRevision = () => {
    navigate('/myrevison'); // Rediriger vers la page "/myrevision"
  };

  return (
    <div>
      <h1>Bienvenue sur Notre Application</h1>
      {user ? (
        <div>
          <p>Bonjour, {user.name} {user.lastName}!</p>
          <p>Votre adresse : {user.address}</p>
          <p>Votre numéro de téléphone : {user.phone}</p>
          {/* Vous pouvez ajouter plus d'options ou d'informations ici */}
          <button onClick={handleMyRevision}>Ma Révision</button> {/* Ajout du bouton de redirection */}
        </div>
      ) : (
        <div>
          <p>Pour accéder à nos services, veuillez vous inscrire.</p>
          <button onClick={handleSignUp}>Inscription</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
