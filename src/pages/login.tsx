'use client';

import { Box, Button, Link, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { FormEvent } from 'react';
import { Navbar } from '@/components/navbar';
import { authUtils } from '../firebase/auth-utils';

function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const router = useRouter();
  const handleForm = async (event: FormEvent) => {
    event.preventDefault();
    await authUtils.login(email, password);
    return router.push('/');
  };
  const handleLogout = async () => {
    await authUtils.logout();
    return router.push('/');
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
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="submit" variant="contained" sx={{ mt: 5 }}>
              Přihlásit se
            </Button>
          </Box>
        </form>
        <Link href={'/registrace'} key={'registace'}>
              <Button
                variant="contained"
                sx={{ mr: 2, backgroundColor: '#1961ff' }}
              >
                Registruj se
              </Button>
        </Link>
        <Button
              variant="contained"
              sx={{ ml: 2, backgroundColor: '#1961ff' }}
              onClick={handleLogout}
            >
              Odhlásit se
            </Button>
      </Box>
    </>
  );
}
// eslint-disable-next-line import/no-default-export
export default Login;

