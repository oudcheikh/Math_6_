import React, { useRef, useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const emailRef = useRef(); // Utiliser pour accéder à l'input de l'email
  const passwordRef = useRef(); // Utiliser pour accéder à l'input du mot de passe
  const { login } = useAuth(); // Récupère la fonction de connexion depuis le contexte d'authentification
  const [error, setError] = useState(''); // État local pour gérer les messages d'erreur
  const navigate = useNavigate(); // Permet la navigation programmée

  async function handleSubmit(e) {
    e.preventDefault(); // Prévient le comportement par défaut du formulaire
    console.log('Attempting to sign in with:', emailRef.current.value); // Log les tentatives de connexion

    try {
      setError(''); // Réinitialiser les messages d'erreur
      await login(emailRef.current.value, passwordRef.current.value); // Tente de se connecter avec l'email et le mot de passe
      console.log('Sign in successful'); // Log en cas de succès
      navigate('/'); // Rediriger vers la page d'accueil après la connexion réussie
    } catch (error) {
      console.error('Failed to sign in:', error); // Log en cas d'échec avec le message d'erreur
      setError('Failed to sign in'); // Afficher un message d'erreur en cas d'échec de la connexion
    }
  }

  return (
    <div>
      {error && <p>{error}</p>} {/* Affiche le message d'erreur s'il y en a un */}
      <form onSubmit={handleSubmit}>
        <input type="email" ref={emailRef} required placeholder="Email" />
        <input type="password" ref={passwordRef} required placeholder="Password" />
        <button type="submit">Login</button> {/* Texte du bouton mis à jour */}
      </form>
    </div>
  );
};

export default SignIn;
