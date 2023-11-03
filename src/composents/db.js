import Dexie from 'dexie';

const db = new Dexie('QCMDatabase');

db.version(1).stores({
    responses: '++id, qcmId, isCorrect'
});

export default db;
