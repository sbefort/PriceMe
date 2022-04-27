import { FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

import { useSnackbar } from 'notistack';
import useFormFields from '../hooks/useFormFields';
import { useAppContext } from '../context/AppContext';
import { UserLoginFormValues } from '../types/UserLoginFormValues';

import Logo from '../components/Logo';

const PAGE_CONFIG = {
  register: {
    successMessage: 'Registration success! Redirecting to login page.',
    redirectRoute: '/',
    header: (
      <Typography align="center">
        Have an account?&nbsp; <Link to="/">Login</Link>
      </Typography>
    ),
  },
  login: {
    successMessage: 'Login success! Redirecting to calculator.',
    redirectRoute: '/calculator',
    header: (
      <Typography align="center" sx={{ marginBottom: '3px' }}>
        Not registered?&nbsp; <Link to="/register">Create an account</Link>
      </Typography>
    ),
  },
};

const AuthPage = () => {
  const { isLoading, setIsLoading, setErrorResponse, setUser } = useAppContext();

  const location = useLocation();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const page = location.pathname === '/register' ? 'register' : 'login';

  const [fields, handleFieldChange] = useFormFields<UserLoginFormValues>({
    username: '',
    password: '',
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const result = await axios.post(`/api/v1/${page}`, fields);
      const { user } = result.data;
      if (user) setUser(user);
      enqueueSnackbar(PAGE_CONFIG[page].successMessage, {
        variant: 'success',
      });
      navigate('/calculator');
    } catch (err) {
      setErrorResponse(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack maxWidth={300} mx="auto">
      <Box sx={{ mx: 'auto', mt: '3rem' }}>
        <Logo size="lg" />
      </Box>
      <Typography align="center" variant="h1" my={2}>
        PriceMe
      </Typography>
      {PAGE_CONFIG[page].header}
      <form onSubmit={handleSubmit}>
        <TextField
          autoComplete="off"
          disabled={isLoading}
          label="Username"
          name="username"
          value={fields.username}
          onChange={handleFieldChange}
          fullWidth
        />
        <TextField
          autoComplete="off"
          disabled={isLoading}
          label="Password"
          name="password"
          type="password"
          value={fields.password}
          onChange={handleFieldChange}
          fullWidth
        />
        <Button disabled={isLoading} type="submit" variant="contained" fullWidth>
          {page.toUpperCase()}
        </Button>
      </form>
    </Stack>
  );
};

export default AuthPage;
