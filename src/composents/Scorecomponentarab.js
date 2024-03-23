import React, { useEffect } from 'react';
import anime from 'animejs';
import { Card } from '@mui/material';
import './Styles/Scorecomponent.css';
import imgsucess from './succes.png';
import imgechec from './echec.png';
//import ScoreTracker from './score/TrackScore'

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};


// Fonction pour ouvrir une connexion à une base de données IndexedDB spécifiée
function openDatabase(dbName) {
  return new Promise((resolve, reject) => {
      // Ouvrir une connexion à la base de données spécifiée
      let request = indexedDB.open(dbName);

      request.onsuccess = function(event) {
          // Connexion réussie
          resolve(event.target.result);
      };

      request.onerror = function(event) {
          // Gérer l'erreur d'ouverture
          reject('Database error: ' + event.target.errorCode);
      };

      // Créer le store "PRPAMA006" si nécessaire (lors de la première ouverture ou mise à jour de version)
     
  });
}

function updateAnswers(db, storeName, data) {

  let transaction = db.transaction(storeName, "readwrite");
  let store = transaction.objectStore(storeName);
  let index = store.index("idIndex"); // Utilise l'index pour le parcours

  console.log("index............ ", index)
  console.log("store............ ", store)


  data.forEach(question => {
      let id = question.id;

      // Utilise openCursor sur l'index pour trouver les enregistrements par leur id
      let request = index.openCursor(IDBKeyRange.only(id));

      request.onsuccess = function(event) {
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

      request.onerror = function() {
          console.log(`Erreur lors de la recherche de l'enregistrement avec l'id ${id}.`);
      };
  });

  transaction.oncomplete = function() {
      console.log('Transaction completed: database modification finished.');
  };

  transaction.onerror = function() {
      console.log('Transaction not opened due to error: ', transaction.error);
  };
}



const ScoreComponent = ({ allResponses, score, matiere}) => {
  
  console.log("---------------------  test component. score et matière ....",matiere, score)
  console.log("___________________________________________________ all response: ", allResponses)
  let dbName = "prepa-arabe"; // Nom de la base de données
let storeName = allResponses[0].matiere; // Nom du store
let data = allResponses;

console.log(" data to be update .............................  : ", dbName, storeName, data)
openDatabase(dbName).then(db => {
    updateAnswers(db, storeName, data);
}).catch(error => {
    console.error("Database error:", error);
});
  
  //const scores = ScoreTracker(matiere, score)
  ////////////////////////////////////////////////////////
  const currentDate = new Date().toISOString();
  const reallResponses = data.map(item => ({
    id: item.id,
    isCorrect: item.isCorrect
  }));
  // Mise à jour du localStorage
  const localStorageScores = JSON.parse(localStorage.getItem('scores')) || [];
  localStorageScores.push({ date: currentDate, matiere, score, resultat : reallResponses });
  localStorage.setItem('scores', JSON.stringify(localStorageScores));
  const isSuccess = score >= 50;



  useEffect(() => {
    if (isSuccess) {
      anime({
        targets: '.flower-particle',
        translateX: () => anime.random(-100, 100),
        translateY: [0, anime.random(200, 600)], // الجسيمات تتساقط
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
        translateY: [0, -anime.random(200, 600)], // الجسيمات ترتفع لترمز للفشل
        scale: [0, 2],
        opacity: [1, 0],
        easing: 'easeInExpo',
        duration: anime.random(3000, 5000),
        delay: anime.stagger(10, {start: 500})
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
            <p>تهانينا! 🎉</p>
            <img src={imgsucess} alt="Success" className="success-image" />
            <p>نقاطك هي {score}.</p>
          </div>
        ) : (
          <div className="failure-animation">
            <p>للأسف، لم تنجح. 😔</p>
            <img src={imgechec} alt="Failure" className="success-image" />
            <p>حاول مرة أخرى، نقاطك هي {score}.</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ScoreComponent;