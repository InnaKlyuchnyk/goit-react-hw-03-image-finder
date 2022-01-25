import ImageGalleryItem from "../ImageGalleryItem";
import { GalleryList } from "./ImageGallery.styled";

export default function ImageGallery({ picturesList, openModal }) {
  return (
    <GalleryList>
      {picturesList.map((picture) => {
        const { id, webformatURL, largeImageURL } = picture;

        return (
          <ImageGalleryItem
            key={id}
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
