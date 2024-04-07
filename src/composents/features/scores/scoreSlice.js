// features/scores/scoreSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const scoreSlice = createSlice({
    name: 'scores',
    initialState: {
      scoreList: [],
    },
    reducers: {
      addScore: (state, action) => {
        const { date } = action.payload;
        const existingIndex = state.scoreList.findIndex(score => score.date === date);
  
        if (existingIndex === -1) {
          // S'il n'y a pas de doublon, ajouter le score normalement
          state.scoreList.push(action.payload);
        } else {
          // Si un doublon est trouvé, vous pourriez choisir de le remplacer ou de simplement ignorer l'ajout
          // Exemple pour remplacer: state.scoreList[existingIndex] = action.payload;
          console.log(`Un score avec la date ${date} existe déjà.`);
        }
      },
      // Ajoutez d'autres reducers selon vos besoins
    },
  });
  
export const { addScore } = scoreSlice.actions;

export default scoreSlice.reducer;
