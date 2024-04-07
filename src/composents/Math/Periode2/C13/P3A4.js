import React, { useState } from "react";

//  import cake from "./imagesC13/cake.png";
//  import cake1 from "./imagesC13/cake1.png";
// import fractionss from "./imagesC13/Fractions.png";
// import fteacher from "../Images/fteacherr.png";
//  import fraction from "./imagesC13/fraction.png";
import Test4 from "./QCMC13";

import P3A4_1 from "./P3A4-1";
import Audio from "./Audio13";




import {
  Container,
  SectionContainer,
  ImageContainer,
  Card,
  BodyText,
  Title,
  Subtitle,
  FormulaBox,
  FormulaText,
  ContinueButton
} from '../../../Styles/MajorStyles';  


// App Component
const P2A1A = () => {
  const [section, setSection] = useState(0);
  const [showSections, setShowSections] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ]);
  const toggleSection = (index) => {
    const updatedShowSections = [...showSections];
    updatedShowSections[index] = !updatedShowSections[index];
    setShowSections(updatedShowSections);
  };

  const [showP2A21, setShowP2A21] = useState(false);

  return (
    <Container>
      <Title>➗Les Fractions➗</Title>

      {showSections[0] && (
        <SectionContainer>
          <ImageContainer>
            <img src={"images/Images/fteacher.png"} alt="Teacher" style={{ marginTop: "25px" }} />
          </ImageContainer>
          <Card>
            <BodyText>
              Salut à tous ! Aujourd'hui, nous allons explorer un concept
              fascinant en mathématiques : les fractions
            </BodyText>
          </Card>
        </SectionContainer>
      )}
      {section >= 1 && showSections[1] && (
      <Subtitle>💡Definition💡</Subtitle>)}
      {section >= 1 && showSections[1] && (
        <SectionContainer>
          <ImageContainer>
            <img
              src={"/images/Math/C/imagesC13/fraction.png"}
              alt="Teacher"
              style={{ marginLeft: "0px", marginTop: "25px", width: "140px" }}
            />
          </ImageContainer>
          <div>
            <Card>
              <BodyText>
                Une fraction représente une part d'un tout. Elle se compose de
                deux nombres : le numérateur (en haut) indique les parties que
                tu as, et le dénominateur (en bas) indique les parts totales.
              </BodyText>
            </Card>
          </div>
        </SectionContainer>
      )}
      {section >= 2 && showSections[2] && (
      <Subtitle> 🍕Exemple de Fraction🍕</Subtitle>)}
      {section >= 2 && showSections[2] && (
        <SectionContainer>
          <ImageContainer>
            <br></br>
            <img src={"/images/Math/C/imagesC13/cake1.png"} alt="Teacher" />

            <Card
              style={{ marginLeft: "0px", marginTop: "25px", width: "140px" }}
            >
              <BodyText>
                Partage le rest d un gateau sur 2 personnes, de condition l un
                veut prendre le double de l autre.
              </BodyText>
            </Card>
          </ImageContainer>

          <ImageContainer>
            <img
              src={"/images/Math/C/imagesC13/cake.png"}
              alt="Teacher"
              style={{ marginLeft: "40px", marginTop: "25px", width: "140px" }}
            />
            <br></br>
            <div>
              <Card
                style={{
                  marginLeft: "20px",
                  marginTop: "30px",
                  width: "140px",
                }}
              >
                <BodyText>
                  Partage le rest d un gateau sur 3 personnes de facon le
                  partage soit equilibre. chaque personne prends le tier.
                </BodyText>
              </Card>
            </div>
          </ImageContainer>
        </SectionContainer>
      )}
    
      
      {section >= 3 && showSections[3] && (
      <Subtitle> 🍕Different fractions d une cricle</Subtitle>)}

      {section >= 3 && showSections[3] && (
        <SectionContainer>
          <ImageContainer>
            <br></br>
            <ImageContainer>
              <img src={"/images/Math/C/imagesC13/fractions.png"} style={{ width: "300px" }} />
            </ImageContainer>

            <br></br>
          </ImageContainer>
        </SectionContainer>
      )}
      
      {section >= 4 && showSections[4] && (
      <Subtitle>🔍 Concepts Clés 🔍</Subtitle>)}
      {section >= 4 && showSections[4] && (
        <SectionContainer>
          <FormulaBox>
            <FormulaText>
              {" "}
              <strong>Numérateur</strong>: Le nombre du haut dans une fraction,
              indiquant combien de parties tu as.
            </FormulaText>
            <FormulaText>
              {" "}
              <strong>Dénominateur</strong>: Le nombre du bas dans une fraction,
              indiquant en combien de parts le tout a été divisé.
            </FormulaText>
            <div style={{ display: "flex", alignItems: "center" }}>
  <Audio/>
</div>
          </FormulaBox>
        </SectionContainer>
      )}

{section >= 5 && showSections[5] && (
      <Subtitle>Activites</Subtitle>)}
       {section >= 5 && showSections[5] && (
        <div>
          <P3A4_1 />
        </div>
      )}
      {section >= 6 && showSections[6] && (
      <Subtitle>QCM</Subtitle>)}
{section >= 6 && showSections[6] && (
        <div>
          <Test4 />
        </div>
      )}
      {section < 6 && (
               <ContinueButton onClick={() => setSection(section + 1)}>Continuer</ContinueButton>            

      )}

    </Container>
  );
};

export default P2A1A;
