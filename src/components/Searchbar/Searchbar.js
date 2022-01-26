import { Component } from "react";
import { Header, SerchForm, Input } from "./Serchbar.styled";
import IconButton from "../Icon-Button/Icon-Button";
import { ReactComponent as SerchIcon } from "../../icons/serch.svg";
import toast from "react-hot-toast";

export default class Searchbar extends Component {
  state = {
    serchQuery: "",
  };

  handleChange = (event) => {
    const { value } = event.currentTarget;
    this.setState({ serchQuery: value.toLowerCase() });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.serchQuery.trim() === "") {
      return toast("Type something please", {
        style: {
          background: "#f6f7c1",
          color: "black",
        },
      });
    }
    this.props.onSubmit(this.state);
  };
  render() {
    return (
      <Header>
        <SerchForm onSubmit={this.handleSubmit}>
          <IconButton type="submit">
            <SerchIcon width="32" heigth="32" />
          </IconButton>

          <Input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.serchQuery}
            onChange={this.handleChange}
          />
        </SerchForm>
      </Header>
    );
  }
}
