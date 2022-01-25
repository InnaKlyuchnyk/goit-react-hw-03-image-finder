import { GalleryItem, Img } from "./ImageGalleryItem.styled";
import PropTypes from "prop-types";

export default function ImageGalleryItem({ pictureItem, openModal }) {
  const { largeImageURL, webformatURL, tags } = pictureItem;

  return (
    <GalleryItem onClick={() => openModal(largeImageURL, tags)}>
      <Img src={webformatURL} alt={tags} />
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  pictureItem: PropTypes.object,
  openModal: PropTypes.func,
};
