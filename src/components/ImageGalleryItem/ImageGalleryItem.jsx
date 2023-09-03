import PropTypes from 'prop-types';

import { GalleryItem, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  item: { webformatURL, tags, largeImageURL },
  openModal,
}) => {
  return (
    <GalleryItem>
      <Image
        src={webformatURL}
        alt={tags}
        onClick={() => openModal(largeImageURL)}
      />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
};
