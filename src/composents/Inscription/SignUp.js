import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { dbf } from './../../firebase';
import { addDoc, collection, doc, setDoc } from "firebase/firestore";


const SignUp = () => {
  const [user, setUser] = useState({
    name: '',
    lastName: '',
    address: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const initializeDatabaseWithStores = async () => {
    const openIndexedDB = (dbName, storeNames) => {
      return new Promise((resolve, reject) => {
        const request = window.indexedDB.open(dbName, 1);
  
        request.onerror = function(event) {
          console.error(`Database error: ${event.target.errorCode}`);
          reject(event.target.errorCode);
        };
  
        request.onsuccess = function(event) {
          console.log(`${dbName} Database opened successfully`);
          resolve(event.target.result);
        };
  
        request.onupgradeneeded = function(event) {
          const db = event.target.result;
  
          storeNames.forEach(storeName => {
            let objectStore;
            if (!db.objectStoreNames.contains(storeName)) {
              objectStore = db.createObjectStore(storeName, { autoIncrement: true });
              console.log(`${storeName} Object store created`);
            } else {
              objectStore = event.currentTarget.transaction.objectStore(storeName);
            }
  
            if (!objectStore.indexNames.contains('matiereIndex')) {
              objectStore.createIndex('matiereIndex', 'matiere', { unique: false });
              objectStore.createIndex('idIndex', 'id', { unique: false });
              console.log(`Index 'matiereIndex' on 'matiere' field created in ${storeName}`);
            }
          });
        };
      });
    };
  
    const dbName = "prepa-français";
    const storeNames = ["PRPAFR006", "PRPASN006", "PRPAMA006"];
  
    try {
      await openIndexedDB(dbName, storeNames);
      console.log("Database and object stores created successfully");
    } catch (error) {
      console.error("Failed to create database or object stores", error);
    }
  
    const dbNameAR = "prepa-arabe";
    const storeNamesFR = ["PRPAAR006", "PRPAHG006", "PRPAEI006"];
  
    try {
      await openIndexedDB(dbNameAR, storeNamesFR);
      console.log("Database and object stores created successfully");
    } catch (error) {
      console.error("Failed to create database or object stores", error);
    }
  };

  const handleSubmit = async () => {
    // Vérification des données utilisateur
    if (!user.name || !user.lastName || !user.address || !user.phone) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    try {
      // Authentification de l'utilisateur anonymement avec Firebase
      const auth = getAuth();
      const userCredential = await signInAnonymously(auth);
      const firebaseUser = userCredential.user;


      const userId = user.phone; // Utilisez le numéro de téléphone comme identifiant de document, par exemple

      // Créer une référence au document avec l'identifiant spécifié
      const userDocRef = doc(dbf, 'users', userId+firebaseUser.uid);
      // Ajouter les données utilisateur au document avec l'identifiant spécifié
      await setDoc(userDocRef, user);
      console.log('Utilisateur enregistré avec succès dans Firestore avec l\'identifiant de document spécifié :', userId);


      // Initialisation des bases de données IndexedDB
      await initializeDatabaseWithStores();

      // Stockage de l'ID de l'utilisateur en localStorage
      localStorage.setItem('userId', firebaseUser.uid);
      // Stockage des informations utilisateur en local
      localStorage.setItem('user', JSON.stringify(user));
      console.log('Informations utilisateur stockées localement');

    // Stockage de l'ID de l'utilisateur en localStorage
    localStorage.setItem('userId', firebaseUser.uid);

    // Réinitialiser l'erreur si l'inscription réussit

      // Réinitialiser l'erreur si l'inscription réussit
      setError('');

      // Rediriger vers la page d'accueil ou le tableau de bord après l'inscription
      navigate('/');
    } catch (error) {
      setError('Échec de l\'inscription ou de l\'initialisation des bases de données');
      console.error(error);
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <div>
        <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="Nom" />
        <input type="text" name="lastName" value={user.lastName} onChange={handleChange} placeholder="Prénom" />
        <input type="text" name="address" value={user.address} onChange={handleChange} placeholder="Adresse" />
        <input type="tel" name="phone" value={user.phone} onChange={handleChange} placeholder="Numéro de téléphone" />
        <button onClick={handleSubmit}>S'inscrire</button>
      </div>
    </div>
  );
};

export default SignUp;
