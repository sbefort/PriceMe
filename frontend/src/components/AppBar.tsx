import { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Menu, Avatar, Tooltip, MenuItem, Stack, Typography } from '@mui/material';

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';

import Logo from './Logo';

import { useAppContext } from '../context/AppContext';

const ResponsiveAppBar = () => {
  const { setIsLoading, setErrorResponse, user, setUser } = useAppContext();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuItemClick = (page: string) => {
    handleCloseUserMenu();
    navigate(page);
  };

  const handleLogoutClick = async () => {
    try {
      setIsLoading(true);
      await axios.get(`/api/v1/logout`);
      setUser(undefined);
      enqueueSnackbar('See you next time!', {
        variant: 'success',
      });
      navigate('/');
    } catch (err) {
      setErrorResponse(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack flexDirection="row" justifyContent="space-between">
      <Stack alignItems="center">
        <Logo />
        <Typography>
          <strong>Price Me</strong>
        </Typography>
      </Stack>
      <Box>
        <Tooltip title="Open user menu">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar
              alt={user?.username}
              src={`https://ui-avatars.com/api/?size=128&background=random&name=${user?.username}`}
              sx={{ height: '50px', width: '50px' }}
            />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={() => handleMenuItemClick('/calculator')}>
            <MonetizationOnIcon fontSize="small" sx={{ mr: 1 }} />
            <Typography>Calculator</Typography>
          </MenuItem>

          <MenuItem onClick={() => handleMenuItemClick('/favorites')}>
            <FavoriteIcon fontSize="small" sx={{ mr: 1 }} />
            <Typography>Favorites</Typography>
          </MenuItem>

          <MenuItem onClick={handleLogoutClick}>
            <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
            <Typography>Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Stack>
  );
};
export default ResponsiveAppBar;
