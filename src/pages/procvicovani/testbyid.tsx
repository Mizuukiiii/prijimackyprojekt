import React, { useState, useEffect, useCallback } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Typography, Box, Button } from '@mui/material';
import { useSessionStorage } from 'usehooks-ts';

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
const rowCount = 10;

const MathProblemComponent = () => {
  sessionStorage.clear();

  
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
  const [showNextButton, setShowNextButton] = useState(false);

  const { loading, error, data } = useQuery(GET_MATH_PROBLEM_BY_ID, {
    variables: { collectionName: "slovniulohy", id: currentQuestionId.toString() }
  });

  useEffect(() => {
    setCurrentQuestionId(generateRandomId());
  }, [generateRandomId]);

  

  const handleChoiceClick = (choice: any) => {
    if (choice === data?.mathProblemById.correct) {
      setShowNextButton(true);
    }
    setSelectedChoice(choice);
  };

  const handleNextClick = () => {
    setUsedQuestionIds([...usedQuestionIds, currentQuestionId]);
    setSelectedChoice(null);
    setShowNextButton(false);
  };

  const getButtonColor = (choice:string) => {
    if (showNextButton) {
      return choice === data?.mathProblemById.correct ? 'green' : 'red';
    } else {
      return 'white';
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
          width: '45%',
          border: '1px solid gray',
          boxShadow: 3,
          padding: '10px',
          textAlign: 'center',
          verticalAlign: 'middle',
          overflowWrap: 'break-word',
          maxWidth: '50%',
          borderRadius: '10px',
        }}
      >
        <Typography sx={{ pt: 13, mx: 10 }}>{mathProblem.zadani}</Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '30px',
        }}
      >
        {['choiceone', 'choicetwo', 'choicethree'].map((choice, index) => (
          <Button
            key={index}
            variant="contained"
            sx={{
              borderColor: 'black',
              backgroundColor: getButtonColor(mathProblem[choice]),
              height: '100px',
              width: '200px',
              borderRadius: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              mx: 3,
            }}
            onClick={() => handleChoiceClick(mathProblem[choice])}
          >
            <Typography
              sx={{
                fontSize: '16px',
                color: 'black',
                textAlign: 'center',
                padding: '10px',
              }}
            >
              {mathProblem[choice]}
            </Typography>
          </Button>
        ))}
      </Box>

      {showNextButton && (
        <Button
          variant="contained"
          sx={{
            marginTop: '20px',
            backgroundColor: 'blue',
            color: 'white',
            borderRadius: '10px',
            padding: '10px',
          }}
          onClick={handleNextClick}
        >
          Next
        </Button>
      )}
    </Box>
  );
};

export default MathProblemComponent;
