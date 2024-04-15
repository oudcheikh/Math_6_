import React, { useEffect, useState } from 'react';
import anime from 'animejs';
import { Card } from '@mui/material';
import './Styles/Scorecomponent.css';
import imgsucess from './succes.png';
import imgechec from './echec.png';
import { useDispatch } from 'react-redux';
import { addScore } from './features/scores/scoreSlice';
import { increment } from './features/counter/counterSlice'
import { dbf } from '../firebase';
import { addDoc, collection, doc, setDoc } from "firebase/firestore";


const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const ScoreComponent = ({ allResponses, score, matiere }) => {

  const [renderedOnce, setRenderedOnce] = useState(false);
  const [scoreStored, setScoreStored] = useState(false);
  const [myscore, setmyscore] = useState(0)

  const isSuccess = score >= 50;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!renderedOnce) {
      let dbName = "prepa-français"; // Nom de la base de données
      let storeName = allResponses[0].matiere; // Nom du store
      let data = allResponses;

      // Fonction pour ouvrir une connexion à une base de données IndexedDB spécifiée
      const openDatabase = () => {
        return new Promise((resolve, reject) => {
          // Ouvrir une connexion à la base de données spécifiée
          let request = indexedDB.open(dbName);

          request.onsuccess = function (event) {
            // Connexion réussie
            resolve(event.target.result);
          };

          request.onerror = function (event) {
            // Gérer l'erreur d'ouverture
            reject('Database error: ' + event.target.errorCode);
          };

          // Créer le store "PRPAMA006" si nécessaire (lors de la première ouverture ou mise à jour de version)
        });
      };

      const updateAnswers = (db, storeName, data) => {
        let transaction = db.transaction(storeName, "readwrite");
        let store = transaction.objectStore(storeName);
        let index = store.index("idIndex"); // Utilise l'index pour le parcours

        data.forEach(question => {
          let id = question.id;

          // Utilise openCursor sur l'index pour trouver les enregistrements par leur id
          let request = index.openCursor(IDBKeyRange.only(id));

          request.onsuccess = function (event) {
            let cursor = event.target.result;

            if (cursor) {
              let dbQuestion = cursor.value; // L'enregistrement actuel pointé par le curseur
              let primaryKey = cursor.primaryKey; // La clé primaire de l'enregistrement actuel
              console.log(`Clé primaire de l'enregistrement: ${primaryKey}`);

              // Met à jour l'enregistrement selon si la réponse est correcte ou non
              if (question.isCorrect) {
                dbQuestion.nbCorrectAnswer = (dbQuestion.nbCorrectAnswer || 0) + 1;
              } else {
                dbQuestion.nbFalseAnswer = (dbQuestion.nbFalseAnswer || 0) + 1;
              }

              // Met à jour l'enregistrement dans le store
              cursor.update(dbQuestion);

              cursor.continue(); // Passe au prochain enregistrement si nécessaire
            } else {
              console.log(`Aucun enregistrement supplémentaire trouvé avec l'id ${id}.`);
            }
          };

          request.onerror = function () {
            console.log(`Erreur lors de la recherche de l'enregistrement avec l'id ${id}.`);
          };
        });

        transaction.oncomplete = function () {
          console.log('Transaction completed: database modification finished.');
        };

        transaction.onerror = function () {
          console.log('Transaction not opened due to error: ', transaction.error);
        };
      };

      openDatabase(dbName)
        .then(db => {
          updateAnswers(db, storeName, data);
        })
        .catch(error => {
          console.error("Database error:", error);
        });

      setRenderedOnce(true);
    }
  }, [allResponses, matiere, renderedOnce]);

  useEffect(() => {
    if (!scoreStored) {
      // Mise à jour du localStorage
      const currentDate = new Date().toISOString().replace(/\D/g, '').slice(0, -4);

      const reallResponses = allResponses.map(item => ({
        id: item.id,
        isCorrect: item.isCorrect
      }));
      const thismyscore = (reallResponses.filter(item => item.isCorrect)).length
      const localStorageScores = JSON.parse(localStorage.getItem('scores')) || [];
      localStorageScores.push({ date: currentDate, matiere, thismyscore, resultat: reallResponses });
      localStorage.setItem('scores', JSON.stringify(localStorageScores));

      setmyscore(thismyscore)   
      const scoreData = {
        date: new Date().toISOString().replace(/\D/g, '').slice(0, -4),
        matiere,
        score,
        responses: allResponses.map(({ id, isCorrect }) => ({ id, isCorrect })),
      };

      // Dispatch l'action pour ajouter le score au store Redux
      dispatch(addScore(scoreData));
      dispatch(increment(thismyscore)) ;

      const savedUser = localStorage.getItem('user');
      //useSyncWithFirebase(savedUser);
      const userData = JSON.parse(savedUser)
      const savedUserID = localStorage.getItem('userId');
      //useSyncWithFirebase(savedUser);
     
        const userDocRef = doc(dbf, "users", userData.phone + savedUserID); // Remplacez "userId" par l'ID de l'utilisateur
    
        try {
            // Créer un nouvel objet d'entrainement
            const nouvelEntrainement = {
                date: currentDate,
                matiere: matiere, // Vous pouvez modifier cela en fonction de la matière du test
                score: score, // Supposons que vous avez une fonction calculateScore pour calculer le score
                resultat: allResponses.map(({ id, isCorrect }) => ({ id, isCorrect })),
            };
    
            // Récupérer une référence à la collection "entrainement" dans le document utilisateur
            const entrainementCollectionRef = collection(userDocRef, 'entrainement');
    
            // Ajouter une nouvelle entrée dans la collection "entrainement" pour enregistrer le résultat du test
            addDoc(entrainementCollectionRef, nouvelEntrainement);
    
            console.log("Résultat du test enregistré avec succès");
        } catch (error) {
            console.error("Erreur lors de l'enregistrement du résultat du test:", error);
        }
    


      setScoreStored(true);
    }
  }, [allResponses, matiere, score, scoreStored]);

  useEffect(() => {
    if (isSuccess) {
      anime({
        targets: '.flower-particle',
        translateX: () => anime.random(-100, 100),
        translateY: [0, anime.random(200, 600)], // Les particules tombent
        scale: [0, 2],
        opacity: [1, 0],
        easing: 'easeOutExpo',
        duration: anime.random(3000, 5000),
        delay: anime.stagger(10)
      });
    } else {
      anime({
        targets: '.flower-particle',
        translateX: () => anime.random(-100, 100),
        translateY: [0, -anime.random(200, 600)], // Les particules montent pour symboliser l'échec
        scale: [0, 2],
        opacity: [1, 0],
        easing: 'easeInExpo',
        duration: anime.random(3000, 5000),
        delay: anime.stagger(10, { start: 500 })
      });
    }
  }, [isSuccess]);

  return (
    <div className="score-container">
      <Card className="score-card" elevation={4}>
        <div className="flower-container">
          {Array.from({ length: 600 }).map((_, i) => (
            <div
              key={i}
              className="flower-particle"
              style={{ backgroundColor: getRandomColor() }}
            />
          ))}
        </div>
        {isSuccess ? (
          <div className="success-animation">
            <p>Félicitations ! 🎉</p>
            <img src={imgsucess} alt="Success" className="success-image" />
            <p>Votre score est {myscore}.</p>
          </div>
        ) : (
          <div className="failure-animation">
            <p>Malheureusement, vous n'avez pas réussi. 😔</p>
            <img src={imgechec} alt="Failure" className="success-image" />
            <p>Essayez encore, votre score est {myscore}.</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ScoreComponent;
