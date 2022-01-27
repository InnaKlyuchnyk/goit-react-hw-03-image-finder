import { Component } from "react";
import { SpinnerDotted } from "spinners-react";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import LoadMoreButton from "./components/Button-load-more";
import Modal from "./components/Modal";
import toast, { Toaster } from "react-hot-toast";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "24436915-6043b65348ea2ff9e087fc098";

class App extends Component {
  state = {
    pictures: [],
    serchQuery: "",
    // status: "idle",
    currentPage: 1,
    showModal: false,
    largeImg: "",
    tags: "",
    totalHits: 0,
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { serchQuery, currentPage, totalHits } = this.state;

    if (
      prevState.serchQuery !== serchQuery ||
      prevState.currentPage !== currentPage
    ) {
      console.log("до фетча");

      this.setState({ loading: true });
      // this.setState({ status: "pending" });

      fetch(
        `${BASE_URL}?q=${serchQuery}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then((response) => {
          if (response.ok) {
            console.log("после фетча");
            return response.json();
          }

          return Promise.reject(
            new Error(`По запросу ${serchQuery}ничего не найдено`)
          );
        })
        .then((data) => {
          this.setState((prevState) => ({
            // status: "resolved",
            pictures: [...prevState.pictures, ...data.hits],
            totalHits: data.totalHits,
          }));

          if (data.hits.length === 0) {
            this.setState({ status: "rejected" });

            toast("There is no pictures with such name", {
              style: {
                background: "#f1584d",
                color: "black",
              },
            });
          }

          // if (totalHits === this.state.pictures.length) {
          //   // this.setState({ status: "idle" });
          // }
        });
      // .catch(() => this.setState({ status: "rejected" }));
    }
  }

  formSubmitHandler = ({ serchQuery }) => {
    this.setState({
      serchQuery,
      currentPage: 1,
      pictures: [],
    });
  };

  onLoadMoreClick = () => {
    console.log("клик на лоад мор");
    this.setState((prevProps) => ({
      currentPage: (prevProps.currentPage += 1),
    }));
  };

  toggleModal = (largeImg, tags) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImg,
      tags,
    }));
  };

  // checkStatus = () => {
  //   const { status } = this.state;

  //   if (status === "pending") {
  //     return (
  //       <SpinnerDotted
  //         size={80}
  //         color="rgb(130, 183, 231)"
  //         thickness={100}
  //         style={{
  //           display: "block",
  //           margin: "0 auto",
  //           marginTop: "16px",
  //         }}
  //       />
  //     );
  //   }

  //   if (status === "resolved") {
  //     return <LoadMoreButton onClick={this.onLoadMoreClick} />;
  //   }
  // };

  render() {
    const { showModal, largeImg, tags, pictures } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.formSubmitHandler} />
        <ImageGallery picturesList={pictures} openModal={this.toggleModal} />
        {pictures.length !== 0 && (
          <LoadMoreButton onClick={this.onLoadMoreClick} />
        )}
        {/* {this.checkStatus()} */}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImg} alt={tags} />
          </Modal>
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

// fetchImg = ({ serchQuery, currentPage }) => {
//   return fetch(
//     `${BASE_URL}?q=${serchQuery}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
//   ).then((response) => {
//     if (response.ok) {
//       console.log("после фетча");
//       return response.json();
//     }
//     return Promise.reject(
//       new Error(`По запросу ${serchQuery}ничего не найдено`)
//     );
//   });
// };

// in load more
// this.fetchImg(this.state).then(() =>
//   this.setState((prevState) => ({
//     currentPage: (prevState.currentPage += 1),
//   }))
// );

// im didUpdate

// this.fetchImg(this.state)
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
//     if (totalHits === this.state.pictures.length) {
//       this.setState({ status: "idle" });
//     }
//   })
//   .catch(() => this.setState({ status: "rejected" }));
