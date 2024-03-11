import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChapterCard from './ChapterCard';

const ThemeComponent = () => {
  const [themeScores, setThemeScores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const scoresString = localStorage.getItem('scores');
        const scoresArray = JSON.parse(scoresString);

        console.log("_____________scoresArray____________  : ", scoresArray)

        if (!scoresArray) {
          console.error('No scores found');
        } else {
          const scoresList = scoresArray.map(item => ({
            matiere: item.matiere,
            score: item.score
          }));
        
          console.log("_____________scoresList____________  : ", scoresList)

          const totalScores = scoresList.reduce((acc, item) => {
            if (item.matiere && typeof item.score === 'number') {
              acc[item.matiere] = acc[item.matiere] || 0;
              acc[item.matiere] += item.score;
            }
            return acc;
        }, {});
        
        console.log(totalScores);

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

  const handleNavigation = (matiere) => {
    const matiereToRoute = {
      histoire: "/QuizTestHistoire",
      educationislamique: "/QuizTestIslamic",
      sciencenaturelle: "/QuizTestScience",
      Arabe: "/QuizTestarab",
      Mathématiques: "/QuizTestMath"
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
      {themeScores.map((theme, index) => (
        <ChapterCard
          key={index}
          chapter={theme.name}
          title={`Score: ${Math.ceil(theme.score)}`}
          onClick={() => handleNavigation(theme.name)}
        />
      ))}
    </div>
  );
};

export default ThemeComponent;
