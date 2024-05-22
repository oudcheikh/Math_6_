import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageProvider';
import ChapterCard from './composents/ChapterCard'
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
  const [themeScores, setThemeScores] = useState([{
    "name": "PRPAHG006"
},
{
  "name": "PRPAFR006"
},{
  "name": "PRPAAR006"
},{
  "name": "PRPAEI006"
},{
  "name": "PRPASN006"
},{
  "name": "PRPAMA006"
},
]);
  const [user, setUser] = useState(null); // État pour stocker les données utilisateur récupérées depuis localStorage
  const navigate = useNavigate();
  const { toggleLanguage, t } = useLanguage();

  const subjectMap = {
    PRPAHG006: "التاريخ و الجغرافيا",
    PRPAEI006: "التربية الإسلامية",
    PRPASN006: "Science Naturelle",
    PRPAAR006: "العربية",
    PRPAMA006: "Mathématiques",
    PRPAFR006: "Français"
  };

const handleNavigation = (matiere) => {
  const matiereToRoute = {
    PRPAHG006: "/QuizTestHistoire", // histoire
    PRPAEI006 : "/QuizTestIslamic", // educationislamique
    PRPASN006: "/QuizTestScience", //  sciencenaturelle
    PRPAAR006: "/QuizTestarab", // Arabe
    PRPAMA006: "/QuizTestMath", // Mathématiques
    PRPAFR006: "/QuizTestFrançais" // Français
  };

  const route = matiereToRoute[matiere];
  if (route) {
    navigate(route);
  }
};

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

  console.log("--------------themeScores-------- : ", themeScores)


  return (
    <div style={{ textAlign: 'center', padding: '2px 0', marginLeft: '20px', marginRight: '20px' }} >
      <h1>{t('nameMajor')}</h1>
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

            {themeScores.map((theme, index) => (
        <ChapterCard
          key={index}
          chapter={subjectMap[theme.name]}
          
          onClick={() => handleNavigation(theme.name)}
        />
      ))}
{/*  
            <Card title=" العربية " content="" icon={"/images/Icones/arabic-language.png"} full navigateTo="/PrepaArabe" />
            <Card title="Français" content="" icon={"/images/Icones/eiffel-tower.png"} full navigateTo="/PrepaFrançais" />
          
 */}

         
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
