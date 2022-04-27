import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';

import { useAppContext } from '../context/AppContext';

const ApiErrorCatcher: React.FC = () => {
  const { errorResponse } = useAppContext();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!errorResponse) return;

    if (errorResponse.response?.data) {
      const message = errorResponse.response.data.detail || JSON.stringify(errorResponse.response.data);
      enqueueSnackbar(message, {
        variant: 'error',
      });
    } else {
      enqueueSnackbar(JSON.stringify(errorResponse), {
        variant: 'error',
      });
    }
  }, [errorResponse, enqueueSnackbar]);

  return <></>;
};

export default ApiErrorCatcher;
