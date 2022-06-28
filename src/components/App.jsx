import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import { Box } from 'styleConfig/Box';
import { Component } from 'react';
import { fetchImages } from 'services/pixabay-api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { LoadMoreButton } from './Button/Button';
// import { Modal } from './Modal/Modal';

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

  render() {
    const { status, images } = this.state;

    return (
      <Box display="grid" gridTemplateColumns="1fr" gridGap="16px" pb="24px">
        <Searchbar onSubmit={this.handleFormSubmit} />

        {status === 'idle' && <div>Make your choice</div>}
        {status === 'pending' && <Loader />}
        {status === 'resolved' && <ImageGallery images={images} />}
        {status === 'rejected' && <p>Error</p>}
        <ToastContainer autoClose={3000} />
        {/* <Modal></Modal> */}
        <LoadMoreButton />
      </Box>
    );
  }
}
