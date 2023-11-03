import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";
import { Button as MuiButton, Stack } from '@mui/material';
import { Box  } from '@mui/system';



const MathChapters = () => {
    const navigate = useNavigate();
    const scale = 0.8;
    const chapters = ["Algebra", "Geometry", "Calculus"];  // Exemple de chapitres
  
    const goBack = () => {
      navigate(-1);  // Navigue à la page précédente
    };


    const Button = ({ children, onClick }) => (
      <MuiButton 
        variant="contained" 
        onClick={onClick}
        style={{
          borderRadius: 35 * scale,
          padding: `${18 * scale}px ${36 * scale}px`,
          fontSize: `${18 * scale}px`,
          textTransform: "none",
          width: `${200 * scale}px`,
          backgroundColor: '#0000FF',
          '&:hover': {
            backgroundColor: '#0000FF',
          },
        }}
      >
        {children}
      </MuiButton>
    );
  
    return (
      <div>
        <button onClick={goBack}>Retour</button>  {/* Bouton de retour */}
        <Typography variant="h4" gutterBottom align="center">
          Chapitres en Mathématiques
        </Typography>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4} key={1} style={{ margin: '0 16px' }}>
              <Card onClick={() => navigate('/Periode1')}>
                <CardContent>
                  <Typography variant="h6">Periode1</Typography>
                </CardContent>
              </Card>
            </Grid>
        </Grid>
        <br/>
        <br/>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4} key={1} style={{ margin: '0 16px' }}>
              <Card onClick={() => navigate('/Periode2')}>
                <CardContent>
                  <Typography variant="h6">Periode2</Typography>
                </CardContent>
              </Card>
            </Grid>
        </Grid>
        
        
      </div>
    );
  };
  export default MathChapters;