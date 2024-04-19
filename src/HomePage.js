import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageProvider';

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
  const { toggleLanguage, t } = useLanguage();

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
      <h1>Major+</h1>
      {user ? (
        <div>
          <p>{user.name} !</p>
          <p>📍 : {user.address}</p>
          <p>📞 : {user.phone}</p>
          {/* Vous pouvez ajouter plus d'options ou d'informations ici */}
          <div className="full-width-container">
            {/* <Card title="اللغة العربية " content="" icon={"/images/Icones/arabic-language.png"} full navigateTo="/Accueilarab" />
            <Card title="Français" content="" icon={"/images/Icones/eiffel-tower.png"} full navigateTo="/Acceuilfrançais" /> */}
            <p> {t('msgqcmserepete')} </p>
            <Card title=" العربية " content="" icon={"/images/Icones/arabic-language.png"} full navigateTo="/PrepaArabe" />
            <Card title="Français" content="" icon={"/images/Icones/eiffel-tower.png"} full navigateTo="/PrepaFrançais" />
          </div>
              
        </div>

        
  
   
      ) : (
        <div>
          <p>{t('txtinscription')}</p>
          <button onClick={handleSignUp}>{t('btinscription')}</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
