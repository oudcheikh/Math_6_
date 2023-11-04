import React, { useState, useEffect } from 'react';
import db from './db'; // Assurez-vous que cela pointe vers votre configuration IndexedDB correcte

function ScoreBoard() {
  const [chapterScores, setChapterScores] = useState({});

  useEffect(() => {
    const loadScores = async () => {
      // Récupération de toutes les réponses stockées dans IndexedDB
      const allResponses = await db.responses.toArray();
      
      // Aggrégation des réponses par chapitre
      const scores = allResponses.reduce((acc, response) => {
        const { chapter, isCorrect } = response;
        if (!acc[chapter]) {
          acc[chapter] = { total: 0, correct: 0 };
        }
        acc[chapter].total++;
        if (isCorrect) {
          acc[chapter].correct++;
        }
        return acc;
      }, {});
      
      // Calcul des scores pour chaque chapitre
      Object.keys(scores).forEach(chapter => {
        const score = scores[chapter];
        score.percentage = (score.correct / score.total) * 100;
        score.evaluation = score.percentage >= 80 ? 'Bon' : 'À améliorer';
      });

      setChapterScores(scores);
    };

    loadScores();
  }, []);

  // Affichage des scores par chapitre
  return (
    <div>
      <h1>Tableau des scores par chapitre</h1>
      {Object.entries(chapterScores).map(([chapter, scoreData]) => (
        <div key={chapter}>
          <h2>{`Chapitre: ${chapter}`}</h2>
          <p>{`Réponses correctes: ${scoreData.correct}/${scoreData.total}`}</p>
          <p>{`Pourcentage: ${scoreData.percentage.toFixed(2)}%`}</p>
          <p>{`Évaluation: ${scoreData.evaluation}`}</p>
        </div>
      ))}
    </div>
  );
}

export default ScoreBoard;
