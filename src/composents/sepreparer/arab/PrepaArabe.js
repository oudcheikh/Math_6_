import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { synchronizeWithFirestore } from '../../../SyncFirebase';
import historyIcon from '../../home/Icones/history-book.png';
import praying from '../../home/Icones/praying.png';
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
  
    checkDataExistsInDB('prepa-arabeDB','prepa-arabe', function(exists) {
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
      await synchronizeWithFirestore("prepa-arabe");
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
          <Card title="التاريخ" content="" icon={historyIcon} full navigateTo="/QuizTestHistoire" />
          <Card title="التربية الاسلامية" content="" icon={praying} full navigateTo="/QuizTestIslamic" />
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
