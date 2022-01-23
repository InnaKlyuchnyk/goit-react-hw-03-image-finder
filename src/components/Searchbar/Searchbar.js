import { Component } from "react";
import { toast } from "react-toastify";

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
    this.setState({ serchQuery: "" });
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.serchQuery}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
