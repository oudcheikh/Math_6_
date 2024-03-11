import { dbf } from './firebase';
import { getDocs, collection } from "firebase/firestore";

// Fonction pour ouvrir la base de données IndexedDB
const openDatabase = (matiere) => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(matiere + "DB", 1);

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

// Fonction pour synchroniser avec Firestore
export const synchronizeWithFirestore = async (matiere) => {
  try {
    const mainCollection = 'qcm-6af';
    const qcmSnapshot = await getDocs(collection(dbf, mainCollection));
    const qcmList = qcmSnapshot.docs.map((doc) => {
      const qcmData = doc.data();
      qcmData.id = doc.id; // Ajoutez l'ID du document au QCM
      qcmData.nbGoodResponse = 0; // Valeur par défaut
      qcmData.nbFausseResponse = 0; // Valeur par défaut
      return qcmData;
    });
    console.log("--------------------------- qcm : ", qcmList);

    await storeDataInIndexedDB(qcmList, matiere);

    console.log('Synchronisation réussie !');
  } catch (error) {
    console.error('Erreur lors de la synchronisation :', error);
    throw error;
  }
};


// Fonction pour rechercher les QCM par chapitre
export const  searchByChapter = async (filtredmatiere, matiere) => {
  try {
    // Ouvrir la base de données IndexedDB
    const db = await openDatabase(matiere);

    // Créer une transaction en lecture seule
    const tx = db.transaction(matiere, 'readonly');
    const store = tx.objectStore(matiere);
    const index = store.index('matiereIndex');
    const request = index.getAll(IDBKeyRange.only(filtredmatiere));

    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        const qcmList = event.target.result;
        resolve(qcmList);
        console.log("________________________________________ : ", qcmList)
      };

      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  } catch (error) {
    console.error('Erreur lors de la recherche des QCM par chapitre :', error);
    throw error;
  }
};



// export { synchronizeWithFirestore };
