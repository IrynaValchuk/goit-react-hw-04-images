import { Modal } from 'components';
import { useState } from 'react';
import PropTypes from 'prop-types';
import css from 'components/ImageGalleryItem/ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  return (
    <li className={css.imageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        className={css.imageGalleryItemImg}
        onClick={toggleModal}
      />

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={tags} height="500" />
        </Modal>
      )}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
