import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, dbf } from './firebase'; // Import auth and dbf directly from the firebase file
import { collection, query, where, getDocs } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, getDoc  } from 'firebase/firestore';

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userData, setUserData] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        checkIfUserIsRegistered(authUser.uid);
        localStorage.setItem('user', JSON.stringify(authUser));
      } else {
        setUser(null);
        setUserData(null);
        setIsSubscribed(false);
        localStorage.removeItem('user');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      checkIfUserIsRegistered(JSON.parse(storedUser).uid);
    }
  }, []);

  const checkIfUserIsRegistered = async (userId) => {
    try {


      
      const docRef = doc(dbf, "users", userId);
      const docSnap = await getDoc(docRef);
  

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setUserData(docSnap.data());
        checkIfSubscriptionExists(userId);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }

  
    } catch (error) {
      console.error('Error checking user registration:', error);
    }
  };

  const checkIfSubscriptionExists = (userId) => {
    dbf.collection('users').doc(userId).collection('abonnement').get()
      .then((snapshot) => {
        setIsSubscribed(!snapshot.empty);
      })
      .catch((error) => {
        console.error('Error checking subscription:', error);
      });
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setErrorMessage('');
      checkIfUserIsRegistered(auth.currentUser.uid);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleSubscribe = async () => {
    // Implement your subscription logic here
  };

  return (
    <div>
      {user ? (
        <div>
          <p>You are logged in as {user.email}</p>
          {userData ? (
            <div>
              <p>Level of study: {userData.niveauEtude}</p>
              <p>Year of birth: {userData.anneeNaissance}</p>
              <p>City: {userData.ville}</p>
              <p>School: {userData.ecole}</p>
            </div>
          ) : (
            <p>Loading user data...</p>
          )}
          <button onClick={handleSignOut}>Sign Out</button>
          {!isSubscribed && <button onClick={handleSubscribe}>Subscribe</button>}
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignIn}>Sign In</button>
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default App;
