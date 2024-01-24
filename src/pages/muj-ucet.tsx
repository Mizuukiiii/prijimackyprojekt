import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Box, Typography, Select, MenuItem } from '@mui/material';
import { Navbar } from '../components/navbar';
import { useAuthContext } from '@/components/auth-context-provider';

const GET_USER_BY_ID = gql`
  query GetUserById($uid: String!) {
    getUserById(uid: $uid) {
      uid
      email
      displayName
      numberofexercises
      numberofexercisesintest
      score
    }
  }
`;

const UPDATE_NUMBER_OF_EXERCISES = gql`
  mutation UpdateNumberOfExercises($uid: String!, $newNumberOfExercises: String!, $newNumberOfExercisesInTest: String!) {
    updateNumberOfExercises(uid: $uid, newNumberOfExercises: $newNumberOfExercises, newNumberOfExercisesInTest: $newNumberOfExercisesInTest) {
      uid
      numberofexercises
      numberofexercisesintest
    }
  }
`;

const ProfilePage: React.FC = () => {
  const { currentUser } = useAuthContext();
  const { loading, error, data, refetch } = useQuery(GET_USER_BY_ID, {
    variables: { uid: currentUser?.uid },
  });

  const [updateNumberOfExercises] = useMutation(UPDATE_NUMBER_OF_EXERCISES);

  const [selectedExercises, setSelectedExercises] = useState<string>('');
  const [selectedExercisesInTest, setSelectedExercisesInTest] = useState<string>('');

  useEffect(() => {
    const updateExercises = async () => {
      if (selectedExercises || selectedExercisesInTest) {
        try {
          await updateNumberOfExercises({
            variables: {
              uid: currentUser?.uid,
              newNumberOfExercises: selectedExercises,
              newNumberOfExercisesInTest: selectedExercisesInTest,
            },
          });
          // Refetch the user data after the mutation to update the UI
          refetch();
        } catch (mutationError: any) {
          console.error(`Mutation error: ${mutationError.message}`);
        }
      }
    };

    // Call the mutation when the component mounts or when selectedExercises or selectedExercisesInTest changes
    updateExercises();
  }, [currentUser?.uid, selectedExercises, selectedExercisesInTest, updateNumberOfExercises, refetch]);

  if (!currentUser) {
    return <p>User not logged in</p>;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.getUserById;

  return (
    <>
      <Navbar />
      <Box sx={{ mt: 15, mx: 5 }}>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          My Profile
        </Typography>

        <Box>
          <Typography variant="h6">Username: {user.displayName}</Typography>
          <Typography variant="body1">Email: {user.email}</Typography>
          <Typography variant="body1">Score: {user.score}</Typography>
          <Typography variant="body1">Aktuální počet příkladů v procvičování kategorií: {user.numberofexercises}</Typography>
          <Typography variant="body1">Aktuální počet příkladů v procvičování testů: {user.numberofexercisesintest}</Typography>

          {/* Selector for choosing the number of exercises */}
          <Box mt={2}>
            <Typography variant="body1">Zvol počet příkladů v procvičování jedné kategorie:</Typography>
            <Select
              value={selectedExercises}
              onChange={(e) => setSelectedExercises(e.target.value as string)}
            >
              {[5, 10, 15, 20].map((count) => (
                <MenuItem key={count} value={count.toString()}>
                  {count}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box mt={2}>
            <Typography variant="body1">Zvol počet příkladů v procvičování jednom testu:</Typography>
            <Select
              value={selectedExercisesInTest}
              onChange={(e) => setSelectedExercisesInTest(e.target.value as string)}
              defaultValue="40"
            >
              {[30, 40, 50, 60, 70].map((count) => (
                <MenuItem key={count} value={count.toString()}>
                  {count}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProfilePage;
