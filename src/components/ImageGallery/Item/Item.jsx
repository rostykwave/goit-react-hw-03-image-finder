import PropTypes from 'prop-types';
import { StyledImage, StyledItem } from './Item.styled';

export const Item = ({
  webformatURL,
  largeImageURL,
  imageAlt,
  handleModalOpen,
}) => {
  const onGalleryItemClick = () => {
    handleModalOpen(largeImageURL, imageAlt);
  };

  return (
    <StyledItem onClick={onGalleryItemClick}>
      <StyledImage src={webformatURL} alt={imageAlt} />
    </StyledItem>
  );
};

Item.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  handleModalOpen: PropTypes.func.isRequired,
};
