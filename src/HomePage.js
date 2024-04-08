import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Card = ({ title, content, icon, full, navigateTo }) => {
  const navigate = useNavigate();

 

  const handleClick = () => {
    if (navigateTo) {
      navigate(navigateTo);
    }
  };

  return (
    <div className={`card ${full ? 'full-card' : ''}`} onClick={handleClick}>
      {icon && <img src={icon} alt={title} className="card-icon" />}
      <div className="card-content">
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    </div>
  );
};


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
      <h1>Bienvenue sur Major+</h1>
      {user ? (
        <div>
          <p>Bonjour, {user.name} {user.lastName}!</p>
          <p>Votre adresse : {user.address}</p>
          <p>Votre numéro de téléphone : {user.phone}</p>
          {/* Vous pouvez ajouter plus d'options ou d'informations ici */}
          <div className="full-width-container">
            <Card title="اللغة العربية " content="" icon={"/images/Icones/arabic-language.png"} full navigateTo="/PrepaArabe" />
            <Card title="Français" content="" icon={"/images/Icones/eiffel-tower.png"} full navigateTo="/PrepaFrançais" />
          </div>
              
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
