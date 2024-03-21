import React, { useState, useEffect, useCallback } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions,  Link} from '@mui/material';
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

const rowCount = 5;
const categoryName = "pravopis";

const MathProblemComponent = () => {

  const [usedQuestionIds, setUsedQuestionIds] = useSessionStorage<number[]>('usedQuestionIds', []);
  const generateRandomId = useCallback(() => {
    let randomId;
  
    do {
      randomId = Math.floor(Math.random() * rowCount) + 1;
    } while (usedQuestionIds.includes(randomId));
    
    return randomId;
  }, [usedQuestionIds]);

  const [currentQuestionId, setCurrentQuestionId] = useState<number>(generateRandomId());
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [wrongCount, setWrongCount] = useState<number>(0);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const { loading, error, data } = useQuery(GET_MATH_PROBLEM_BY_ID, {
    variables: { collectionName: categoryName, id: currentQuestionId.toString() }
  });

  useEffect(() => {
    setCurrentQuestionId(generateRandomId());
  }, [generateRandomId]);

  const handleChoiceClick = (choice: any) => {
    setSelectedChoice(choice);
    handleCheckAnswer(choice);

    if (usedQuestionIds.length === rowCount - 1) {
      setIsDialogOpen(true);
    }
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
          <Typography sx={{ color: isCorrect ? 'green' : 'red' }}>
            {isCorrect
              ? `Správně! ${mathProblem.correct} je správná odpověď.`
              : `Špatně! Správná odpověď je: ${mathProblem.correct}`}
          </Typography>
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
        >
          Další
        </Button>
      )}

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Výsledky</DialogTitle>
        <DialogContent>
          <Typography sx={{ color: 'green' }}>Správně: {correctCount}</Typography>
          <Typography sx={{ color: 'red' }}>Špatně: {wrongCount}</Typography>
        </DialogContent>
        <DialogActions>
        <NextLink href="/procvicovani/ceskyjazyk" passHref>
            <Link color="primary" underline="hover" onClick={handleDialogClose}>
              Zpět
            </Link>
          </NextLink>
          
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MathProblemComponent;
