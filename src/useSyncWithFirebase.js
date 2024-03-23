import { useEffect } from 'react';
import { dbf } from './firebase'; // Utilisez votre instance de Firestore
import { doc, updateDoc } from 'firebase/firestore';

const useSyncWithFirebase = (user) => {

    console.log('________________________ in hock')
  useEffect(() => {
    // Fonction pour synchroniser les données avec Firebase
    const syncData = async () => {
      const dataToSync = localStorage.getItem('scores');

      if (navigator.onLine && dataToSync) {
        const userDocRef = doc(dbf, "users", user.phone); // Remplacez "userId" par l'ID de l'utilisateur
        const nouveauChamp = { nouveauChamp: 'valeurDuNouveauChamp' }; // Le nouveau champ et sa valeur

        try {
            await updateDoc(userDocRef, nouveauChamp);
            console.log("Document mis à jour avec succès");
        } catch (error) {
            console.error("Erreur lors de la mise à jour du document:", error);
        }
            }
            };

    // Écouteur d'événements pour détecter le retour en ligne et synchroniser
    window.addEventListener('online', syncData);
    console.log('________________________ inavigator.onLine: ', navigator.onLine)
    

    if (navigator.onLine) {
        try {
            syncData();
          console.log('Synchronisation réussie');
          // Optionnel : supprimez l'élément local storage après la synchronisation
          // localStorage.removeItem(key);
        } catch (error) {
          console.error('Erreur de synchronisation', error);
        }
      }

    return () => {
      window.removeEventListener('online', syncData);
    };
  }, [user]);
};

export default useSyncWithFirebase;
