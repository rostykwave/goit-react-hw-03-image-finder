import { Searchbar } from './components/Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import { Box } from 'styleConfig/Box';
import { Component } from 'react';
import { fetchImages } from 'services/pixabay-api';
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
    images: null,
    error: null,
    status: Status.IDLE,
    // largeImage: {
    //   src: 'https://pixabay.com/get/g8e8710f5b3e2d93a45c823fd1e5635e3f836cdd23446e97de306c7136b43c7c6f787fe20a1e9c2968ea1e929b5fc5313cc97c22372fc1838a1a9e8dfc56005db_1280.jpg',
    //   alt: 'tags: winter, sheep, herd',
    // },
    largeImage: {
      src: '',
      alt: '',
    },
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;

    if (prevQuery !== nextQuery) {
      this.setState({ status: Status.PENDING });

      setTimeout(() => {
        fetchImages(this.state.searchQuery)
          .then(data => {
            console.log(data);

            const images = data.hits;
            this.setState({ images, status: Status.RESOLVED });
          })
          .catch(error => this.setState({ error, status: Status.REJECTED }));
      }, 2000);
    }
  }

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  handleModalClose = () => {
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
        {status === 'resolved' && <ImageGallery images={images} />}
        {status === 'rejected' && <p>Error</p>}
        <ToastContainer autoClose={3000} />
        {/* <Modal></Modal> */}
        {largeImage.src && (
          <Modal onClose={this.handleModalClose}>
            <img src={largeImage.src} alt={largeImage.alt} />
          </Modal>
        )}
        <LoadMoreButton />
      </Box>
    );
  }
}
