import React, { useState, useEffect } from 'react';
import db from './db';
import ChapterCard from './ChapterCard';
import { useNavigate } from 'react-router-dom';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function ScoreBoard() {

  const [chapterScores, setChapterScores] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadScores = async () => {
      const allResponses = await db.responses.toArray();

      const scores = allResponses.reduce((acc, response) => {
        const { chapter, chapter_root, isCorrect } = response;

        if (!acc[chapter]) {
          acc[chapter] = { total: 0, correct: 0, chapter_root: chapter_root };
        }
        acc[chapter].total++;
        if (isCorrect) {
          acc[chapter].correct++;
        }
        return acc;
      }, {});

      Object.keys(scores).forEach(chapter => {
        const score = scores[chapter];
        score.percentage = (score.correct / score.total) * 100;
        score.evaluation = score.percentage >= 80 ? 'Bon' : 'À améliorer';
      });

      setChapterScores(scores);
    };

    loadScores();
  }, []);

  return (
    <div>
    <h1>Tableau des scores par chapitre</h1>
    {Object.entries(chapterScores).map(([chapter, scoreData]) => (
      <ChapterCard
        key={chapter}
        chapter={`Chapitre: ${chapter}`}
        title={
          <div>
              <p>{`Score: ${scoreData.correct}/${scoreData.total} (${scoreData.percentage.toFixed(2)}%) - ${scoreData.evaluation}`}</p>
           
          </div>
        }
        onClick={() => navigate(scoreData.chapter_root)}
      />
    ))}
  </div>
  );
}

export default ScoreBoard;
