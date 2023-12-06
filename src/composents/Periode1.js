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
        Période 1 : 6ème année
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
                chapter="/C1"
                title="/C1"
                onClick={() => navigate('/C1')}
              />

        <ChapterCard
                chapter="/C2"
                title="/C2"
                onClick={() => navigate('/C2')}
              />
        <ChapterCard
                chapter="/C3"
                title="/C3"
                onClick={() => navigate('/C3')}
              />
         <ChapterCard
                chapter="/C4"
                title="/C4"
                onClick={() => navigate('/C4')}
              />
        <ChapterCard
                chapter="/C5"
                title="/C5"
                onClick={() => navigate('/C5A1')}
              />
        <ChapterCard
                chapter="C6"
                title="C6"
                onClick={() => navigate('/C6')}
              />
         <ChapterCard
                chapter="C7"
                title="C7"
                onClick={() => navigate('/C7')}
              />
        <ChapterCard
                chapter="M2"
                title="M2"
                onClick={() => navigate('/M2')}
              />
        <ChapterCard
                chapter="G1"
                title="G1"
                onClick={() => navigate('/G1')}
              />

        <ChapterCard
                        chapter="G2"
                        title="G2"
                        onClick={() => navigate('/G2')}
                      />
        <ChapterCard
                        chapter="G3"
                        title="G3"
                        onClick={() => navigate('/G3')}
                      />
      </Stack>
    </Box>
  );
}

export default Accueil;

