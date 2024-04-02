import React from 'react';
import { Card, CardContent, Typography, Grid, Button, Box, List, ListItem, ListItemIcon, CardActionArea } from '@mui/material';
import { FiberManualRecord } from '@mui/icons-material'; // Import the dot icon
import { useRouter } from 'next/router';
import { Navbar } from '@/components/navbar';

interface BulletPoints {
  [key: string]: string[];
}

const SideBar = () => {
  const router = useRouter();

 

  const formatPath = (text: string) => {
    const normalizedText = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return normalizedText.toLowerCase().replace(/\s+/g, '-');
  };

  const handleProcvicovatClick = (topic: string) => {
    const formattedPath = formatPath(topic);
    router.push(`/procvicovani/ceskyjazyk/${formattedPath}`);
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
                    <Button variant="contained" color="secondary" onClick={() => handleProcvicovatClick(item)}>
                      Procvičovat
                    </Button>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SideBar;
