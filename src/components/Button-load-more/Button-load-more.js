import { LoadMore } from "./Button-load-more.styled";

export default function LoadMoreButton({ onClick }) {
  return (
    <LoadMore type="button" onClick={onClick}>
      Load more
    </LoadMore>
  );
}
