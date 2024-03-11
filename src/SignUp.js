import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from "firebase/firestore";
import { dbf } from './firebase';



const openIndexedDB = (dbName) => {
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
      db.createObjectStore(dbName, { autoIncrement: true });
      console.log(`${dbName} Object store created`);
    };
  });
};

const initializeDatabases = async () => {
  try {
    await openIndexedDB("prepa-myfrançaisDB");
    await openIndexedDB("prepa-mymathsDB");
    await openIndexedDB("myscores");
    console.log("All databases and object stores created successfully");
  } catch (error) {
    console.error("Failed to create databases or object stores", error);
  }
};

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

  const handleSubmit = async () => {
    // Vérification des données utilisateur
    if (!user.name || !user.lastName || !user.address || !user.phone) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // Stockage des données utilisateur dans localStorage
      localStorage.setItem('user', JSON.stringify(user));
      setError(''); // Réinitialiser l'erreur si l'inscription réussit
      navigate('/'); // Rediriger vers la page d'accueil ou le tableau de bord après l'inscription
    } catch {
      setError('Failed to register the account');
    }

    try {
      // Ajout des données utilisateur dans Firestore et stockage de l'ID du document
      const docRef = await addDoc(collection(dbf, "users"), user);
      console.log("Document written with ID: ", docRef.id);

      // Stockage de l'ID du document de l'utilisateur en localStorage
      localStorage.setItem('userId', docRef.id);

      setError(''); // Réinitialiser l'erreur si l'inscription réussit
      navigate('/'); // Rediriger vers la page d'accueil ou le tableau de bord après l'inscription
    } catch (error) {
      setError('Failed to register the account');
    }

    try {
      // Votre logique d'inscription existante
  
      // Initialisation des bases de données IndexedDB après l'inscription réussie
      await initializeDatabases();
  
      // Suite de votre logique d'inscription (stockage de l'ID en localStorage, redirection, etc.)
    } catch (error) {
      setError('Failed to register the account or initialize databases');
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
