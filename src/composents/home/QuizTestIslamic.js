import React, { useState, useEffect } from 'react';
import QCMComponent from './RandomQuizarab';
import { searchByChapter } from '../../SyncFirebase'


function ExamenQCM() {
  const [qcmList, setQcmList] = useState([]);

  const chapter = "educationislamique";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await searchByChapter(chapter,"prepa-arabe");
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

      console.log("fetch data     from .................... test ..................   :    ", qcmList)
     return (
         <div>
           <QCMComponent questions={qcmList.slice(0, 2)} />
         </div>
       );
     };
    
     export default ExamenQCM;