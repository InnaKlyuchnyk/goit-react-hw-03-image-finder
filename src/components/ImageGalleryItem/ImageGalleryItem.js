import { GalleryItem, Img } from "./ImageGalleryItem.styled";

export default function ImageGalleryItem({
  pictureItem,
  openModal,
  getLargeImg,
}) {
  const { largeImageURL, id, webformatURL, tags } = pictureItem;

  getLargeImg(largeImageURL, id);

  return (
    <GalleryItem>
      <Img src={webformatURL} alt={tags} onClick={openModal} id={id} />
    </GalleryItem>
  );
}
