import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardActionArea, CardContent, Typography, Grid } from '@mui/material';
import { Box } from '@mui/system';

function Acceuil() {
  const navigate = useNavigate();
  const scale = 0.8;

  const NavigableCard = ({ children, onClick }) => (
    <Card onClick={onClick} style={{ maxWidth: `${300 * scale}px`, margin: '10px' }}>
      <CardActionArea>
        <CardContent>
          <Typography 
            variant="body1" 
            component="div" 
            style={{ 
              fontWeight: 'bold', 
              fontSize: '0.9rem',
              letterSpacing: '-0.5px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {children}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      backgroundColor="#F7F9FA"
      marginTop="130px"
    >
      <Grid container justifyContent="center" spacing={2}>
        {[
          ['/P2A1A', 'Division des nombres entiers'],
          ['/P2A1B', 'les multiples et les diviseurs'],
          ['/P3A3', 'Caractères de divisibilité'],
          ['/P3A4', 'Les Fractions'],
          ['/Chap13', 'Fractions équivalents'],
          ['/P3A5', 'Comparaison des fraction'],
          ['/P3A6', 'Construction des triangles'],
          ['/P3A7', 'Droites remerquable'],
          ['/P3A8', 'Perimetres et Aires'],
          ['/P2A1C', 'Calcue des prix'],
          ['/Aire2', 'Mesures des angles'],
          ['/Fraction2', 'Mesures des aires']
        ].map((item, index) => (
          <Grid item xs={6} key={index}>
            <NavigableCard onClick={() => navigate(item[0])}>{item[1]}</NavigableCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Acceuil;
