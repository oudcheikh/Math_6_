import { dbf } from './firebase';
import { getDocs, collection, doc, getDoc } from "firebase/firestore";

const synchronizeWithFirestore = async () => {
  try {
    const mainCollection = '6AF';
    const documentId = 'chapitres';

    // Fetch chapter names
    const chapterNamesSnapshot = await getDocs(collection(dbf, mainCollection));
    const chapterNames = chapterNamesSnapshot.docs.map((doc) => doc.id);

    console.log("Chapter Names:", chapterNames);

    // Initialize an array to store the data for each chapter
    const chapterDataList = [];

    // Iterate through each chapter and fetch documents
    for (const chapterName of chapterNames) {
      const docRef = doc(dbf, mainCollection, chapterName);
      const docSnap = await getDoc(docRef);

      // Extract data from the chapter document
      const chapterData = docSnap.data();
      console.log(`Data from chapter "${chapterName}":`, chapterData);

      // Add the chapterName as id to the data
      const dataWithId = { ...chapterData, id: chapterName };
      chapterDataList.push(dataWithId);

      // Fetch QCM data from the 'qcm' subcollection
      const qcmCollection = collection(dbf, mainCollection, chapterName, 'qcm');
      const qcmDataSnapshot = await getDocs(qcmCollection);

      // Process QCM data and add it to the list
      qcmDataSnapshot.forEach((qcmDoc) => {
        const qcmData = qcmDoc.data();
        const qcmWithId = { ...qcmData, id: qcmDoc.id, chapterId: chapterName };
        chapterDataList.push(qcmWithId);
      });
    }

    // Store the data in IndexedDB
    await storeDataInIndexedDB(chapterDataList);

    console.log('Synchronization successful!');
  } catch (error) {
    console.error('Error during synchronization:', error);
    throw error;
  }
};

const storeDataInIndexedDB = async (dataList) => {
  try {
    const db = await openDatabase();
    const tx = db.transaction('myStore', 'readwrite');
    const store = tx.objectStore('myStore');

    // Iterate through the dataList
    for (const data of dataList) {
      // Check if the QCM with the same ID already exists in IndexedDB
      const existingQCM = await store.get(data.id);

      if (!existingQCM) {
        // If not, add the QCM to IndexedDB
        data.nbGoodResponse = 0; // Set an initial value
        data.nbFausseResponse = 0;
        await store.add(data);
      } else {
        // If it exists, you can choose to update it or skip it
        console.log(`QCM with ID ${data.id} already exists in IndexedDB. Skipping fetch from Firebase.`);
      }
    }

    // Close the transaction
    await tx.done;
  } catch (error) {
    console.error('Error storing data in IndexedDB:', error);
    throw error;
  }
};

// Function to open the IndexedDB database
const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('myDatabase', 1);

    request.onerror = (event) => {
      reject(new Error('Error opening the IndexedDB database.'));
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Create an object store
      const store = db.createObjectStore('myStore', { keyPath: 'id' });

      // Specify indexes if needed
      // store.createIndex('indexName', 'propertyName', { unique: false });
    };
  });
};

export { synchronizeWithFirestore };
