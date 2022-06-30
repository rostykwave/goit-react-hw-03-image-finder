import { ImageGalleryItem } from 'components/ImageGallery/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images, handlerModalOpen }) => {
  return (
    <GalleryList>
      {images &&
        images.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            id={id}
            imageAlt={tags}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            handlerModalOpen={handlerModalOpen}
          />
        ))}
    </GalleryList>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  handlerModalOpen: PropTypes.func.isRequired,
};
