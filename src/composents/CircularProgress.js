import React from 'react';

const CircularProgress = ({ value, size = 100 }) => {
    const strokeWidth = 10;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (value / 100) * circumference;
  
    const circleStyle = {
      fill: 'none',
      stroke: 'blue',
      strokeWidth: strokeWidth,
      strokeDasharray: circumference,
      strokeDashoffset: offset,
      transition: 'stroke-dashoffset 0.5s ease-in-out',
      transform: `rotate(-90deg) translate(-${size}px)`, // Important pour démarrer le cercle en haut
    };
  
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          style={circleStyle}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <text
          x={size / 2}
          y={size / 2}
          dy="0.3em" // Ajustez cette valeur si le texte n'est pas centré verticalement
          textAnchor="middle" // Centre le texte horizontalement
          fill="black"
        >
          {`${value.toFixed(0)}%`}
        </text>
      </svg>
    );
  };
  

export default CircularProgress;
