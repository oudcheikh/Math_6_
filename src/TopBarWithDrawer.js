import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BookIcon from '@mui/icons-material/Book';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';


function TopBarWithDrawer({ drawerOpen, setDrawerOpen, toggleLanguage, t, navigate }) {
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const goToHomePage = () => {
    navigate('/');
    setDrawerOpen(false); // Ferme le tiroir lors de la navigation
  };

  const goToScoreboard = () => {
    navigate('/scoreboard');
    setDrawerOpen(false); // Ferme le tiroir lors de la navigation
  };

  // Gérer le changement de langue ici
  const handleChangeLanguage = (event) => {
    toggleLanguage(event.target.value);
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Major - Tailim
          </Typography>
          
          {/* Conteneur pour aligner le sélecteur de langue à droite */}
          <Box sx={{ flexGrow: 0 }}>
            <Select
              value={t('currentLang')}
              onChange={handleChangeLanguage}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{ color: 'white', '.MuiSvgIcon-root': { color: 'white' } }}
            >
              <MenuItem value="fr">FR</MenuItem>
              <MenuItem value="ar">عربى</MenuItem>
              {/* Ajouter d'autres langues au besoin */}
            </Select>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          <ListItem button onClick={goToHomePage}>
            <ListItemIcon><BookIcon /></ListItemIcon>
            <ListItemText primary={t('myCourses')} />
          </ListItem>
          <ListItem button onClick={goToScoreboard}>
            <ListItemIcon><AccountCircleIcon /></ListItemIcon>
            <ListItemText primary={t('myScore')} />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default TopBarWithDrawer;
