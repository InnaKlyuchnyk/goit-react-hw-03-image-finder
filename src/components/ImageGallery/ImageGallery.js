import ImageGalleryItem from "../ImageGalleryItem";
import { GalleryList } from "./ImageGallery.styled";

export default function ImageGallery({ picturesList, openModal }) {
  return (
    <GalleryList>
      {picturesList.map((picture) => {
        return (
          <ImageGalleryItem
            key={picture.id}
            pictureItem={picture}
            openModal={openModal}
          />
        );
      })}
    </GalleryList>
  );
}
