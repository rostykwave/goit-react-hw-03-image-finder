import { Item, Image } from 'components/ImageGallery/ImageGallery.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, imageAlt, handlerModalOpen }) => {
  const onGalleryItemClick = () => {
    handlerModalOpen(largeImageURL, imageAlt)
  }

  return (
    <Item onClick={onGalleryItemClick}>
      <Image src={webformatURL} alt={imageAlt} />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  handlerModalOpen: PropTypes.func.isRequired,
};
