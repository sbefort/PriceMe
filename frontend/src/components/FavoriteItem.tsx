import { findWhere } from 'underscore';
import { IconButton, Stack, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import { useAppContext } from '../context/AppContext';
import { CalculateResultItem } from '../types/CalculateResultItem';

interface Props {
  item: CalculateResultItem;
}

const FavoriteItem = ({ item }: Props) => {
  const { favorites, setFavorites } = useAppContext();
  const { countryCode, totalCost, quantity, pricePerTonVariable, fixedOverhead } = item;

  const toggleFavorite = () => {
    const favorite = findWhere(favorites, item);

    // If not a favorite, add it
    if (favorite === undefined) {
      setFavorites(favorites.concat(item));
      return;
    }

    // If already a favorite, remove it
    const newFavorites = favorites.filter((fav) => {
      return fav.countryCode !== item.countryCode || fav.quantity !== item.quantity || fav.totalCost !== item.totalCost;
    });
    setFavorites(newFavorites);
  };

  return (
    <Stack flexDirection="row" alignItems="center">
      <IconButton onClick={toggleFavorite} sx={{ marginRight: '0.3rem' }}>
        {findWhere(favorites, item) ? <StarIcon /> : <StarBorderIcon />}
      </IconButton>
      <Typography my="0.5rem" variant="body2">{`${countryCode} ${totalCost.toFixed(2)} | (${pricePerTonVariable.toFixed(
        2
      )} * ${quantity}) + ${fixedOverhead}`}</Typography>
    </Stack>
  );
};

export default FavoriteItem;
