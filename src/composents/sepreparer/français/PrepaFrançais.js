import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import rocketIcon from '../../home/Icones/rocket-lunch.png';
import statsIcon from '../../home/Icones/stats.png';
import timeIcon from '../../home/Icones/time-twenty-four.png';
import quiz from '../../home/Icones/quiz.png';
import flask from '../../home/Icones/flask-potion.png';
import Fraçais from '../../home/Icones/language-learning.png';
import calculator from '../../home/Icones/calculator-simple.png';
import { synchronizeWithFirestore } from '../../../SyncFirebase';
import '../../home/Major.css';

// Composant Card inchangé ...

const dbName = "prepa-français";
const storeNames = ["PRPAMA006", "PRPASN006", "PRPASN006"];

const Card = ({ title, content, icon, full, navigateTo }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (navigateTo) {
      navigate(navigateTo);
    }
  };

  return (
    <div className={`card ${full ? 'full-card' : ''}`} onClick={handleClick}>
      {icon && <img src={icon} alt={title} className="card-icon" />}
      <div className="card-content">
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    </div>
  );
};

function Acceuil() {
  const navigate = useNavigate();
  const [isSyncing, setIsSyncing] = useState(false);
  const [databaseExists, setDatabaseExists] = useState(true);
  const [storeDataStatus, setStoreDataStatus] = useState({}); // Initialiser l'état pour stocker les résultats

  const checkDataInStoresUsingIndex = (dbName, storeNames, callback) => {
    const req = indexedDB.open(dbName);
    let results = {}; // Pour stocker les résultats pour chaque store
  
    req.onsuccess = function(e) {
      const db = e.target.result;
      let checkCount = 0; // Pour suivre le nombre de vérifications effectuées
  
      storeNames.forEach(storeName => {
        if (!db.objectStoreNames.contains(storeName)) {
          results[storeName] = false; // Le store n'existe pas
          incrementAndCheck();
          return;
        }
  
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const index = store.index('matiereIndex'); // Utiliser l'index 'matiereIndex'
        
        // Nous allons vérifier l'existence d'entrées en utilisant l'index
        const request = index.count(); // Compter les entrées dans l'index
        request.onsuccess = () => {
          results[storeName] = request.result > 0; // true si l'index contient au moins une entrée
          incrementAndCheck();
        };
  
        request.onerror = () => {
          results[storeName] = false; // Considérer comme vide en cas d'erreur
          incrementAndCheck();
        };
      });
  
      function incrementAndCheck() {
        checkCount++;
        if (checkCount === storeNames.length) {
          db.close();
          callback(results); // Appeler le callback avec les résultats quand toutes les vérifications sont terminées
        }
      }
    };
  
    req.onerror = function() {
      // En cas d'erreur de connexion, renvoyer `false` pour chaque store
      storeNames.forEach(storeName => {
        results[storeName] = false;
      });
      callback(results);
    };
  
    req.onupgradeneeded = function() {
      // Si la base de données est nouvelle ou mise à niveau, considérer tous les stores comme vides
      storeNames.forEach(storeName => {
        results[storeName] = false;
      });
      callback(results);
    };
  };
  
  
  

  useEffect(() => {
    // Vérifiez l'existence de la base de données au montage du composant
  
   

checkDataInStoresUsingIndex(dbName, storeNames, (results) => {
  setStoreDataStatus(results); // Mise à jour de l'état avec les résultats
  console.log("PRPAEI-----------------------------------006", results); // Cela affichera quelque chose comme { PRPAEI006: true, PRPAAR006: false, PRPAHG006: true }
});


  }, []);

  const handleSynchronizeClick = async () => {
    setIsSyncing(true);
    try {
      await synchronizeWithFirestore("prepa-français");
      console.log('Synchronization successful!');

      checkDataInStoresUsingIndex(dbName, storeNames, (results) => {
        setStoreDataStatus(results); // Mise à jour de l'état avec les résultats
        console.log("PRPAEI-----------------------------------006", results); // Cela affichera quelque chose comme { PRPAEI006: true, PRPAAR006: false, PRPAHG006: true }
      });
      //setDatabaseExists(true); // La base de données doit exister après la synchronisation
    } catch (error) {
      console.error('Error during synchronization:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  console.log("_____________databaseExists________________  :  ", databaseExists)

  return (
    <div className="app-container">
  {databaseExists ? (
    <div className="full-width-container">
      {storeDataStatus['PRPASN006'] && (
           <Card title="Science" content="" icon={flask} full navigateTo="/QuizTestScience" />
           )}
      {storeDataStatus['PRPAMA006'] && (
        <Card title="Math" content="" icon={calculator} full navigateTo="/QuizTestMath" />
        )}
      {storeDataStatus['PRPAFR006'] && (
        <Card title="Français" content="" icon={Fraçais} full navigateTo="/QuizTestFrançais" />
        )}
      <div className="full-width-container">
        <button onClick={handleSynchronizeClick} disabled={isSyncing} className="download-button">
          {isSyncing ? 'Recuperation en cours ...' : '   Recuperer le contenu '}
        </button>
      </div>
    </div>
  ) : (
    <div className="full-width-container">
      <div className="full-width-container">
        <button onClick={handleSynchronizeClick} disabled={isSyncing} className="download-button">
          {isSyncing ? 'Recuperation en cours ...' : '   Recuperer le contenu '}
        </button>
      </div>
    </div>
  )}
</div>

  );
}

export default Acceuil;

