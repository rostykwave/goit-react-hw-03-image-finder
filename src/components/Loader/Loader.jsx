import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { BallTriangle } from 'react-loader-spinner';
import { Box } from 'styleConfig/Box';

export const Loader = () => {
  return (
    <Box display="flex" justifyContent="center">
      <BallTriangle
        hcolor="#00BFFF"
        height={80}
        width={80}
        ariaLabel="loading"
      />
    </Box>
  );
};
