import { GalleryItem, Img } from "./ImageGalleryItem.styled";

export default function ImageGalleryItem({ pictureItem }) {
  return (
    <GalleryItem>
      <Img src={pictureItem.webformatURL} alt={pictureItem.tags} />
    </GalleryItem>
  );
}
