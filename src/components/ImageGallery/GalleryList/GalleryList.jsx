import { Item } from 'components/ImageGallery/Item/Item';
import PropTypes from 'prop-types';
import { StyledGalleryList } from './GalleryList.styled';

export const GalleryList = ({ images, handlerModalOpen }) => {
  return (
    <StyledGalleryList>
      {images &&
        images.map(({ id, webformatURL, largeImageURL, tags }) => (
          <Item
            key={id}
            id={id}
            imageAlt={tags}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            handlerModalOpen={handlerModalOpen}
          />
        ))}
    </StyledGalleryList>
  );
};

GalleryList.propTypes = {
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
