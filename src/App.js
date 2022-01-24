import { Component } from "react";
import { ToastContainer } from "react-toastify";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import LoadMoreButton from "./components/Button-load-more";
import Modal from "./components/Modal";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "24436915-6043b65348ea2ff9e087fc098";

class App extends Component {
  state = {
    pictures: [],
    serchQuery: "",
    status: "idle",
    currentPage: 1,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { serchQuery, currentPage } = this.state;

    if (
      prevState.serchQuery !== serchQuery ||
      prevState.currentPage !== currentPage
    ) {
      fetch(
        `${BASE_URL}?q=${serchQuery}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
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
          this.setState((prevState) => ({
            status: "resolved",
            pictures: [...prevState.pictures, ...data.hits],
          }));
        })
        .catch(() => this.setState({ status: "rejected" }));
    }
  }
  //
  formSubmitHandler = ({ serchQuery }) => {
    this.setState({ serchQuery, currentPage: 1, pictures: [] });
  };

  onLoadMoreClick = () => {
    this.setState((prevState) => ({
      currentPage: (prevState.currentPage += 1),
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  checkStatus = () => {
    const { pictures, status } = this.state;

    if (status === "pending") {
      return <h1>Загружаем...</h1>;
    }

    if (status === "resolved") {
      return (
        <>
          <ImageGallery picturesList={pictures} openModal={this.toggleModal} />
          <LoadMoreButton onClick={this.onLoadMoreClick} />
        </>
      );
    }
  };

  render() {
    const { showModal } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.formSubmitHandler} />
        {this.checkStatus()}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src="" alt="" />
          </Modal>
        )}

        <ToastContainer />
      </>
    );
  }
}

export default App;
