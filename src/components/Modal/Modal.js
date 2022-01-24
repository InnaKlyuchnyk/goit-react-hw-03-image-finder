import { createPortal } from "react-dom";
import { Component } from "react";
import { Overlay, ModalWindow } from "./Modal.styled";

const modalRoot = document.querySelector("#modal-root");

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.code === "Escape") {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <Overlay>
        <ModalWindow>{this.props.children}</ModalWindow>
      </Overlay>,
      modalRoot
    );
  }
}
