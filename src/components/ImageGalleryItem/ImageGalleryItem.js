import { GalleryItem, Img } from "./ImageGalleryItem.styled";

export default function ImageGalleryItem({ pictureItem, openModal }) {
  return (
    <GalleryItem>
      <Img
        src={pictureItem.webformatURL}
        alt={pictureItem.tags}
        onClick={openModal}
      />
    </GalleryItem>
  );
}
