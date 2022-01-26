import { LoadMore } from "./Button-load-more.styled";
import PropTypes from "prop-types";

export default function LoadMoreButton({ onClick }) {
  console.log("в функции лоад мор баттон", onClick);
  return (
    <LoadMore type="submit" onClick={onClick}>
      Load more
    </LoadMore>
  );
}

LoadMoreButton.propTypes = {
  onClick: PropTypes.func,
};
