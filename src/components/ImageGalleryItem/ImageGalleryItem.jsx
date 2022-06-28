import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ id, webformatURL, largeImageURL, tags }) => {
  return (
    <Item id={id}>
      <Image src={webformatURL} alt={tags} />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
