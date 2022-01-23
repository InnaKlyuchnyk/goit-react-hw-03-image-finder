export default function ImageGalleryItem({ pictureItem }) {
  // console.log(webformatURL);
  return (
    <li className="gallery-item">
      <img src={pictureItem.webformatURL} alt="" />
    </li>
  );
}
