import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // utilise localStorage pour le stockage par défaut

import counterReducer from './composents/features/counter/counterSlice';
import scoreReducer from './composents/features/scores/scoreSlice';

// Configuration de redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['scores', 'counter'], // Vous pouvez choisir les parties de l'état à persister
};

const rootReducer = combineReducers({
  counter: counterReducer,
  scores: scoreReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Création du store avec le reducer persisté
const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
