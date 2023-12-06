// ChapterCard.js
import React from 'react';


const ChapterCard = ({ chapter, title, onClick }) => {
  const cardStyle = {
    width: '100%', // prend la pleine largeur de son conteneur
    minWidth: '300px', // largeur minimale pour tous les cartes
    maxWidth: '300px', // largeur maximale pour tous les cartes
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '25px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    margin: '10px 0',
    cursor: 'pointer'
  };

  const chapterStyle = {
    fontWeight: 'bold',
    color: '#555'
  };

  const titleStyle = {
    textAlign: 'left',
    flexGrow: 1,
    marginLeft: '20px',
    color: '#333'
  };

  const arrowStyle = {
    fontSize: '24px',
    color: '#555'
  };

  return (
    <div style={cardStyle} onClick={onClick}>
      <span style={chapterStyle}>{chapter}</span>
      <span style={titleStyle}>{title}</span>
      <span style={arrowStyle}>&gt;</span>
    </div>
  );
};

export default ChapterCard;
