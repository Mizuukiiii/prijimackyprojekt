import { Box, Button, TextField, Typography } from '@mui/material';
import { Navbar } from '../components/navbar';
import { useRouter } from 'next/router';
import React, { FormEvent } from 'react';

import { authUtils } from '../firebase/auth-utils';

function Page() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordAgain, setPasswordAgain] = React.useState('');
  const [name, setName] = React.useState('');
  const [isMatched, setIsMatched] = React.useState(true);
  const [passwordError, setPasswordError] = React.useState('');
  const router = useRouter();

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();
    if (password !== passwordAgain) {
      setIsMatched(false);
      return;
    }

    await authUtils.register(email, password, name);
    await router.push('/');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
    setIsMatched(value === passwordAgain);
    if (value.length < 6) {
      setPasswordError('Neobsahuje 6 znaků');
    } else if (/[A-Z]/.test(value)) {
      setPasswordError('');
    } else {
      setPasswordError('Jedno písmeno musí být velké');
    }
  };

  const handlePasswordAgainChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPasswordAgain(e.target.value);
    setIsMatched(e.target.value === password);
  };

  return (
    <>
      <Navbar />
      <Box sx={{ mt: 15, mx: 69 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography fontWeight="bold" variant="h4">
            Registrace
          </Typography>
        </Box>
        <form onSubmit={handleForm}>
          <Box sx={{ height: 20 }}> </Box>
          <TextField
            required
            fullWidth
            id="jmeno"
            label="Jméno"
            placeholder="Franta"
            onChange={(e) => setName(e.target.value)}
          />
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
            error={Boolean(passwordError)}
            helperText={passwordError}
            onChange={handlePasswordChange}
          />
          <Box sx={{ height: 20 }}></Box>
          <TextField
            required
            fullWidth
            id="password-again"
            type="password"
            label="Heslo znovu"
            placeholder="Heslo znovu"
            error={!isMatched}
            helperText={!isMatched && 'Hesla se neshodují'}
            onChange={handlePasswordAgainChange}
          />

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="submit" variant="contained" sx={{ mt: 5 }}>
              Zaregistrovat se
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}

// eslint-disable-next-line import/no-default-export
export default Page;

