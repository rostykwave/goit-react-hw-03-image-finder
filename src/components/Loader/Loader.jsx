import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { BallTriangle } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <BallTriangle height="100" width="100" color="grey" ariaLabel="loading" />
  );
};
