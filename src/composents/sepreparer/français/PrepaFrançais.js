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
import '../Button.css';
import '../../home/Major.css';

// Composant Card inchangé ...

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
  const [databaseExists, setDatabaseExists] = useState(false);

  const checkDataExistsInDB = (dbName, storeName, callback) => {
    const req = indexedDB.open(dbName);
  
    req.onsuccess = function (e) {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        // Si le store n'existe pas, cela signifie qu'il n'y a pas de données
        db.close();
        callback(false);
        return;
      }
  
      const transaction = db.transaction(storeName, 'readonly');
      const objectStore = transaction.objectStore(storeName);
      
      const countRequest = objectStore.count();
      
      countRequest.onsuccess = function () {
        const count = countRequest.result;
        db.close();
        callback(count > 0); // Vrai s'il y a des enregistrements, faux sinon
      };
      
      countRequest.onerror = function () {
        db.close();
        callback(false); // Faux si la requête de compte échoue
      };
    };
  
    req.onerror = function () {
      callback(false); // Faux si la connexion à la base de données échoue
    };
  
    req.onupgradeneeded = function (e) {
      // Cet événement est uniquement déclenché si la DB est en train d'être créée ou mise à niveau,
      // donc si ceci est appelé, nous savons qu'il n'y a pas de données existantes.
      e.target.result.close();
      callback(false); // Faux, car la base de données est nouvelle et donc vide
    };
  };
  

  useEffect(() => {
    // Vérifiez l'existence de la base de données au montage du composant
  
    checkDataExistsInDB('prepa-françaisDB','prepa-français', function(exists) {
      if(exists) {
        setDatabaseExists(true);
        console.log('La base de données "prepa-arabeDB" existe.');
      } else {
        console.log('La base de données "prepa-arabeDB" n\'existe pas.');
      }
    });
  }, []);

  const handleSynchronizeClick = async () => {
    setIsSyncing(true);
    try {
      await synchronizeWithFirestore("prepa-français");
      console.log('Synchronization successful!');
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
           <Card title="Science" content="" icon={flask} full navigateTo="/QuizTestScience" />
        <Card title="Math" content="" icon={calculator} full navigateTo="/QuizTestMath" />
        <Card title="Français" content="" icon={Fraçais} full navigateTo="/QuizTestFrançais" />
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