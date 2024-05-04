import React, { useState, useEffect } from 'react';
import './TopBar.css'; // Assurez-vous de créer ce fichier CSS
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BookIcon from '@mui/icons-material/Book';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function TopBarWithDrawer({  toggleLanguage, t }) {



  const [, setTotalScore] = useState(0);
  const scoreTotal = useSelector((state) => state.counter.value);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'scores') {
        const scoresString = event.newValue;
        const scoresArray = JSON.parse(scoresString);
        const newTotalScore = calculateTotalScore(scoresArray);
        setTotalScore(newTotalScore);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const calculateTotalScore = (scoresArray) => {
    let total = 0;
    if (scoresArray) {
      scoresArray.forEach(score => {
        total += score.score || 0;
      });
    }
    return total;
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const goToHomePage = () => {
    navigate('/');
    setDrawerOpen(false); 
  };

  const goToScoreboard = () => {
    navigate('/scoreboard');
    setDrawerOpen(false); 
  };

  const handleChangeLanguage = (event) => {
    console.log("_____________________________ : ", event.target.value)
    toggleLanguage(event.target.value);
  };

  return (
   
    <div className="top-bar" style={{ direction: "ltr" }}>
      <div className="menu-button" onClick={() => setDrawerOpen(true)}>
        ☰
      </div>

      <div className="score" onClick={goToScoreboard}>
        {Math.ceil(scoreTotal)} 🥇
      </div>

      <div className="language-select">
        <select onChange={handleChangeLanguage} aria-label="Select language">
          <option value="ar">عربى</option>
          <option value="fr">FR</option>
        </select>
      </div>


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


      

    </div>
  );
}

export default TopBarWithDrawer;
