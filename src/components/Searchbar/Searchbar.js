import { Component } from "react";
import { toast } from "react-toastify";
import {
  Header,
  SerchForm,
  Input,
  SerchButton,
  ButtonLabel,
} from "./Serchbar.styled";

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
      return alert("Type something please");
    }
    this.props.onSubmit(this.state);
    // this.setState({ serchQuery: "" });
  };

  render() {
    return (
      <Header>
        <SerchForm onSubmit={this.handleSubmit}>
          <SerchButton type="submit">
            <ButtonLabel></ButtonLabel>
          </SerchButton>

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
