import QCM from '../../QCM';
import React, { useEffect, useState } from 'react';


function QCMC1(){

  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/Chapitre1.json'); // Notez le chemin d'accès absolu
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);

  

return(
        <div> <QCM questionsArray = {
          
          // équilibrealimentaire
          [

          {
            "question": "Quelle est la valeur de la chiffre 7 dans le nombre 7492319000 ?",
            "answers": ["7 millions", "7 milliards", "7 mille", "7 centaines"],
            "correctAnswer": "7 milliards",
            "explanation": "Dans le nombre 7492319000, le chiffre 7 représente 7 milliards.",
            "chapter": "équilibrealimentaire",
            "difficulty": "Facile"
          },
          {
            "question": "Quelle est la valeur de la chiffre 4 dans le nombre 7492319000 ?",
            "answers": ["4 millions", "4 milliards", "4 mille", "4 centaines de millions"],
            "correctAnswer": "4 centaines de millions",
            "explanation": "Dans le nombre 7492319000, le chiffre 4 représente 4 centaines de millions.",
            "chapter": "Numération",
            "difficulty": "Moyen"
          },
          {
            "question": "Combien de zéros y a-t-il dans un milliard ?",
            "answers": ["6", "7", "8", "9"],
            "correctAnswer": "9",
            "explanation": "Il y a 9 zéros dans un milliard.",
        
            "chapter": "Numération",
            "difficulty": "Facile"
          },
          {
            "question": "Quel est le chiffre des dizaines de millions dans le nombre 7492319000 ?",
            "answers": ["7", "4", "9", "3"],
            "correctAnswer": "9",
            "explanation": "Dans le nombre 7492319000, le chiffre des dizaines de millions est 9.",
            "chapter": "Numération",
            "difficulty": "Moyen"
          },
          {
            "question": "Si on ajoute 1 à 999999999, quel sera le résultat ?",
            "answers": ["1 milliard", "10 millions", "100 millions", "999999999"],
            "correctAnswer": "1 milliard",
            "explanation": "999999999 + 1 = 1000000000, qui est 1 milliard.",
        
            "chapter": "Calculs et opérations",
            "difficulty": "Facile"
          }
          ]}/></div>
    )
}

export default QCMC1;