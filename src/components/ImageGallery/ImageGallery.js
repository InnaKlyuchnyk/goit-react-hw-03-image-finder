import ImageGalleryItem from "../ImageGalleryItem";

export default function ImageGallery({ picturesList }) {
  console.log("в списке", picturesList);
  return (
    <ul className="gallery">
      {picturesList.map((picture) => {
        return <ImageGalleryItem key={picture.id} pictureItem={picture} />;
      })}
    </ul>
  );
}
