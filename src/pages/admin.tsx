import { Box, Button, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Navbar } from '@/components/navbar';
import { useAuthContext } from '../components/auth-context-provider';
import { useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';

const ADD_EXERCISE = gql`
  mutation AddExercise($collectionName: String!, $documentName: String!, $choiceone: String!, $choicetwo: String!, $choicethree: String!, $zadani: String!, $correct: String!) {
    addExercise(collectionName: $collectionName, documentName: $documentName, choiceone: $choiceone, choicetwo: $choicetwo, choicethree: $choicethree, zadani: $zadani, correct: $correct) {
      id
      collectionName
    }
  }
`;

const AdminPage = () => {
  const router = useRouter();
  const { currentUser } = useAuthContext();
  const [exerciseData, setExerciseData] = useState({
    collectionName: '',
    documentName: '', 
    choiceone: '',
    choicetwo: '',
    choicethree: '',
    correct: '',
    zadani: '',
  });

  const [addExercise, { loading, error }] = useMutation(ADD_EXERCISE);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExerciseData({
      ...exerciseData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Check if any field is empty
    const isAnyFieldEmpty = Object.values(exerciseData).some(value => value === '');
    if (isAnyFieldEmpty) {
      return; // Prevent submission if any field is empty
    }

    try {
      await addExercise({
        variables: {
          collectionName: exerciseData.collectionName,
          documentName: exerciseData.documentName,
          choiceone: exerciseData.choiceone,
          choicetwo: exerciseData.choicetwo,
          choicethree: exerciseData.choicethree,
          zadani: exerciseData.zadani,
          correct: exerciseData.correct,
        },
      });

      // Reset form state
      setExerciseData({
        collectionName: '',
        documentName: '', 
        choiceone: '',
        choicetwo: '',
        choicethree: '',
        correct: '',
        zadani: '',
      });

      // Open success dialog
      setSuccessDialogOpen(true);
      
    } catch (error) {
      console.error('Problém:', error);
    }
  };

  const handleDialogClose = () => {
    setSuccessDialogOpen(false);
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
          <form onSubmit={handleSubmit}>
            <TextField
              name="collectionName"
              label="Název kategorie"
              value={exerciseData.collectionName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              name="documentName"
              label="Číslo příkladu"
              value={exerciseData.documentName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              name="choiceone"
              label="První možnost"
              value={exerciseData.choiceone}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              name="choicetwo"
              label="Druhá možnost"
              value={exerciseData.choicetwo}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              name="choicethree"
              label="Třetí možnost"
              value={exerciseData.choicethree}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              name="correct"
              label="Správná odpověď"
              value={exerciseData.correct}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              name="zadani"
              label="Zadání"
              value={exerciseData.zadani}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              Přidat cvičení
            </Button>
          </form>
          {error && <Typography color="error">{error.message}</Typography>}
        </Box>
      </Box>
      <Dialog open={successDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Úspěch</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Úspěšně přidáno do databáze.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Zavřít
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminPage;
