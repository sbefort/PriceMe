import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@mui/material/styles';

import { AppContextProvider } from './context/AppContext';
import priceMeTheme from './themes/priceMeTheme';

import Layout from './pages/Layout';
import AuthPage from './pages/AuthPage';
import Calculator from './pages/Calculator';
import Favorites from './pages/Favorites';
import ProtectedRoute from './components/ProtectedRoute';
import ApiErrorCatcher from './components/ApiErrorCatcher';

const App = () => {
  return (
    <ThemeProvider theme={priceMeTheme}>
      <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'right' }} maxSnack={3}>
        <AppContextProvider>
          <ApiErrorCatcher />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<AuthPage />} />
                <Route path="/register" element={<AuthPage />} />
                <Route
                  path="/calculator"
                  element={
                    <ProtectedRoute>
                      <Calculator />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/favorites"
                  element={
                    <ProtectedRoute>
                      <Favorites />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </AppContextProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
