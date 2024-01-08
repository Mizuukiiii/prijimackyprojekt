import React from 'react';
import Link from 'next/link';
import { Card, CardContent, Typography, CardMedia, CardActionArea } from '@mui/material';
import { Navbar } from '@/components/navbar';

const SideBar = () => {
  return (
    <div>
      <Navbar />

      <div style={{ display: 'flex', paddingTop: '200px', justifyContent: 'space-between', gap: '20px', overflowX: 'auto' }}>
        <Link href="procvicovani/ceskyjazyk">
            <Card sx={{ maxWidth: 545, position: 'relative', zIndex: 0, borderRadius: 7, ml: 15 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="340"
                  image="cestina.png"
                  alt="cestina"
                  sx={{ filter: 'brightness(50%)' }}
                />
                <CardContent sx={{ backgroundColor: 'rgba(0, 0, 0, 0.0)', position: 'absolute', bottom: 10, left: 20, width: '100%' }}>
                  <Typography gutterBottom variant="h3" component="div" sx={{ color: 'white', fontWeight: 'bold' }}>
                    Český Jazyk
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
        </Link>

        <Link href="procvicovani/matematika">
            <Card sx={{ maxWidth: 545, position: 'relative', zIndex: 0, borderRadius: 7, mr: 15 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="340"
                  image="matika.jpg"
                  alt="matika"
                  sx={{ filter: 'brightness(50%)' }}
                />
                <CardContent sx={{ backgroundColor: 'rgba(0, 0, 0, 0.0)', position: 'absolute', bottom: 10, left: 20, width: '100%' }}>
                  <Typography gutterBottom variant="h3" component="div" sx={{ color: 'white', fontWeight: 'bold' }}>
                    Matematika
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
