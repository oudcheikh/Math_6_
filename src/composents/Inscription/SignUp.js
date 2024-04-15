import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { dbf } from './../../firebase';
import { useLanguage } from '../../LanguageProvider';
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import HomeIcon from '@mui/icons-material/Home';
import AppsIcon from '@mui/icons-material/Apps';
import './Styles.css'; //
const SignUp = () => {

    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [adresse, setadresse] = useState('');
    const [ecol, setEcol] = useState('');

    const [adressevalide, setadresseeValide] = useState(false);
    const [firstvalide, setfirstValide] = useState(false);
    const [Lastnamevalide, setLastnameValide] = useState(false);
    const [phonevalide, setPhoneValide] = useState(false);
    
    const [isFormValid, setIsFormValide] = useState(false);
    const [errors, setErrors] = useState({});
    const { toggleLanguage, t } = useLanguage();

  const [user, setUser] = useState({
    name: '',
    lastName: '',
    address: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setIsFormValide(adressevalide && firstvalide && Lastnamevalide && phonevalide);
}, [adressevalide, firstvalide, Lastnamevalide, phonevalide]);

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
    // if (!phone || !firstName || !lastName || !ecol) {
    //   setError('Veuillez remplir tous les champs');
    //   return;
    // }

    console.log("-------------------------- : ", user)
    console.log("------------------------------ ; ", phone, firstName, lastName, adresse, ecol)
    try {
      // Authentification de l'utilisateur anonymement avec Firebase
      const auth = getAuth();
      const userCredential = await signInAnonymously(auth);
      const firebaseUser = userCredential.user;


      const userId = phone; // Utilisez le numéro de téléphone comme identifiant de document, par exemple

      // Créer une référence au document avec l'identifiant spécifié
      const userDocRef = doc(dbf, 'users', userId+firebaseUser.uid);
      // Ajouter les données utilisateur au document avec l'identifiant spécifié
      const user = {
        "name": firstName,
        "lastName": lastName,
        "address": adresse,
        "phone": phone,
        "ecole":ecol
    }
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
  const checkFormValidity = () => {
    setIsFormValide(adressevalide && firstvalide && Lastnamevalide && phonevalide);
};


const validateFirstName = () => {
    if (firstName.length > 6) {
        setErrors((prevErrors) => ({ ...prevErrors, firstName: 'Le prénom ne doit pas dépasser 6 caractères' }));
        setfirstValide(false)
    } else {
        setErrors((prevErrors) => ({ ...prevErrors, firstName: '' }));
        setfirstValide(true)

    }
    checkFormValidity()
};

const validateLastName = () => {
    if (lastName.length > 6) {
        setErrors((prevErrors) => ({ ...prevErrors, lastName: 'Le nom ne doit pas dépasser 6 caractères' }));
        setLastnameValide(false)
    } else {
        setErrors((prevErrors) => ({ ...prevErrors, lastName: '' }));
        setLastnameValide(true)

    }
    checkFormValidity()
};

const validatePhone = () => {
    if ((!/^\d+$/.test(phone)) || (phone.length != 9)) {
        setErrors((prevErrors) => ({ ...prevErrors, phone: 'Le numéro de téléphone doit contenir uniquement 9 chiffres' }));
        setPhoneValide(false)
    } else {
        setErrors((prevErrors) => ({ ...prevErrors, phone: '' }));
        setPhoneValide(true)

    }
    checkFormValidity()
};

// const isFormValid = () => {
//     return Object.values(errors).every((error) => error === '');
// };

const Sauvegarder = () => {
    if (isFormValid) {
        console.log("Formulaire valide, sauvegarde en cours...");
    } else {
        console.log("Le formulaire n'est pas valide. Veuillez remplir correctement tous les champs.");
    }
};

  return (
    <div> 
    <div className="profile-container">
            <div className="profile">

                <div className="profile-info">
                   
                    <h2>{t('moncompte')}</h2>

                    
                    <div className="input-field">
                        <label htmlFor="firstName">{t('prenom')}</label>
                        <input type="text" id="firstName" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)}  />
                        {errors.firstName && <span className="error">{errors.firstName}</span>}
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">{t('nom')}</label>
                        <input type="text" id="lastName" name="lastName" Value={lastName} onChange={(e) => setLastName(e.target.value)}  />
                        {errors.lastName && <span className="error">{errors.lastName}</span>}
                    </div>
                    
                    <div className="input-field">
                        <label htmlFor="phone">{t('phone')}</label>
                        <input type="tel" id="phone"  pattern="[0-9]{10}" name="phone" Value={phone} onChange={(e) => setPhone(e.target.value)} />
                        {errors.phone && <span className="error">{errors.phone}</span>}
                    </div>

                    <div className="input-field">
                        <label htmlFor="phone">{t('Adress')}</label>
                        <input type="tel"  onChange={(e) => setadresse(e.target.value)}  />
                        {errors.phone && <span className="error">{errors.phone}</span>}
                    </div>


                    <div className="input-field">
                        <label htmlFor="phone">{t('ecole')}</label>
                        <input type="tel"  onChange={(e) => setEcol(e.target.value)}  />
                        {errors.phone && <span className="error">{errors.phone}</span>}
                    </div>


                    <div>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                    </div>
                    <button className="save-button" onClick={handleSubmit}>{t('sinscrire')}</button>

                    <div>


                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                    </div>
                   
                    <footer>
            

            
        </footer>
                </div>
              

            </div>

          

        </div>
        </div>
  );
};
//onClick={handleSubmit}

export default SignUp;
