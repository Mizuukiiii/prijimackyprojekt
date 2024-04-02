import React, { useState, useEffect, useCallback } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Link, LinearProgress } from '@mui/material';
import { useSessionStorage } from 'usehooks-ts';

import NextLink from 'next/link';

const GET_MATH_PROBLEM_BY_ID = gql`
  query GetMathProblemById($collectionName: String!, $id: String!) {
    mathProblemById(collectionName: $collectionName, id: $id) {
      id
      collectionName
      zadani
      choiceone
      choicetwo
      choicethree
      correct
    }
  }
`;
const maxExercises = 5;
const rowCount = 5;
const categoryName = "geometrie";

const MathProblemComponent = () => {
  const [usedQuestionIds, setUsedQuestionIds] = useSessionStorage<number[]>('usedQuestionIds', []);
  const generateRandomId = useCallback(() => {
    let randomId;
  
    do {
      randomId = Math.floor(Math.random() * maxExercises) + 1; 
    } while (usedQuestionIds.includes(randomId));
    
    return randomId;
  }, [usedQuestionIds]);

  const [currentQuestionId, setCurrentQuestionId] = useState<number>(generateRandomId());
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [wrongCount, setWrongCount] = useState<number>(0);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(true);
  const [isButtonsDisabled, setButtonsDisabled] = useState<boolean>(false);
  const [isProgressBarFull, setIsProgressBarFull] = useState<boolean>(false);

  const { loading, error, data } = useQuery(GET_MATH_PROBLEM_BY_ID, {
    variables: { collectionName: categoryName, id: currentQuestionId.toString() }
  });

  useEffect(() => {
    setCurrentQuestionId(generateRandomId());
  }, [generateRandomId]);

  useEffect(() => {
    if ((correctCount + wrongCount) === rowCount) {
      setIsProgressBarFull(true);
    } else {
      setIsProgressBarFull(false);
    }
  }, [correctCount, wrongCount]);

  const handleChoiceClick = (choice: any) => {
    setSelectedChoice(choice);
    handleCheckAnswer(choice);
    setIsNextDisabled(false); // Enable the "Next" button
    setButtonsDisabled(true); // Disable all option buttons
  };

  const handleCheckAnswer = (selectedChoice: any) => {
    const isCorrectAnswer = selectedChoice === data?.mathProblemById.correct;
    setIsCorrect(isCorrectAnswer);

    if (isCorrectAnswer) {
      setCorrectCount(correctCount + 1);
    } else {
      setWrongCount(wrongCount + 1);
    }
  };

  const handleNextClick = () => {
    setUsedQuestionIds([...usedQuestionIds, currentQuestionId]);
    setSelectedChoice(null);
    setIsCorrect(null);
    setIsNextDisabled(true); 
    setButtonsDisabled(false); 
    setCurrentQuestionId(generateRandomId());
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setCorrectCount(0);
    setWrongCount(0);
    setUsedQuestionIds([]);
  };

  const getButtonColor = (choice: string) => {
    if (isCorrect !== null) {
      return choice === data?.mathProblemById.correct ? 'green' : 'red';
    } else {
      return selectedChoice === choice ? 'light-blue' : 'white';
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const mathProblem = data.mathProblemById;

  const totalAttempts = correctCount + wrongCount;
  const progress = Math.min((totalAttempts / rowCount) * 100, 100);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          height: '45%',
          width: '700px',
          backgroundColor: '#e6f7ff',
          boxShadow: 3,
          padding: '10px',
          textAlign: 'left',
          overflowWrap: 'break-word',
          maxWidth: '50%',
          borderRadius: '10px',
        }}
      >
        <Typography sx={{ pt: 13, mx: 10, fontWeight: 'bold', color: 'black' }}>{mathProblem.zadani}</Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '20px',
          width: '100%',
        }}
      >
        {['choiceone', 'choicetwo', 'choicethree'].map((choice, index) => (
          <Button
            key={index}
            variant="contained"
            sx={{
              borderColor: 'black',
              backgroundColor: getButtonColor(mathProblem[choice]),
              height: '60px',
              width: '700px',
              borderRadius: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              my: 1,
            }}
            disabled={isButtonsDisabled} 
            onClick={() => handleChoiceClick(mathProblem[choice])}
          >
            <Typography
              sx={{
                fontSize: '16px',
                color: 'black',
                textAlign: 'left',
                padding: '10px',
                textTransform: 'none',
              }}
            >
              {mathProblem[choice]}
            </Typography>
          </Button>
        ))}
      </Box>

      {isCorrect !== null && (
        <Box sx={{ marginTop: '20px' }}>
            {isCorrect
              ? <Typography sx={{ color: 'green'}}> Správně! {mathProblem.correct} je správná odpověď.</Typography>
              : <Typography sx={{ color: 'red'}}> Špatně! {mathProblem.correct} je správná odpověď.</Typography>
            }
        </Box>
      )}

      {isCorrect !== null && (
        <Button
          variant="contained"
          sx={{
            marginTop: '20px',
            backgroundColor: 'blue',
            color: 'white',
            borderRadius: '10px',
            padding: '10px',
            width: '45%',
          }}
          onClick={handleNextClick}
          disabled={isNextDisabled} 
        >
          Další
        </Button>
      )}

      {isProgressBarFull && (
        <Dialog open={isProgressBarFull} onClose={handleDialogClose} maxWidth="md" fullWidth >
          <DialogTitle>
            <Typography variant="h6">Výsledky</Typography>
          </DialogTitle>
          <DialogContent >
            <Typography sx={{ color: 'green' }}>Správně: {correctCount}</Typography>
            <Typography sx={{ color: 'red' }}>Špatně: {wrongCount}</Typography>
          </DialogContent>
          <DialogActions>
            <NextLink href="/procvicovani/matematika" passHref>
              <Link color="primary" underline="hover" onClick={handleDialogClose}>
                Zpět
              </Link>
            </NextLink>
          </DialogActions>
        </Dialog>
      )}

      <Box sx={{ width: '700px', marginTop: '20px' }}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
    </Box>
  );
};

export default MathProblemComponent;
