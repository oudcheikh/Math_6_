
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography , Stack } from '@mui/material';
import { Box  } from '@mui/system';
import { IconButton } from '@mui/material';
import ChapterCard from './ChapterCard.js';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Accueil() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);  // Navigue à la page précédente
  };

  const backgroundStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    minHeight: "100vh",
    backgroundColor: "#FAFAFA", 
    // backgroundImage: 'linear-gradient(to right, #ffa17f, #00223e)', // Exemple de dégradé
    // Ajoutez vos autres styles de Box ici
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    // Assurez-vous qu'il n'y a pas de marge supplémentaire ou de padding qui affecte l'alignement
  };

 

  return (
    <Box style={{ ...backgroundStyle, width: '100%' }}>
      {/* En-tête avec le bouton de retour à gauche et le titre à côté */}
      <Box sx={{
        display: 'flex', // Utilise Flexbox pour l'alignement horizontal.
        alignItems: 'center', // Alignement vertical au centre.
        justifyContent: 'flex-start', // Alignement à gauche.
        width: '100%', // La Box prend toute la largeur.
        padding: '10px 0', // Padding vertical pour un peu d'espace en haut et en bas.
      }}>
        {/* Bouton de retour */}
        <IconButton onClick={goBack} aria-label="retour" edge="start" sx={{ marginRight: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        
        {/* Titre */}
        
      </Box>
      <Box sx={{
        width: "100%", // Pour que cette Box remplit la largeur
        textAlign: 'center', // Centre le texte horizontalement
        // padding: '1px 0', // Ajoute de l'espace au-dessus et au-dessous
        backgroundColor: "#FAFAFA", // Assurez-vous que cette couleur correspond au reste du fond
      }}>
        <Typography variant="h5" color="primary" gutterBottom noWrap>
          Période 2 : 6ème année
        </Typography>
        <span role="img" aria-label="smile" style={{ fontSize: '2rem' }}>réviser bien 😊</span>
      </Box>
      
      <Stack
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{
          width: "100%", // Assurez-vous que la pile prend toute la largeur
          maxWidth: "600px", // Définissez la largeur maximale souhaitée pour les cartes
        }}
      >
        <ChapterCard
                chapter="Division des nombres entiers"
                // title="/C1"
                onClick={() => navigate('/P2A1A')}
              />

        <ChapterCard
                chapter="les multiples et les diviseurs"
                // title="/C2"
                onClick={() => navigate('/P2A1B')}
              />
        <ChapterCard
                chapter="Caractères de divisibilité"
                // title="/C3"
                onClick={() => navigate('/P3A4')}
              />
         <ChapterCard
                chapter="Les Fractions"
                // title="/C4"
                onClick={() => navigate('/P3A4')}
              />
        <ChapterCard
                chapter="Fractions équivalents"
                //title="/C5"
                onClick={() => navigate('/Chap13')}
              />
        <ChapterCard
  chapter="Comparaison des fractions"
  // title="/P3A5"
  onClick={() => navigate('/P3A5')}
/>

<ChapterCard
  chapter="Construction des triangles"
  // title="/P3A6"
  onClick={() => navigate('/P3A6')}
/>

<ChapterCard
  chapter="Droites remarquables"
  // title="/P3A7"
  onClick={() => navigate('/P3A7')}
/>

<ChapterCard
  chapter="Périmètres et Aires"
  // title="/P3A8"
  onClick={() => navigate('/P3A8')}
/>

<ChapterCard
  chapter="Calcul des prix"
  // title="/P2A1C"
  onClick={() => navigate('/P2A1C')}
/>

<ChapterCard
  chapter="Mesures des angles"
  // title="/Aire2"
  onClick={() => navigate('/Aire2')}
/>

<ChapterCard
  chapter="Mesures des aires"
  // title="/Fraction2"
  onClick={() => navigate('/Fraction2')}
/>

      </Stack>
    </Box>
  );
}

export default Accueil;
