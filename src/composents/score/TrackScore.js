export function ScoreTracker(subject, score) {
    console.log("ScoreTracker inscore module.....................................  :::  ", subject, score);

    const currentDate = new Date().toISOString();

    // Mise à jour du localStorage
    const localStorageScores = JSON.parse(localStorage.getItem('scores')) || [];
    localStorageScores.push({ date: currentDate, subject, score });
    localStorage.setItem('scores', JSON.stringify(localStorageScores));

    // Mise à jour de IndexedDB
    const openDB = indexedDB.open('scoresDB', 1);

    openDB.onupgradeneeded = function() {
        const db = this.result;
        if (!db.objectStoreNames.contains('scores')) {
            db.createObjectStore('scores', { autoIncrement: true });
        }
    };

    openDB.onsuccess = function() {
        const db = this.result;
        const transaction = db.transaction(['scores'], 'readwrite');
        const store = transaction.objectStore('scores');
        const request = store.add({ date: currentDate, subject, score });

        request.onsuccess = function() {
            console.log('Score successfully added to scoresDB');
        };

        request.onerror = function() {
            console.error('Error adding score to scoresDB:', this.error);
        };

        // Assurez-vous de fermer la connexion lorsque vous avez terminé.
        transaction.oncomplete = function() {
            db.close();
        };
    };

    openDB.onerror = function() {
        console.error('Error opening scoresDB:', this.error);
    };
}


export const readScoresFromLocalStorage = () => {
    return new Promise((resolve, reject) => {
        try {
            // Récupérer les scores stockés sous forme de chaîne JSON dans localStorage
            const scoresString = localStorage.getItem('scores');
            // Parser la chaîne JSON pour obtenir un tableau d'objets
            const scoresArray = JSON.parse(scoresString);

            if (!scoresArray) {
                throw new Error('No scores found');
            }

            // Convertir les résultats en format désiré
            const scoresList = scoresArray.map(item => ({
                matiere: item.subject,
                score: item.score
            }));

            // Calculer la somme des scores pour chaque matière
            const totalScores = scoresList.reduce((acc, item) => {
                if (item.matiere && typeof item.score === 'number') {
                    acc[item.matiere] = acc[item.matiere] || 0;
                    acc[item.matiere] += item.score;
                }
                return acc;
            }, {});

            resolve(totalScores);
        } catch (error) {
            reject(error);
        }
    });
};


  
export default { readScoresFromLocalStorage, ScoreTracker};
