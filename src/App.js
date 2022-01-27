import { Component } from "react";
import { SpinnerDotted } from "spinners-react";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import LoadMoreButton from "./components/Button-load-more";
import Modal from "./components/Modal";
import toast, { Toaster } from "react-hot-toast";

const API_KEY = "24436915-6043b65348ea2ff9e087fc098";

class App extends Component {
  state = {
    pictures: [],
    searchQuery: "",
    isLoading: false,
    currentPage: 1,
    showModal: false,
    largeImg: "",
    error: null,
    totalHits: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.state;

    if (prevState.searchQuery !== searchQuery) {
      this.fetchImg();
    }
  }

  fetchImg = () => {
    const { currentPage, searchQuery } = this.state;

    if (!searchQuery) return;

    this.setState({ isLoading: true });

    return fetch(
      `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        this.setState((prevState) => ({
          pictures: [...prevState.pictures, ...data.hits],
          currentPage: prevState.currentPage + 1,
          totalHits: data.total,
        }));

        if (this.state.totalHits === 0) {
          toast(`There in no pictures with ${this.state.searchQuery} name`, {
            style: {
              background: "#f1584d",
              color: "black",
            },
          });
        }

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      })
      .catch((error) => this.setState({ error }))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  formSubmitHandler = (searchQuery) => {
    this.setState({
      searchQuery: searchQuery,
      currentPage: 1,
      pictures: [],
      error: null,
    });
  };

  toggleModal = (largeImg, tags) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImg,
      tags,
    }));
  };

  render() {
    const { showModal, largeImg, tags, pictures, totalHits, isLoading, error } =
      this.state;
    return (
      <>
        {error && <p>{`Ooops... something went wrong: ${error}`} </p>}

        <Searchbar onSubmit={this.formSubmitHandler} />
        <ImageGallery picturesList={pictures} openModal={this.toggleModal} />

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImg} alt={tags} />
          </Modal>
        )}

        {pictures.length !== totalHits && !isLoading && (
          <LoadMoreButton onClick={this.fetchImg} />
        )}

        {isLoading && (
          <SpinnerDotted
            size={80}
            color="rgb(130, 183, 231)"
            thickness={100}
            style={{
              display: "block",
              margin: "0 auto",
              marginTop: "16px",
            }}
          />
        )}

        <Toaster
          containerStyle={{
            top: 15,
            left: 1000,
            right: 0,
          }}
        />
      </>
    );
  }
}

export default App;

// ======================

// fetch(
//   `${BASE_URL}?q=${serchQuery}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
// )
//   .then((response) => {
//     if (response.ok) {
//       console.log("после фетча");
//       return response.json();
//     }

//     return Promise.reject(
//       new Error(`По запросу ${serchQuery}ничего не найдено`)
//     );
//   })
//   .then((data) => {
//     this.setState((prevState) => ({
//       status: "resolved",
//       pictures: [...prevState.pictures, ...data.hits],
//       totalHits: data.totalHits,
//     }));

//     if (data.hits.length === 0) {
//       this.setState({ status: "rejected" });

//       toast("There is no pictures with such name", {
//         style: {
//           background: "#f1584d",
//           color: "black",
//         },
//       });
//     }

//     // if (totalHits === this.state.pictures.length) {
//     //   this.setState({ status: "idle" });
//     // }
//   })
//   .catch(() => this.setState({ status: "rejected" }));

//===============================================================
