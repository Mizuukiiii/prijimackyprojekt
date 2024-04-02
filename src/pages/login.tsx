import { Box, Button, Link, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router'; // Changed from 'next/navigation'
import React, { FormEvent, useState } from 'react';
import { Navbar } from '@/components/navbar';
import { authUtils } from '../firebase/auth-utils';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await authUtils.login(email, password);

      
      if (email === process.env.ADMIN_EMAIL) {
        router.push('/admin');
      } else {
        router.push('/');
      }
    } catch (error) {
      setErrorMessage('Špatně zadaný e-mail nebo heslo.');
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ mt: 30, mx: 69 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography fontWeight="bold" variant="h4">
            Přihlásit se
          </Typography>
        </Box>
        <form onSubmit={handleForm}>
          {errorMessage && (
            <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
              {errorMessage}
            </Typography>
          )}
          <Box sx={{ height: 20 }}></Box>
          <TextField
            required
            fullWidth
            id="Email"
            type="email"
            label="Email"
            placeholder="priklad@mail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Box sx={{ height: 20 }}></Box>
          <TextField
            required
            fullWidth
            id="password"
            type="password"
            label="Heslo"
            placeholder="Heslo"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Box></Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button type="submit" variant="contained" sx={{ mt: 5 }}>
              Přihlásit se
            </Button>
          </Box>
        </form>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Typography>
            Nejste zaregistrováni?{' '}
            <Link href="/registrace" underline="hover">
              Klikněte sem
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default Login;
