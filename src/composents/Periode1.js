import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardActionArea, CardContent, Typography, Grid } from '@mui/material';
import { Box } from '@mui/system';

function Accueil() {
  const navigate = useNavigate();

  const NavigableCard = ({ children, onClick }) => (
    <Card onClick={onClick} style={{ maxWidth: '300px', margin: '10px' }}>
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" component="div">
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
    >
      <Grid container justifyContent="center" spacing={2}>
        {[['/C1', 'C1'], ['/C2', 'C2'], ['/C3', 'C3'], ['/C4', 'C4'], ['/C5A1', 'C5'], 
          ['/C6', 'C6'], ['/C7', 'C7'], ['/M2', 'M2'], ['/G1', 'G1'], ['/G2', 'G2'], 
          ['/G3', 'G3']].map((item, index) => (
            <Grid item xs={6} key={index}>
              <NavigableCard onClick={() => navigate(item[0])}>{item[1]}</NavigableCard>
            </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Accueil;
