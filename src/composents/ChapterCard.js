// ChapterCard.js
import React from 'react';
const cardStyle = {
  display: 'flex',
  alignItems: 'center', // Center items vertically in the container
  justifyContent: 'space-between', // Space out items from start to end
  padding: '10px 20px', // Uniform padding around the content
  borderRadius: '25px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
  margin: '10px 0',
  cursor: 'pointer',
  textAlign: 'center',
};

const chapterStyle = {
  fontWeight: 'bold',
  color: '#555',
  flex: 1, // Allows the chapter name to take up any extra space
};

const titleStyle = {
  textAlign: 'left',
  marginRight: '10px', // Give some space before the score
  flex: 'none', // Prevent the title from growing
};

const scoreStyle = {
  color: '#333',
  marginLeft: '10px', // Space between title and score
  fontWeight: 'bold',
};

const arrowStyle = {
  fontSize: '24px',
  color: '#555',
  flex: 'none', // Prevent the arrow from growing
};


const ChapterCard = ({ chapter, title, onClick, showMedal = false }) => {
  return (
    <div style={cardStyle} onClick={onClick}>
      <span style={chapterStyle}>{chapter}</span>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={titleStyle}>{title}</span>
        {showMedal && <span style={scoreStyle}>🥇</span>} {/* Assuming the score is included in the title */}
      </div>
      <span style={arrowStyle}>&gt;</span>
    </div>
  );
};



const ChapterCardModul = ({ chapter, title, onClick }) => {
  return (
    <div style={cardStyle} onClick={onClick}>
      <span style={chapterStyle}>{chapter}</span>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={titleStyle}>{title}</span>
        <span style={scoreStyle}>🥇</span> {/* Assuming the score is included in the title */}
      </div>
      <span style={arrowStyle}>&gt;</span>
    </div>
  );
};


export default   ChapterCard  ;

