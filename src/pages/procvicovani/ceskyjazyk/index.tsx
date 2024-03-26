import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, Button, Box, List, ListItem, ListItemIcon, CardActionArea, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { FiberManualRecord } from '@mui/icons-material'; // Import the dot icon
import { useRouter } from 'next/router';
import { Navbar } from '@/components/navbar';

interface BulletPoints {
  [key: string]: string[];
}

const SideBar = () => {
  const router = useRouter();
  const [numExercises, setNumExercises] = useState(5); // Default number of exercises
  const [timer, setTimer] = useState(0); // Default timer value
  const [openNumExercisesDialog, setOpenNumExercisesDialog] = useState(false);
  const [openTimerDialog, setOpenTimerDialog] = useState(false);

  const formatPath = (text: string) => {
    const normalizedText = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return normalizedText.toLowerCase().replace(/\s+/g, '-');
  };

  const handleProcvicovatClick = () => {
    setOpenNumExercisesDialog(true);
  };

  const handleNumExercisesDialogClose = () => {
    setOpenNumExercisesDialog(false);
  };

  const handleTimerDialogClose = () => {
    setOpenTimerDialog(false);
  };

  const handleStartExercise = () => {
    const formattedPath = formatPath('test');
    const queryParams = `?exercises=${numExercises}&timer=${timer}`;
    router.push(`/procvicovani/ceskyjazyk/${formattedPath}${queryParams}`);
  };

  const bulletPoints: BulletPoints = {
    'Pravopis': ['I-Í/Y-Ý', 'S/Z/VZ', 'Velká písmena'],
    'Tvarosloví': ['Druhy podstatných jmen', 'Slovní druhy', 'Slovesa'],
    'Skladba': ['Druhy vět', 'Větné členy', 'Přímá řeč'],
    'Významy a tvoření slov': ['Slovní zásoba', 'Vztahy mezi slovy', 'Obohacování slovní zásoby'],
    'Porozumění textu': ['Typy textů', 'Obsahové části textu', 'Verbální/Neverbální'],
    'Analýza textu': ['Funkční styly', 'Slohové postupy', 'Vybrané Útvary'],
  };

  return (
    <div>
      <Navbar />

      <Grid container spacing={2} sx={{ marginTop: 10, m: 5 }}>
        {Object.keys(bulletPoints).map((item) => (
          <Grid key={item} item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345, m: 5 }}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item}
                  </Typography>
                  <List>
                    {bulletPoints[item].map((point: string, index: number) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <FiberManualRecord fontSize="small" color="primary" />
                        </ListItemIcon>
                        {point}
                      </ListItem>
                    ))}
                  </List>
                  <Box textAlign="center">
                    <Button variant="contained" color="secondary" onClick={handleProcvicovatClick}>
                      Procvičovat
                    </Button>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Input Dialog for Number of Exercises */}
      <Dialog open={openNumExercisesDialog} onClose={handleNumExercisesDialogClose}>
        <DialogTitle>Number of Exercises</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="numExercises"
            label="Number of Exercises"
            type="number"
            value={numExercises}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (value >= 1 && value <= 10) {
                setNumExercises(value);
              }
            }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNumExercisesDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleStartExercise} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Input Dialog for Timer */}
      <Dialog open={openTimerDialog} onClose={handleTimerDialogClose}>
        <DialogTitle>Timer</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="timer"
            label="Timer (in minutes)"
            type="number"
            value={timer}
            onChange={(e) => setTimer(parseInt(e.target.value))}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTimerDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleStartExercise} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SideBar;
