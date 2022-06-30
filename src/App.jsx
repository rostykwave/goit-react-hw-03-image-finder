import { Searchbar } from './components/Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box } from 'styleConfig/Box';
import { Component } from 'react';
import { fetchImagesAPI } from 'services/pixabay-api';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { LoadMoreButton } from './components/Button/Button';
import { Modal } from 'components/Modal/Modal';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    error: null,
    status: Status.IDLE,
    largeImage: {
      src: '',
      alt: '',
    },
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;

    if (prevQuery !== nextQuery) {
      this.setState({ status: Status.PENDING, page: 1, images: [] });

      setTimeout(() => {
        this.fetchImages();
      }, 1000);
    }
  }

  fetchImages = () => {
    const { searchQuery, page } = this.state;

    fetchImagesAPI(searchQuery, page)
      .then(data => {
        console.log(data);

        const images = data.hits;

        if (images.length > 0) {
          this.setState(prevState => {
            return {
              images: [...prevState.images, ...images],
              status: Status.RESOLVED,
              page: prevState.page + 1,
            };
          });
        } else {
          console.log('no images');
          this.setState({ images, status: Status.REJECTED });
        }

        // window.scrollTo({
        //   top: document.documentElement.scrollHeight - 670,
        //   behavior: 'smooth',
        // });
      })
      .catch(error => this.setState({ error, status: Status.REJECTED }));
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  handlerModalOpen = (largeImageURL, tags) => {
    this.setState({
      largeImage: {
        src: largeImageURL,
        alt: tags,
      },
    });
  };

  handlerModalClose = () => {
    this.setState({
      largeImage: {
        src: '',
        alt: '',
      },
    });
  };

  render() {
    const { status, images, largeImage } = this.state;

    return (
      <Box display="grid" gridTemplateColumns="1fr" gridGap="16px" pb="24px">
        <Searchbar onSubmit={this.handleFormSubmit} />

        {status === 'idle' && <div>Make your choice</div>}
        {status === 'pending' && <Loader />}

        {status === 'resolved' && (
          <>
            <ImageGallery
              images={images}
              handlerModalOpen={this.handlerModalOpen}
            />
            <LoadMoreButton onClick={this.fetchImages} />
          </>
        )}

        {status === 'rejected' && <p>Error</p>}
        <ToastContainer autoClose={3000} />

        {largeImage.src && (
          <Modal onClose={this.handlerModalClose}>
            <img src={largeImage.src} alt={largeImage.alt} />
          </Modal>
        )}
      </Box>
    );
  }
}
