import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChapterCard from './ChapterCard';
import { useSelector } from 'react-redux';

const ThemeComponent = () => {
  const [themeScores, setThemeScores] = useState([]);
  const [hasInternet, setHasInternet] = useState(true); // Par défaut, supposons que l'utilisateur a une connexion Internet
  const navigate = useNavigate();
  const scoreTotal = useSelector((state) => state.counter.value);

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
      PRPAMA006: "/QuizTestMath" // Mathématiques
    };

    const route = matiereToRoute[matiere];
    if (route) {
      navigate(route);
    }
  };

  return (
    <div>
      <h2>Ton Score est {Math.ceil(scoreTotal)} 🥇</h2>
      <p>Lancez ton entrainement sur l'une de matiere pour ogmenter ton score.</p>
     
      {themeScores.map((theme, index) => (
        <ChapterCard
          key={index}
          chapter={subjectMap[theme.name]}
          title={` ${Math.ceil(theme.score)} 🥇`}
          onClick={() => handleNavigation(theme.name)}
        />
      ))}
    </div>
  );
};

export default ThemeComponent;
