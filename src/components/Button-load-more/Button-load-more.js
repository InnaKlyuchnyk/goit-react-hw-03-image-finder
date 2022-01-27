import { LoadMore } from "./Button-load-more.styled";
import PropTypes from "prop-types";

export default function LoadMoreButton({ onClick }) {
  return (
    <LoadMore type="button" onClick={onClick}>
      Load more
    </LoadMore>
  );
}

LoadMoreButton.propTypes = {
  onClick: PropTypes.func,
};
