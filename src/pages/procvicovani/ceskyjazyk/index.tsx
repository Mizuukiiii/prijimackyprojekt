import React from 'react';
import { Card, CardContent, Typography, CardMedia, CardActionArea, Grid, Button, Box } from '@mui/material';
import { useRouter } from 'next/router';
import { Navbar } from '@/components/navbar';

const SideBar = () => {
  const router = useRouter();

  const formatPath = (text:string) => {
    const normalizedText = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return normalizedText.toLowerCase().replace(/\s+/g, '-');
  };

  const handleProcvicovatClick = (topic:string) => {
    const formattedPath = formatPath(topic);
    router.push(`/procvicovani/ceskyjazyk/${formattedPath}`);
  };

  return (
    <div>
      <Navbar />

      <Grid container spacing={2} sx={{ marginTop: 10 }}>
        {['pravopis', 'slovní zásoba a tvoření slov', 'skladba', 'tvarosloví', 'porozumění textu', 'slohová výchova', 'literární výchova', 'test'].map((item) => (
          <Grid key={item} item xs={12} sm={6} md={3}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={`image${item}.jpg`} 
                  alt={`Image ${item}`}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item}
                  </Typography>
                  {item !== 'test' ? (
                    <Box display="flex" justifyContent="space-between">
                      <Button variant="contained" color="primary" style={{ marginRight: 4 }}>
                        Výklad
                      </Button>
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
