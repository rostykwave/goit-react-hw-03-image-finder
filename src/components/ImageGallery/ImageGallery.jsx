import PropTypes from 'prop-types';
import { LoadMoreButton } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { ToastContainer } from 'react-toastify';
import { Box } from 'styleConfig/Box';
import { GalleryList } from './GalleryList/GalleryList';

export const ImageGallery = ({
  status,
  images,
  largeImage,
  leftPages,
  error,
  handleModalOpen,
  handleModalClose,
  loadMore,
}) => {
  return (
    <>
      {images.length > 0 && (
        <GalleryList images={images} handlerModalOpen={handleModalOpen} />
      )}

      {status === 'idle' && (
        <Box textAlign="center" color="#c5c1c1">
          Your gallery will appear here after search
        </Box>
      )}
      {status === 'pending' && <Loader />}

      {status === 'resolved' && leftPages && (
        <LoadMoreButton onClick={loadMore} />
      )}

      {status === 'rejected' && (
        <Box color="red" textAlign="center">
          {error.message}
        </Box>
      )}
      <ToastContainer autoClose={3000} />

      {largeImage.src && (
        <Modal onClose={handleModalClose}>
          <img src={largeImage.src} alt={largeImage.alt} />
        </Modal>
      )}
    </>
  );
};

ImageGallery.propTypes = {
  status: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  largeImage: PropTypes.object.isRequired,
  leftPages: PropTypes.number.isRequired,
  error: PropTypes.PropTypes.object.isRequired,
  handleModalOpen: PropTypes.func.isRequired,
  handleModalClose: PropTypes.func.isRequired,
  loadMore: PropTypes.func.isRequired,
};
