import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ collection, openModal }) => {
  return (
    <Gallery>
      {collection.map(item => (
        <ImageGalleryItem key={item.id} item={item} openModal={openModal} />
      ))}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  collection: PropTypes.arrayOf(PropTypes.object),
  openModal: PropTypes.func,
};
