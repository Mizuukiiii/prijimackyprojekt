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
    'Čísla': ['Základní operace', 'Zlomky', 'Převod'],
    'Jednotky': ['Délky', 'Obsahu', 'Objemu'],
    'Tabulky': ['Procenta', 'Poměr', 'Promile'],
    'Rovnice': ['Výrazy', 'Lineární rovnice', 'Mnohočleny'],
    'Slovní úlohy': ['O pohybu', 'O směsích', 'O společné práci'],
    'Geometrické výpočty': ['Pythagorova věta', 'Rovnoběžníky', 'Základní tělesa'],
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
                  {item !== 'test' ? (
                    <Box textAlign="center">
                      <Button variant="contained" color="secondary" onClick={() => handleProcvicovatClick(item)}>
                        Procvičovat
                      </Button>
                    </Box>
                  ) : (
                    <Box textAlign="center">
                      <Button variant="contained" color="primary" onClick={() => handleProcvicovatClick(item)}>
                        Spustit
                      </Button>
                    </Box>
                  )}
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
