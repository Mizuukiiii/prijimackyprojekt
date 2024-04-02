// src/pages/index.js
import React from 'react';
import { Navbar } from '../components/navbar';
import { Box, Button, Container, Grid, Link, Typography } from '@mui/material';

const Home = () => {
  return (
    <>
      <Navbar />
      <Container
        sx={{
          mt: 15,
          background: 'white',
          p: 0,
          display: 'flex',
          flexDirection: 'column',
          height: 'auto',
        }}
      >
        {/* Layer 1 */}
        <Grid container spacing={2} sx={{ mt: 5 }}>
          <Grid item xs={12} md={6}>
            <Container disableGutters sx={{ pt: 5, background: 'white' }}>
              <Typography
                variant="h3"
                align="left"
                sx={{
                  width: '40rem',
                  wordWrap: 'break-word',
                  fontWeight: 'bold',
                }}
              >
                Přijímačkové učivo nikdy nebylo snadnější.
              </Typography>
            </Container>
            <Container disableGutters sx={{ pt: 5, background: 'white' }}>
              <Typography
                variant="h5"
                align="left"
                sx={{ width: '40rem', wordWrap: 'break-word' }}
              >
                Zlepši své znalosti, abys při zkoušce neudělal žádnou chybu.
              </Typography>
            </Container>
            <Link href="/procvicovani">
              <Button
                component="a" // Use component="a" for Link components in MUI
                sx={{
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  border: 0,
                  borderRadius: 4,
                  mt: 5,
                  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                  color: 'white',
                  height: 48,
                  padding: '0 30px',
                  textDecoration: 'none', // Ensure button behaves like a link
                  cursor: 'pointer', // Show pointer on hover
                }}
              >
                Začít procvičovat!
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="homepage.jpg"
              alt="Czech language"
              sx={{ width: '100%', height: 'auto', borderRadius: '50%', pl: 10 }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 25 }}>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="homepage.jpg"
              alt="Czech language"
              sx={{ width: '100%', height: 'auto', borderRadius: 4, pr: 10, mt: 5 }}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{mt:5}}>
            <Typography
              variant="h4" 
              align="left"
              sx={{ wordWrap: 'break-word', fontWeight: 'bold' }}
            >
              Rozhodnutí je na Vás
            </Typography>
            <Typography
              variant="body1"
              align="left"
              sx={{ wordWrap: 'break-word', mt: 2 }}
            >
              Naučí vás na přijímačky stejně dobře jako škola a to zdarma a rychle.
            </Typography>
            <Link href="/procvicovani">
              <Button
                component="a" // Use component="a" for Link components in MUI
                sx={{
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  border: 0,
                  borderRadius: 4,
                  mt: 2,
                  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                  color: 'white',
                  height: 48,
                  padding: '0 30px',
                  textDecoration: 'none', // Ensure button behaves like a link
                  cursor: 'pointer', // Show pointer on hover
                }}
              >
                Chci vědět víc!
              </Button>
            </Link>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 25 }}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                backgroundColor: '#e6f7ff',
                borderRadius: 4,
                p: 3,
                textAlign: 'center',
              }}
            >
              <Box
                component="img"
                src="persontwo.png"
                alt="Person 1"
                sx={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  mb: 2,
                  mx: 'auto',
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Franta Svítil
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Pomohlo mi to!
              </Typography>
              <Typography variant="body2" sx={{ color: '#FFD700' }}>
                ★★★★★
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box
              sx={{
                backgroundColor: '#e6f7ff',
                borderRadius: 4,
                p: 3,
                textAlign: 'center',
              }}
            >
              <Box
                component="img"
                src="personone.png"
                alt="Person 2"
                sx={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  mb: 2,
                  mx: 'auto',
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Jana Nováková
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Tahle stránka je snadná na použití.
              </Typography>
              <Typography variant="body2" sx={{ color: '#FFD700' }}>
                ★★★★★
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box
              sx={{
                backgroundColor: '#e6f7ff',
                borderRadius: 4,
                p: 3,
                textAlign: 'center',
              }}
            >
              <Box
                component="img"
                src="personthree.png"
                alt="Person 3"
                sx={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  mb: 2,
                  mx: 'auto',
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Rostislav Baterka
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Velice doporučuji
              </Typography>
              <Typography variant="body2" sx={{ color: '#FFD700' }}>
                ★★★★★
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
