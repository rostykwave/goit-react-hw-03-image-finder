import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import { Box } from 'styleConfig/Box';

export const App = () => {
  return (
    <Box display="grid" gridTemplateColumns="1fr" gridGap="16px" pb="24px">
      <Searchbar />
      <ToastContainer autoClose={3000} />
    </Box>
  );
};
