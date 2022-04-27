import { useEffect, useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';

import { useAppContext } from '../context/AppContext';
import FavoriteItem from '../components/FavoriteItem';
import useFormFields from '../hooks/useFormFields';
import { CalculateResultItem } from '../types/CalculateResultItem';
import { CommodityItem } from '../types/CommodityItem';
import { CalculateFormValues } from '../types/CalculateFormValues';

const Calculator = () => {
  const { isLoading, setIsLoading, setErrorResponse } = useAppContext();
  const [data, setData] = useState<CommodityItem[]>([]);
  const [commodityNames, setCommodityNames] = useState<string[]>([]);
  const [calcResults, setCalcResults] = useState<CalculateResultItem[]>([]);

  const [fields, handleFieldChange] = useFormFields<CalculateFormValues>({
    commodity: '',
    quantity: '',
    pricePerTon: '',
  });

  useEffect(() => {
    const fetchCommodityList = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('https://run.mocky.io/v3/520843fe-8315-4e1e-94aa-76c2a8a85d32', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setData(response.data);
      } catch (err) {
        setErrorResponse(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCommodityList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!data) return;
    const unique = Array.from(new Set(data.map((item) => item.COMMODITY_NAME)));
    setCommodityNames(unique);
  }, [data]);

  const calculateCost = () => {
    const { commodity, quantity, pricePerTon } = fields;
    const filteredByCommodity = data.filter((item) => item.COMMODITY_NAME === commodity);
    const costByCountry = filteredByCommodity
      .map((item) => {
        const { COUNTRY: countryCode, VAR_OVERHEAD: varOverhead, FIXED_OVERHEAD: fixedOverhead } = item;
        return {
          countryCode,
          totalCost:
            (parseFloat(pricePerTon) + parseFloat(varOverhead)) * parseFloat(quantity) + parseFloat(fixedOverhead),
          quantity: parseFloat(quantity),
          pricePerTonVariable: parseFloat(pricePerTon) + parseFloat(varOverhead),
          fixedOverhead: parseFloat(fixedOverhead),
        };
      })
      .sort((a, b) => b.totalCost - a.totalCost);
    setCalcResults(costByCountry);
  };

  return (
    <Stack alignItems="center" mt={4}>
      <Box sx={{ width: 300 }}>
        <Typography component="h1" variant="h2" mb="1rem" textAlign="center">
          Calculator
        </Typography>
        <FormControl fullWidth>
          <InputLabel htmlFor="commodity">Commodity</InputLabel>
          <Select name="commodity" value={fields.commodity} label="Commodity" onChange={handleFieldChange}>
            {commodityNames.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          name="quantity"
          fullWidth
          label="Quantity (in tons)"
          type="number"
          inputProps={{ min: 0 }}
          value={fields.quantity}
          onChange={handleFieldChange}
        />
        <TextField
          name="pricePerTon"
          fullWidth
          label="Price per ton"
          type="number"
          inputProps={{ min: 0, step: 0.01 }}
          value={fields.pricePerTon}
          onChange={handleFieldChange}
        />
        <Button
          disabled={isLoading || !fields.commodity || !fields.pricePerTon || !fields.quantity}
          variant="contained"
          onClick={calculateCost}
          fullWidth
        >
          Calculate
        </Button>
        {calcResults.length > 0 && (
          <Typography variant="h6" mt="2rem">
            Results
          </Typography>
        )}
        {calcResults.map((item, i) => (
          <FavoriteItem key={i} item={item} />
        ))}
      </Box>
    </Stack>
  );
};

export default Calculator;
