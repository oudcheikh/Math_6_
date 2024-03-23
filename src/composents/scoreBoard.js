import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChapterCard from './ChapterCard';

const ThemeComponent = () => {
  const [themeScores, setThemeScores] = useState([]);
  const [hasInternet, setHasInternet] = useState(true); // Par défaut, supposons que l'utilisateur a une connexion Internet
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScores = async () => {
      try {
        // Votre logique pour vérifier la connexion Internet
        const isConnected = navigator.onLine;
        setHasInternet(isConnected);
          const scoresString = localStorage.getItem('scores');
          const scoresArray = JSON.parse(scoresString);

          if (!scoresArray) {
            console.error('No scores found');
          } else {
            const scoresList = scoresArray.map(item => (
              {
              matiere: item.matiere,
              score: item.score
            }
            ));

            const totalScores = scoresList.reduce((acc, item) => {
              if (item.matiere && typeof item.score === 'number') {
                acc[item.matiere] = acc[item.matiere] || 0;
                acc[item.matiere] += item.score;
              }
              return acc;
            }, {});

            // Transformation des scores en un format compatible avec le composant
            const transformedScoresList = Object.keys(totalScores).map((matiere) => ({
              name: matiere,
              score: totalScores[matiere],
              questions: 10,
            }));

            setThemeScores(transformedScoresList);
          }
        
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchScores();
  }, []);

  const subjectMap = {
    PRPAHG006: "histoire",
    PRPAEI006: "educationislamique",
    PRPASN006: "sciencenaturelle",
    PRPAAR006: "Arabe",
    PRPAMA006: "Mathématiques"
  };

  const handleNavigation = (matiere) => {
    const matiereToRoute = {
      PRPAHG006: "/QuizTestHistoire", // histoire
      PRPAEI006 : "/QuizTestIslamic", // educationislamique
      PRPASN006: "/QuizTestScience", //  sciencenaturelle
      PRPAAR006: "/QuizTestarab", // Arabe
      PRPAMA006: "/QuizTestMath" // Mathématiques
    };

    const route = matiereToRoute[matiere];
    if (route) {
      navigate(route);
    }
  };

  return (
    <div>
      <h2>Choisissez un thème</h2>
      <p>Lancez une série thématique pour améliorer votre niveau sur les thèmes officiels de l'examen.</p>
      {hasInternet && (
        <button style={{ display: 'block', margin: '0 auto', marginBottom: '20px' }}>Mon bouton</button>
      )}
      {themeScores.map((theme, index) => (
        <ChapterCard
          key={index}
          chapter={subjectMap[theme.name]}
          title={`Score: ${Math.ceil(theme.score)}`}
          onClick={() => handleNavigation(theme.name)}
        />
      ))}
    </div>
  );
};

export default ThemeComponent;
