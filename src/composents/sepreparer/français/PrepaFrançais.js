import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import flask from '../../home/Icones/flask-potion.png';
import Fraçais from '../../home/Icones/language-learning.png';
import calculator from '../../home/Icones/calculator-simple.png';
import { synchronizeWithFirestore } from '../../../SyncFirebase';
import { useLanguage } from '../../../LanguageProvider';

import '../../home/Major.css';

// Composant Card inchangé ...

const dbName = "prepa-français";
const storeNames = ["PRPAMA006", "PRPASN006", "PRPAFR006"];

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
  const [matiereInlocal, setmatiereInlocal] = useState([]);
  const { toggleLanguage, t } = useLanguage();
  const handleResults = (results) => {
    // Faire quelque chose avec les résultats
    console.log("Résultats de la vérification des stores :", results);
    setmatiereInlocal(Object.keys(results).filter(key => results[key] === false))
  };
  
  const checkDataInStores = (dbName, storeNames, callback) => {
    const req = indexedDB.open(dbName);
    let results = {}; // Pour stocker les résultats pour chaque store
  
    req.onsuccess = function(e) {
      const db = e.target.result;
      let checkCount = 0; // Pour suivre le nombre de vérifications effectuées
  
      storeNames.forEach(storeName => {
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        
        // Ouvrir un curseur pour parcourir les données dans le store
        const cursorRequest = store.openCursor();
        
        cursorRequest.onsuccess = function(event) {
          const cursor = event.target.result;
          if (cursor) {
            // Des données ont été trouvées dans ce store
            results[storeName] = true;
          } else {
            // Aucune donnée n'a été trouvée dans ce store
            results[storeName] = false;
          }
          incrementAndCheck();
        };
  
        cursorRequest.onerror = function() {
          // En cas d'erreur lors de l'ouverture du curseur, considérer le store comme vide
          results[storeName] = false;
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

  console.log("--------------checkDataInStores---------------- : ", checkDataInStores(dbName, storeNames, handleResults))

});


  }, []);

  const handleSynchronizeClick = async () => {
    setIsSyncing(true);
    await synchronizeWithFirestore("prepa-français");
    const handleResults = (results) => {
      // Faire quelque chose avec les résultats
      console.log("handleSynchronizeClick:", results);
      setStoreDataStatus(results)
      setmatiereInlocal(Object.keys(results).filter(key => results[key] === false))
    };
    console.log("--------------checkDataInStores---------------- : ", checkDataInStores(dbName, storeNames, handleResults))
   
  };

  console.log("_____________databaseExists________________  :  ", databaseExists, matiereInlocal.length)

  return (
    <div className="app-container">
  {databaseExists ? (
    <div className="full-width-container">
      {storeDataStatus['PRPAMA006'] && (
        <Card title="Math" content="" icon={calculator} full navigateTo="/QuizTestMath" />
      )}
      {storeDataStatus['PRPASN006'] && (
        <Card title="Science Naturelle" content="" icon={flask} full navigateTo="/QuizTestScience" />
      )}
      {storeDataStatus['PRPAFR006'] && (
        <Card title="Français" content="" icon={Fraçais} full navigateTo="/QuizTestFrançais" />
      )}
     {matiereInlocal.length > 0 && (
     <div className="full-width-container">
        <button onClick={handleSynchronizeClick} disabled={isSyncing} className="download-button">
          {isSyncing ? 'Recuperation en cours ...' : '   Recuperer le contenu '}
          
        </button>
      </div>)}


    </div>
  ) : (
    <div className="full-width-container">
        {/* {matiereInlocal.length > 0 && (  // Condition pour afficher le bouton uniquement si matiereInlocal.length > 0 */}
          <div className="full-width-container">
            
          </div>
    
      </div>
    )}
  </div>
);
}

export default Acceuil;