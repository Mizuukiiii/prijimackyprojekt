// pages/admin/index.tsx

import { Box, Button, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Navbar } from '@/components/navbar';
import { useAuthContext } from '../components/auth-context-provider';
import { useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';

const ADD_EXERCISE = gql`
  mutation AddExercise($collectionName: String!, $newExerciseData: ExerciseInput!) {
    addExercise(collectionName: $collectionName, exerciseInput: $newExerciseData) {
      id
      collectionName
      choiceone
      choicetwo
      choicethree
      correct
      zadani
    }
  }
`;

const AdminPage = () => {
  const router = useRouter();
  const { currentUser } = useAuthContext();
  const [exerciseData, setExerciseData] = useState({
    collectionName: '',
    newExerciseData: {
      choiceone: '',
      choicetwo: '',
      choicethree: '',
      correct: '',
      zadani: '',
    },
  });

  const [addExercise, { loading, error }] = useMutation(ADD_EXERCISE);

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setExerciseData({
      ...exerciseData,
      [name]: value,
    });
  };

  const handleExerciseChange = (e:any) => {
    const { name, value } = e.target;
    setExerciseData({
      ...exerciseData,
      newExerciseData: {
        ...exerciseData.newExerciseData,
        [name]: value,
      },
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      await addExercise({
        variables: {
          collectionName: exerciseData.collectionName,
          newExerciseData: {
            choiceone: exerciseData.newExerciseData.choiceone,
            choicetwo: exerciseData.newExerciseData.choicetwo,
            choicethree: exerciseData.newExerciseData.choicethree,
            correct: exerciseData.newExerciseData.correct,
            zadani: exerciseData.newExerciseData.zadani,
          },
        },
      });
      
    } catch (error) {
      console.error('Error adding exercise:', error);
    }
  };
  

  useEffect(() => {
    const isLoggedInAsAdmin = currentUser?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
     if (!isLoggedInAsAdmin) {
       router.push('/'); 
     }
  }, [currentUser, router]); 

  return (
    <>
      <Navbar />
      <Box sx={{ mt: 30, mx: 'auto', maxWidth: 600 }}>
        <Typography variant="h4" gutterBottom>
          Přehled admina
        </Typography>
        <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
          <Typography variant="body1">
            Welcome to the admin dashboard. Here, you can manage various administrative tasks.
          </Typography>
          <form onSubmit={handleSubmit}>
          <TextField
  name="collectionName"
  label="Collection Name"
  value={exerciseData.collectionName}
  onChange={handleChange}
  fullWidth
  margin="normal"
/>
            <TextField
              name="choiceone"
              label="Choice One"
              value={exerciseData.newExerciseData.choiceone}
              onChange={handleExerciseChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="choicetwo"
              label="Choice Two"
              value={exerciseData.newExerciseData.choicetwo}
              onChange={handleExerciseChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="choicethree"
              label="Choice Three"
              value={exerciseData.newExerciseData.choicethree}
              onChange={handleExerciseChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="correct"
              label="Correct Choice"
              value={exerciseData.newExerciseData.correct}
              onChange={handleExerciseChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="zadani"
              label="Zadani"
              value={exerciseData.newExerciseData.zadani}
              onChange={handleExerciseChange}
              fullWidth
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              Add Exercise
            </Button>
          </form>
          {error && <Typography color="error">{error.message}</Typography>}
        </Box>
      </Box>
    </>
  );
};

export default AdminPage;
