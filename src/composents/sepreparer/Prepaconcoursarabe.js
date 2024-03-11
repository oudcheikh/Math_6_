import React from 'react';
import { useNavigate } from 'react-router-dom';
import flask from '..//home/Icones/arabic-language.png';
import calculator from '..//home/Icones/eiffel-tower.png';
import '..//home/Major.css';
import Accueilarab from '../Accueilarab';
import Acceuilfrançais from '../Acceuilfrançais';

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

function PrepaConcoursArabe() {
  return (
    <div className="app-container">
    
      <div className="full-width-container">
        <Card title="موضع لاعربية"  content="" icon={flask} full navigateTo="/Accueilarab" />
        <Card title="موضوع التاريخ"  content="" icon={flask} full navigateTo="/Accueilarab" />
        <Card title="موضوع التربية الإسلامية" content="" icon={flask} full navigateTo="/Acceuilfrançais" />
      </div>
    </div>
  );
}

export default PrepaConcoursArabe;
