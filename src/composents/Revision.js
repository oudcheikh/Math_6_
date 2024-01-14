import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import rocketIcon from '../composents/home/Icones/rocket-lunch.png';
import statsIcon from '../composents/home/Icones/stats.png';
import timeIcon from '../composents/home/Icones/time-twenty-four.png';
import quiz from '../composents/home/Icones/quiz.png';
import flask from '../composents/home/Icones/flask-potion.png';
import historyIcon from '../composents/home/Icones/history-book.png';
import praying from '../composents/home/Icones/praying.png';
import calculator from '../composents/home/Icones/calculator-simple.png';
import { app, dbf } from './../firebase'; // Importez le module Firebase
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import '../composents/home/Major.css';
// Importez la fonction de synchronisation depuis le fichier où elle est définie
import { synchronizeWithFirestore } from '../SyncFirebase';




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};






const Card = ({ title, content, icon, full, navigateTo }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (navigateTo) {
      navigate(navigateTo);
    }
  };

  return (
    <div className={`card ${full ? 'full-card' : ''}`} onClick={handleClick}>
      {icon && <img src={icon} alt={title} className="card-icon" />}
      <div className="card-content">
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    </div>
  );
};

function Revisions() {
  const [syncRequired, setSyncRequired] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSyncStatus = async () => {
      //const collectionExists = await dbf.firestore().collection('6èmefondamental').get();
      const syncRequired = true;

      setSyncRequired(syncRequired);
    };

    checkSyncStatus();
  }, []);

  const handleSyncClick = async () => {
    setOpenModal(true);

    try {
      // Appelez la fonction de synchronisation avec Firestore
      await synchronizeWithFirestore();

      setOpenModal(false);
    } catch (error) {
      console.error('Erreur de synchronisation :', error);
      // Gérez l'erreur ici (affichez un message à l'utilisateur, etc.)
      setOpenModal(false);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="app-container">
      <div className="card-grid">
        <Card title="Temps passé" content="Savoir le temps passé sur chaque matière" icon={timeIcon} />
        <Card title="Résultats" content="Résultats des quiz par matière" icon={statsIcon} />
        <Card title="Quiz du jour" content="Test aléatoire sur tes matières!" icon={quiz} navigateTo="/QuizTest" />
        <Card title="Major+" content="Travailler sur tes points faibles!" icon={rocketIcon} />
        
      </div>
      <div className="full-width-container">
      {syncRequired && (
          <Button variant="contained" color="primary" onClick={handleSyncClick}>
            Synchroniser depuis Firebase
          </Button>
        )}
        <Card title="Science" content="" icon={flask} full navigateTo="/Science" />
        <Card title="Math" content="" icon={calculator} full navigateTo="/math-chapters" />
        <Card title="التاريخ" content="" icon={historyIcon} full navigateTo="/Histoire" />
        <Card title="التربية الاسلامية" content="" icon={praying} full navigateTo="/Islamique" />
      </div>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Synchronisation en cours...
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Attendez que la synchronisation se termine.
          </Typography>
        </Box>
      </Modal>



    </div>
  );
}

export default Revisions;
