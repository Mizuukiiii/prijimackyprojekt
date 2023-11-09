import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Box, Typography, Grid, Button } from '@mui/material';

const FIRESTORE_QUERY = gql`
  query {
    mathproblemtest {
      difficulty
      choiceone
      choicetwo
      choicethree
      correctAnswer
      questions
    }
  }
`;

function ExampleComponent() {
  const { loading, error, data } = useQuery(FIRESTORE_QUERY);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleChoiceClick = (selectedChoice: any) => {
    if (selectedChoice === data?.mathproblemtest[currentQuestionIndex]?.correctAnswer) {
      setIsCorrect(true);
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsCorrect(false);
        setSelectedAnswer(null);
      }, 1000); 
    } else {
      setIsCorrect(false);
      setSelectedAnswer(selectedChoice);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const currentQuestion = data?.mathproblemtest[currentQuestionIndex];

  return (
    <Box border={1} padding={2} margin={2} display="flex" justifyContent="center">
      <Typography variant="h5" gutterBottom>
        {currentQuestion?.questions}
      </Typography>
      <Grid container spacing={2}>
        {['choiceone', 'choicetwo', 'choicethree'].map((choice, index) => (
          <Grid item xs={4} key={index}>
            <Box
              border={1}
              padding={2}
              onClick={() => handleChoiceClick(currentQuestion[choice])}
              style={{
                cursor: 'pointer',
                backgroundColor:
                  selectedAnswer === currentQuestion[choice]
                    ? isCorrect
                      ? 'green'
                      : 'red'
                    : '',
              }}
            >
              <Typography variant="body1">{currentQuestion[choice]}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      {isCorrect && currentQuestionIndex < data.mathproblemtest.length - 1 && (
        <Button variant="contained" onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>
          Next
        </Button>
      )}
    </Box>
  );
}

export default ExampleComponent;
