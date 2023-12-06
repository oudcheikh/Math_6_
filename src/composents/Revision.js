import React from 'react';
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import MyCard from './Card';

const Revisions = () => {
    return (
      <div>
        <Typography variant="h4" gutterBottom align="center">
          Mes Cours
        </Typography>
        <Grid container spacing={3}>
      
            <Grid item xs={12} sm={6} md={4} key={1} style={{ margin: '0 16px' }}>
              <Link to="/math-chapters">
              <Card>
                <CardContent>
                  <Typography variant="h6">Mathématiques</Typography>
                </CardContent>
              </Card>
              </Link>
              </Grid>
  
              <Grid item xs={12} sm={6} md={4} key={1} style={{ margin: '0 16px' }}>
              <Link to="/Science">
              <Card>
                <CardContent>
                  <Typography variant="h6">Science Naturelle</Typography>
                </CardContent>
              </Card>
             </Link>

              </Grid>

              <Grid item xs={12} sm={6} md={4} key={1} style={{ margin: '0 16px' }}>
              {/* <Link to="/math-chapters"> */}
              <Card>
                <CardContent>
                  <Typography variant="h6">Français</Typography>
                </CardContent>
              </Card>
             {/* </Link> */}
              </Grid>
  
              <Grid item xs={12} sm={6} md={4} key={1} style={{ margin: '0 16px' }}>
              {/* <Link to="/math-chapters"> */}
              <Card>
                <CardContent>
                  <Typography variant="h6">العربية</Typography>
                </CardContent>
              </Card>
             {/* </Link> */}
              </Grid>
  
              <Grid item xs={12} sm={6} md={4} key={1} style={{ margin: '0 16px' }}>
              {/* <Link to="/math-chapters"> */}
              <Card>
                <CardContent>
                  <Typography variant="h6">االتبية الإسلامية </Typography>
                </CardContent>
              </Card>
             {/* </Link> */}
              </Grid>

              
            </Grid>
  
            
      </div>
    );
  };
  export default Revisions;