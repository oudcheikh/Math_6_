import React from 'react';
import { useNavigate } from 'react-router-dom';
// import rocketIcon from '../../composents/home/Icones/rocket-lunch.png';
// import statsIcon from '../../composents/home/Icones/stats.png';
// import timeIcon from '../../composents/home/Icones/time-twenty-four.png';
// import quiz from '../../composents/home/Icones/quiz.png';
// import flask from '../../composents/home/Icones/flask-potion.png';
// import historyIcon from '../../composents/home/Icones/history-book.png'; // Renommé pour éviter un conflit de nom
// import praying from '../../composents/home/Icones/praying.png';
// import Fraçais from '../../composents/home/Icones/language-learning.png';

// import calculator from '../../composents/home/Icones/calculator-simple.png';
import '../../composents/home/Major.css';

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

function Acceuil() {
  return (
    <div className="app-container">
      <div className="full-width-container">
{/*         
        <Card title="الوقت المستغرق" content="معرفة الوقت المستغرق في كل مادة" icon={"/images/Icones/time-twenty-four.png"} />
        <Card title="النتائج" content="نتائج الاختبارات حسب المادة" icon={"/images/Icones/stats.png"} />
        <Card title="اختبار اليوم" content="اختبار عشوائي على  موادك" icon={"/images/Icones/quiz.png"} navigateTo="/QuizTestarab" /> */}


        <Card title="تدرب على نقاط ضعفك"  icon={"/images/Icones/rocket-lunch.png"} navigateTo="/PrepaArabe" />
      </div>
      <div className="full-width-container">

        <Card title="دروس العربية" content="" icon={"/images/Icones/history-book.png"} full navigateTo="/AcceiulArabic" />

        <Card title="دروس التاريخ" content="" icon={"/images/Icones/history-book.png"} full navigateTo="/Histoire" />
        <Card title="دروس التربية الاسلامية" content="" icon={"/images/Icones/praying.png"} full navigateTo="/Islamique" />

        {/* <Card title="مواضيع كونكور" content="" icon={"/images/Icones/language-learning.png"} full navigateTo="/ConcoursArabe " /> */}
        <Card title=" كونكور" content="" icon={"/images/Icones/language-learning.png"} full navigateTo="/NewConcArabe " />
      </div>
    </div>
  );
}

export default Acceuil;
