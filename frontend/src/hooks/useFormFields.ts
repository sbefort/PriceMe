import { useState } from 'react';
import { SelectChangeEvent } from '@mui/material';

const useFormFields = <T>(
  initialState: T
): [T, (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | SelectChangeEvent) => void] => {
  const [inputs, setValues] = useState<T>(initialState);

  return [
    inputs,
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | SelectChangeEvent) => {
      setValues({
        ...inputs,
        [event.target.name]: event.target.value,
      });
    },
  ];
};

export default useFormFields;
