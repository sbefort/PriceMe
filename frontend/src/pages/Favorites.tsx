import { Box, Stack, Typography } from '@mui/material';

import { useAppContext } from '../context/AppContext';
import FavoriteItem from '../components/FavoriteItem';

const Favorites = () => {
  const { favorites } = useAppContext();

  return (
    <Stack alignItems="center" mt={4}>
      <Box sx={{ width: 300 }}>
        <Typography component="h1" variant="h2" mb="1rem" textAlign="center">
          Favorites
        </Typography>
        {favorites.length === 0 && (
          <Typography textAlign="center" mt="2rem">
            You have not saved any favorites yet!
          </Typography>
        )}
        {favorites.map((item, i) => (
          <FavoriteItem key={i} item={item} />
        ))}
      </Box>
    </Stack>
  );
};

export default Favorites;
