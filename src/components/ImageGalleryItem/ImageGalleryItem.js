import { GalleryItem, Img } from "./ImageGalleryItem.styled";

export default function ImageGalleryItem({ pictureItem, openModal }) {
  const { largeImageURL, webformatURL, tags } = pictureItem;

  return (
    <GalleryItem onClick={() => openModal(largeImageURL, tags)}>
      <Img src={webformatURL} alt={tags} />
    </GalleryItem>
  );
}
