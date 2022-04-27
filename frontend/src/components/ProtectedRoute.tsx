import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';
import AppBar from './AppBar';

interface Props {
  children: React.ReactElement;
}

const ProtectedRoute = ({ children }: Props) => {
  const { user, setIsLoading, setErrorResponse, setUser } = useAppContext();
  const navigate = useNavigate();

  // On mount, if a user object does not exist, query the backend to see if
  // there is a valid user session and store that data locally
  useEffect(() => {
    // If we already have a valid user object and session, return early
    if (user?.username) return;

    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const result = await axios.get('/api/v1/user', { withCredentials: true });
        if (result.data.user) {
          setUser(result.data.user);
        } else {
          navigate('/', { replace: true });
        }
        setUser(result.data.user);
      } catch (err) {
        setErrorResponse(err);
        navigate('/', { replace: true });
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (user)
    return (
      <>
        <AppBar />
        {children}
      </>
    );
  return null;
};

export default ProtectedRoute;
