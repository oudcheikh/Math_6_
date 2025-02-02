// MajorStyles.js
import styled from 'styled-components';

export const Container = styled.div`
    padding: 5px;
    max-width: 100%;
    margin: 0 auto;
`;

export const SectionContainer = styled.div`
    position: relative;
    display: flex;
    align-items: flex-start;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e1e1e1;
`;

export const ImageContainer = styled.div`
    flex: 0 0 auto;
    width: 150px;
    margin-right: 20px;

    img {
        width: 100%;
        height: auto;
    }
`;

export const Card = styled.div`
  background-color: white;
  width : 90%;
  padding: 5px;
  border-radius: 50px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #E1F5FE;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.15);
    transform: translateY(-5px);
  }
`;

export const BodyText = styled.p`
padding: 10px 20px;
align-items: center;
font-size: 1em;  // Increased font size for emphasis
font-family: 'Comic Sans MS', sans-serif;
`;

export const Title = styled.h1`
    font-family: "Roboto", sans-serif;
    font-size: 28px;
    font-weight: bold;
    color: #222;

    @media (max-width: 480px) {
        font-size: 24px;
    }
`;

export const SkipIcon = styled.span`
    position: absolute;
    right: 10px;
    top: 240px; 
    cursor: pointer;
    font-size: 24px;
    color: #888;
    &:hover {
        color: #666;
    }
`;

export const Subtitle = styled.h2`
    font-family: "Roboto", sans-serif;
    font-size: 20px;
    color: #444;

    @media (max-width: 480px) {
        font-size: 18px;
    }
`;

export const FormulaBox = styled.div`
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-top: 20px;
    background-color: white;
`;

export const FormulaText = styled.p`
padding: 10px 20px;
align-items: center;
font-size: 1em;  // Increased font size for emphasis
font-family: 'Comic Sans MS', sans-serif;
`;

export const ContinueButton = styled.button`
display: block;
margin: 15px 0;
padding: 10px 20px;
border: none;
border-radius: 5px;
background-color: #007BFF;
color: white;
cursor: pointer;
font-family: 'Roboto', sans-serif;
font-size: 16px;

&:hover {
    background-color: #0056b3;
}
`;

export const Separator = styled.div`  
    height: 1px;
    background-color: #ddd; /* couleur de votre choix pour la barre de séparation */
    margin: 20px 0; /* marges pour espacer la barre des sections */
`;

export const StyledText = styled.p`
  padding: 0px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1em;
  font-family: "Comic Sans MS", sans-serif;
  &:hover {
    transform: scale(1.05);
  }`;

  export const Canvas = styled.div`
  height: 50vh;
  width : 40vh;
  background-color: ${(props) => (props.isActive ? '#FFC107' : '#E1F5FE')}; // Jaune pour actif, bleu clair sinon
  border: 1px solid #B0BEC5; // Ajout d'une bordure gris bleuâtre
  position: relative;
  cursor: pointer; // Changement de curseur pour indiquer une zone interactive

  &:hover {
    box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.5); // Lumière brillante lors du survol
  }

  @media (max-width: 768px) {
    height: 60vh;
  }
`;

export const TriangleContainer = styled.div`
  display: block;
  align-items: center;
  justify-content: center;
  width: 120%;  // Increasing the width
  height: 150%; // Setting a new height value
  margin-top: 100px;
  margin-left: 0px;
`;




export const StyledText1 = styled.p`
    padding: 0px 20px;
    display: flex;
    justify-content: center;
    font-size: 1em;
    font-family: 'Comic Sans MS', sans-serif;
    &:hover {
        transform: scale(1.05);
    }
`;
export const VerifieButton = styled.button`
  border-radius: 5px;
  background-color: #45a05c;
  margin: 15px 0;
  color: white;
  border: none;
  font-family: "Roboto", sans-serif;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;
export const ResetButton = styled.button`
  border-radius: 5px;
  background-color: #007bff;
  margin: 15px 0;
  color: white;
  border: none;
  font-family: "Roboto", sans-serif;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const BandeBox = styled.div`
  width: 300px;
  height: 300px;
  border: 2px solid #4caf50;
  display: flex;
  overflow: hidden;
  box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  background-color: white;
`;