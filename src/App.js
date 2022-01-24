import { Component } from "react";
import { ToastContainer } from "react-toastify";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import LoadMoreButton from "./components/Button-load-more";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "24436915-6043b65348ea2ff9e087fc098";
let PAGE = 1;

class App extends Component {
  state = {
    pictures: null,
    serchQuery: "",
    status: "idle",
  };

  componentDidUpdate(prevProps, prevState) {
    const { serchQuery } = this.state;

    if (prevState.serchQuery !== serchQuery) {
      this.setState({ status: "pending" });
      fetch(
        `${BASE_URL}?q=${serchQuery}&page=${PAGE}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(
            new Error(`По запросу ${serchQuery}ничего не найдено`)
          );
        })
        .then((data) => {
          this.setState({ pictures: data.hits, status: "resolved" });
        })
        .catch(() => this.setState({ status: "rejected" }));
    }
  }

  formSubmitHandler = ({ serchQuery }) => {
    this.setState({ serchQuery });
  };

  onLoadMoreClick = () => {
    PAGE += 1;
    console.log(PAGE);
  };

  checkStatus = () => {
    const { pictures, serchQuery, status } = this.state;

    if (status === "pending") {
      return <h1>Загружаем...</h1>;
    }
    if (status === "rejected" || (pictures !== null && pictures.length === 0)) {
      return <p>По запросу {serchQuery} ничего не найдено</p>;
    }
    if (status === "resolved") {
      return (
        <>
          <ImageGallery picturesList={pictures} />
          <LoadMoreButton onClick={this.onLoadMoreClick} />
        </>
      );
    }
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.formSubmitHandler} />
        {this.checkStatus()}
        <ToastContainer />
      </>
    );
  }
}

export default App;
