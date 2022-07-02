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
    leftPages: 0,
    images: [],
    error: null,
    status: Status.IDLE,
    largeImage: {
      src: '',
      alt: '',
    },
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const perPage = 12;
    const { searchQuery, page } = this.state;
    this.setState({ status: Status.PENDING });

    fetchImagesAPI(searchQuery, page, perPage)
      .then(data => {
        // console.log(data);
        const images = data.hits;

        if (images.length === 0) {
          throw Error('There is no images found on this search result');
        }
        const totalHits = data.totalHits;
        const leftPages = Math.ceil(totalHits / perPage) - page;

        this.setState(prevState => {
          return {
            images: [...prevState.images, ...images],
            status: Status.RESOLVED,
            leftPages,
          };
        });
      })
      .catch(error => this.setState({ error, status: Status.REJECTED }));
  };

  handleFormSubmit = searchQuery => {
    if (searchQuery !== this.state.searchQuery) {
      this.setState({ searchQuery, page: 1, images: [] });
    }
  };

  handleModalOpen = (largeImageURL, tags) => {
    this.setState({
      largeImage: {
        src: largeImageURL,
        alt: tags,
      },
    });
  };

  handleModalClose = () => {
    this.setState({
      largeImage: {
        src: '',
        alt: '',
      },
    });
  };

  loadMore = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };

  render() {
    const { status, images, largeImage, leftPages } = this.state;

    return (
      <Box display="grid" gridTemplateColumns="1fr" gridGap="16px" pb="24px">
        <Searchbar onSubmit={this.handleFormSubmit} />
        {images.length > 0 && (
          <ImageGallery
            images={images}
            handlerModalOpen={this.handleModalOpen}
          />
        )}

        {status === 'idle' && (
          <Box textAlign="center" color="#c5c1c1">
            Your gallery will appear here after search
          </Box>
        )}
        {status === 'pending' && <Loader />}

        {status === 'resolved' && leftPages && (
          <LoadMoreButton onClick={this.loadMore} />
        )}

        {status === 'rejected' && (
          <Box color="red" textAlign="center">
            {this.state.error.message}
          </Box>
        )}
        <ToastContainer autoClose={3000} />

        {largeImage.src && (
          <Modal onClose={this.handleModalClose}>
            <img src={largeImage.src} alt={largeImage.alt} />
          </Modal>
        )}
      </Box>
    );
  }
}
