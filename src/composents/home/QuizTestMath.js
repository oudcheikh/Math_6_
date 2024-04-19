import React, { useState, useEffect } from 'react';
import QCMComponent from './RandomQuiz';
import { fetchResultsFromStore } from '../../SyncFirebase'


function ExamenQCM() {
  const [qcmList, setQcmList] = useState([]);

  const chapter = "Mathématiques";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchResultsFromStore("prepa-français", "PRPAMA006", "PRPAMA006");
        setQcmList(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchData();

    // Clean-up function
    return () => {
      // Perform any cleanup if necessary
    };
  }, []); // Exécutez l'effet à chaque fois que le chapitre change
  const minNbCorrectAnswer = Math.min(...qcmList.map(qcm => qcm.nbCorrectAnswer));
  // Remarque: Vous pouvez ajuster le critère de tri selon vos besoins
    const filteredAndSortedQCMs = qcmList
    .filter(qcm => qcm.nbCorrectAnswer === minNbCorrectAnswer)
    .sort((a, b) => a.nbCorrectAnswer - b.nbCorrectAnswer); // Ou tout autre critère de tri

    console.log("filteredAndSortedQCMs : ", filteredAndSortedQCMs);

  
  
     return (
         <div>
           <QCMComponent questions={filteredAndSortedQCMs.slice(0,10)} />
         </div>
       );
     };
    export default ExamenQCM;