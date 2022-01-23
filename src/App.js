import { Component } from "react";
import { ToastContainer } from "react-toastify";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "24436915-6043b65348ea2ff9e087fc098";

class App extends Component {
  state = { pictures: null, loading: false, serchQuery: "" };

  componentDidMount() {}
  componentDidUpdate(prevProps, prevState) {
    if (prevState.serchQuery !== this.state.serchQuery) {
      this.setState({ loading: true });
      fetch(
        `${BASE_URL}?q=${this.state.serchQuery}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then((response) => response.json())
        .then((data) => {
          this.setState({ pictures: data.hits });
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  }

  formSubmitHandler = ({ serchQuery }) => {
    this.setState({ serchQuery });
  };
  render() {
    const { loading, pictures } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.formSubmitHandler} />
        {loading && <h1>Загружаем...</h1>}
        {pictures && <ImageGallery picturesList={this.state.pictures} />}
        {pictures !== null && pictures.length === 0 && <p>Ничего не найдено</p>}
        <ToastContainer />
      </>
    );
  }
}

export default App;
