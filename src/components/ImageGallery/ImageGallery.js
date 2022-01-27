import ImageGalleryItem from "../ImageGalleryItem";
import { GalleryList } from "./ImageGallery.styled";
import PropTypes from "prop-types";

export default function ImageGallery({ picturesList, openModal }) {
  return (
    <GalleryList>
      {picturesList.map((picture, index) => {
        const { id, webformatURL, largeImageURL } = picture;

        return (
          <ImageGalleryItem
            key={index}
            pictureItem={picture}
            openModal={openModal}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
          />
        );
      })}
    </GalleryList>
  );
}

ImageGallery.propTypes = {
  picturesList: PropTypes.array,
  openModal: PropTypes.func,
};
