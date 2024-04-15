import { dbf } from './firebase';
import { query, getDocs, collection } from "firebase/firestore";


const openIndexedDB = (dbName, storeNames) => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(dbName, 1); // Version 1 de la base de données

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
      // Crée chaque object store spécifié s'il n'existe pas déjà
      storeNames.forEach(storeName => {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { autoIncrement: true });
          console.log(`${storeName} Object store created`);
        }
      });
    };
  });
};

const initializeDatabaseWithStores = async () => {
  const dbName = "prepa-français"; // Nom de la base de données
  const storeNames = ["PRPAFR006", "PRPAHG006", "PRPAMA006"]; // Noms des object stores à créer

  try {
    await openIndexedDB(dbName, storeNames);
    console.log("Database and object stores created successfully");
  } catch (error) {
    console.error("Failed to create database or object stores", error);
  }
};

// Exécutez cette fonction pour initialiser la base de données et les object stores
//initializeDatabaseWithStores();


const addDataToIndexedDBStore = async (dbName, storeName, data) => {
  const db = await openIndexedDB(dbName, [storeName]);
  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);

  // Ajoute chaque QCM dans l'object store
  data.forEach(qcm => {
    store.add(qcm);
  });
  console.log("__________________________________ : ", data)

  // Attend que la transaction soit complète
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve(true);
    transaction.onerror = () => reject(transaction.error);
  });
};


// Fonction pour ouvrir la base de données IndexedDB
const openDatabase = (matiere) => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(matiere, 1);

    request.onerror = (event) => {
      reject(new Error('Erreur lors de l\'ouverture de la base de données IndexedDB.'));
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      const qcmStore = db.createObjectStore(matiere, { keyPath: 'id' });
        qcmStore.createIndex('matiereIndex', 'matiere'); // Créez un index sur le champ 'chapter'
        //qcmStore.createIndex('idIndex', 'id');  
      };
  });
};

// Fonction pour stocker les données dans IndexedDB
const storeDataInIndexedDB = async (dataList, matiere) => {
  try {
    const db = await openDatabase(matiere);
    console.log('Base de données ouverte avec succès.');

    // ["Mathématiques", "educationislamique", "sciencenaturelle","histoire" ]
    const tx = db.transaction(matiere, 'readwrite');
    const store = tx.objectStore(matiere);

    // const tx_math = db.transaction('Mathématiques', 'readwrite');
    // const store_math = tx.objectStore('Mathématiques');

    for (const data of dataList) {
      if (data.id) { // Vérifiez si data.id est défini
        try {
          const existingQCM = await store.get(data.id);
          if (!existingQCM) {
            // Définir les valeurs par défaut si elles ne sont pas définies
            if (!data.nbGoodResponse) {
              data.nbGoodResponse = 0;
            }
            if (!data.nbFausseResponse) {
              data.nbFausseResponse = 0;
            }

            await store.add(data);
            console.log(`QCM avec l'ID ${data.id} ajouté à IndexedDB.`);
          } else {
            await store.put(data);
            console.log(`QCM avec l'ID ${data.id} existe déjà dans IndexedDB. Mis à jour.`);
          }
        } catch (error) {
          console.error(`Erreur lors du stockage des données pour le QCM avec l'ID ${data.id}:`, error);
        }
      } else {
        console.error(`Erreur lors du stockage des données pour un QCM : ID non défini.`);
      }
    }

await tx.complete;
    console.log('Données stockées dans IndexedDB avec succès !');
  } catch (error) {
    console.error('Erreur lors du stockage des données dans IndexedDB :', error);
    throw error;
  }
};


// Fonction pour récupérer les QCM d'une collection spécifique sur Firestore
const fetchQCMsFromFirestore = async (collectionName) => {
  const qcmCollection = collection(dbf, collectionName);
  //const qcmSnapshot = await getDocs(qcmCollection);

  // Crée une requête limitée à 9 éléments
const qcmQuery = query(qcmCollection);

// Exécute la requête et récupère les documents
const qcmSnapshot = await getDocs(qcmQuery);

  // Ajout de nbCorrectAnswer et nbFalseAnswer initialisés à 0 pour chaque QCM
  const qcmList = qcmSnapshot.docs.map(doc => ({
    id: doc.id, 
    ...doc.data(), 
    nbCorrectAnswer: 0, 
    nbFalseAnswer: 0
  }));

  console.log('--------------------------------     ! qcmLIST : ',qcmList )
  return qcmList; // Retourne une liste de tous les QCM dans la collection spécifiée avec les nouveaux champs ajoutés
};



// Fonction pour synchroniser avec Firestore
export const synchronizeWithFirestorebymatire = async (section, matieres) => {
  // Déclaration de la variable collections
  let collections; // Correction ici

  const mapmatiere = [{ firestore: 'qcm-prpafr006', indexedDB: 'PRPAFR006' }, // Correction des valeurs indexedDB pour correspondre aux firestore
  { firestore: 'qcm-prpama006', indexedDB: 'PRPAMA006' },
  { firestore: 'qcm-prpasn006', indexedDB: 'PRPASN006' },
    { firestore: 'qcm-prpaei006', indexedDB: 'PRPAEI006' },
  { firestore: 'qcm-prpaar006', indexedDB: 'PRPAAR006' },
  { firestore: 'qcm-prpahg006', indexedDB: 'PRPAHG006' }]
  collections = mapmatiere.filter(element => matieres.includes(element.indexedDB));

  
  // Vérifie si collections a été défini
  if (!collections) {
    console.error('Section non reconnue ou collections non définies pour la section:', section);
    return; // Sortie précoce si collections n'est pas défini
  }

  for (const { firestore, indexedDB } of collections) {
    try {
      const qcms = await fetchQCMsFromFirestore(firestore);
      await addDataToIndexedDBStore(section, indexedDB, qcms);
      console.log(`Succès : Les données de ${firestore} ont été ajoutées à ${indexedDB}`);
    } catch (error) {
      console.error(`Erreur lors de l'ajout des données de ${firestore} à ${indexedDB}:`, error);
    }
  }
};

// Fonction pour synchroniser avec Firestore
export const synchronizeWithFirestore = async (section) => {
  // Déclaration de la variable collections
  let collections; // Correction ici

  if (section == "prepa-arabe") {
    collections = [
      { firestore: 'qcm-prpaei006', indexedDB: 'PRPAEI006' },
      { firestore: 'qcm-prpaar006', indexedDB: 'PRPAAR006' },
      { firestore: 'qcm-prpahg006', indexedDB: 'PRPAHG006' },
    ];
  } else if (section == "prepa-français") { // Utilisation de else if pour une meilleure clarté
    collections = [
      { firestore: 'qcm-prpafr006', indexedDB: 'PRPAFR006' }, // Correction des valeurs indexedDB pour correspondre aux firestore
      { firestore: 'qcm-prpama006', indexedDB: 'PRPAMA006' },
      { firestore: 'qcm-prpasn006', indexedDB: 'PRPASN006' }
    ];
  }

  // Vérifie si collections a été défini
  if (!collections) {
    console.error('Section non reconnue ou collections non définies pour la section:', section);
    return; // Sortie précoce si collections n'est pas défini
  }

  for (const { firestore, indexedDB } of collections) {
    try {
      const qcms = await fetchQCMsFromFirestore(firestore);
      await addDataToIndexedDBStore(section, indexedDB, qcms);
      console.log(`Succès : Les données de ${firestore} ont été ajoutées à ${indexedDB}`);
    } catch (error) {
      console.error(`Erreur lors de l'ajout des données de ${firestore} à ${indexedDB}:`, error);
    }
  }
};



// Fonction pour rechercher les QCM par chapitre
export const fetchResultsFromStore = async (dbName, storeName, filterCriteria) => {
  try {
    // Ouvrir la base de données IndexedDB existante
    const dbPromise = new Promise((resolve, reject) => {
      const openRequest = indexedDB.open(dbName);
      openRequest.onsuccess = () => resolve(openRequest.result);
      openRequest.onerror = () => reject(openRequest.error);
    });

    const db = await dbPromise;

    // Créer une transaction en lecture seule sur le store spécifié
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);

    // Supposer que l'index à utiliser est nommé 'matiereIndex'
    const index = store.index('matiereIndex');

    // Exécuter la requête sur l'index avec le critère fourni
    const resultsPromise = new Promise((resolve, reject) => {
      const request = index.getAll(IDBKeyRange.only(filterCriteria));
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    const results = await resultsPromise;

    // Fermer la base de données une fois la transaction terminée
    db.close();

    return results;
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
    throw error; // Propager l'erreur pour gestion ultérieure
  }
};





// export { synchronizeWithFirestore };
