import React, { useState } from "react";
import styled from "styled-components";
import { Button, CardContent, Typography, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { Card } from "./Styles/MajorStyles";
import db from './db'; // Assurez-vous que cela pointe vers votre configuration IndexedDB correcte

const CardContainer = styled.div`
  perspective: 1000px;
  margin: 20px auto;
`;

const StyledText = styled.p`
  padding: 2px 2px;
  align-items: center;
  font-size: 1.2em;
  font-family: "Comic Sans MS", sans-serif;
  &:hover {
    transform: scale(1.05);
  }
`;

function QCM({ questionsArray }) {
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [isFlipped, setIsFlipped] = useState(null);
    const [correct, setCorrect] = useState({});
    const [answeredQuestions, setAnsweredQuestions] = useState({});

    const handleAnswerChange = (questionIndex, answer) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [questionIndex]: answer
        }));
        setAnsweredQuestions(prevQuestions => ({
            ...prevQuestions,
            [questionIndex]: true
        }));
    };

    const handleValidation = async (questionIndex) => {
        const questionItem = questionsArray[questionIndex];
        const isAnswerCorrect = selectedAnswers[questionIndex] === questionItem.correctAnswer;
        setCorrect(prev => ({ ...prev, [questionIndex]: isAnswerCorrect }));

        await db.responses.add({
            qcmId: questionIndex,
            chapter: questionItem.chapter,
            isCorrect: isAnswerCorrect,
            difficulty: questionItem.difficulty
        });

        setIsFlipped(questionIndex);
    };

    const handleFlip = async (questionIndex) => {
        if (isFlipped === questionIndex) {
            setIsFlipped(null);
        } else {
            setIsFlipped(questionIndex);
        }
    };

    return (
        <div style={{ fontFamily: "Comic Sans MS, sans-serif" }}>
            {questionsArray.map((question, index) => (
                <CardContainer key={index}>
                    <Card className={isFlipped === index ? "flipped" : ""}>
                        {isFlipped !== index ? (
                            <CardContent>
                                <Typography variant="h6">
                                    <StyledText>{question.question}</StyledText>
                                </Typography>
                                <RadioGroup
                                    value={selectedAnswers[index] || ''}
                                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                                >
                                    {question.answers.map((answer, aIndex) => (
                                        <FormControlLabel 
                                            key={aIndex} 
                                            value={answer} 
                                            control={<Radio />} 
                                            label={<StyledText>{answer}</StyledText>} 
                                        />
                                    ))}
                                </RadioGroup>
                                <Button variant="contained" color="primary" onClick={() => handleFlip(index)}>
                                    Explication
                                </Button>
                                {answeredQuestions[index] && (
                                    <Button variant="contained" color="secondary" onClick={() => handleValidation(index)}>
                                        Valider
                                    </Button>
                                )}
                            </CardContent>
                        ) : (
                            <CardContent>
                                <Typography variant="h5" color={correct[index] ? "green" : "red"}>
                                    <StyledText>{correct[index] ? "Bonne réponse!" : "Mauvaise réponse"}</StyledText>
                                </Typography>
                                <Typography variant="h6"><StyledText>Explication:</StyledText></Typography>
                                <Typography variant="body1"><StyledText>{question.explanation}</StyledText></Typography>
                                <Button variant="contained" color="primary" onClick={() => handleFlip(index)}>Retour</Button>
                            </CardContent>
                        )}
                    </Card>
                </CardContainer>
            ))}
        </div>
    );
}

export default QCM;
