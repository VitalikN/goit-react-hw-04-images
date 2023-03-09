import { React, Component } from 'react';
import { Toaster } from 'react-hot-toast';
import { Container, Chip, Text } from './App.styled';
import { fetchGallery } from './fetch/fetch';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Spinner } from './Spinner/Spinner';
import { Searchbar } from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    imageGallery: [],
    searchQuery: '',
    isVisible: false,
    isLoader: false,
    page: 1,
    isEmpty: false,
    error: null,
    largeUrl: null,
    tag: null,
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      this.imgGalleryList(this.state.searchQuery, this.state.page);
    }
  }
  imgGalleryList = async (searchQuery, page) => {
    this.setState({ isLoader: true });
    try {
      const { hits, totalHits } = await fetchGallery(searchQuery, page);

      if (hits.length === 0) {
        this.setState({ isEmpty: true });
      }
      this.setState(prev => ({
        imageGallery: [...prev.imageGallery, ...hits],
        isVisible: page < Math.ceil(totalHits / 12),
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoader: false });
    }
  };

  handleSubmit = nameSearch => {
    this.setState({
      searchQuery: nameSearch,
      imageGallery: [],
      isVisible: false,
      isLoader: false,
      page: 1,
      isEmpty: false,
      error: null,
    });
  };

  loadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  onModalClose = () => {
    this.setState({ largeUrl: null, tag: null });
  };

  openModal = (url, alt) => this.setState({ largeUrl: url, tag: alt });

  render() {
    const {
      imageGallery,
      isVisible,
      searchQuery,
      isLoader,
      isEmpty,
      error,
      largeUrl,
      tag,
    } = this.state;
    const { handleSubmit, loadMore, openModal, onModalClose } = this;
    return (
      <Container>
        <Toaster
          position="top-right"
          toastOptions={{
            className: '',
            duration: 1000,
            style: {
              background: '#ff0303',
              color: '#fff',
            },
          }}
        />
        <Searchbar onSearch={handleSubmit} />
        {searchQuery && (
          <ImageGallery imageGallery={imageGallery} onOpenModal={openModal} />
        )}
        {largeUrl && <Modal url={largeUrl} alt={tag} onClose={onModalClose} />}
        {isLoader && <Chip> {Spinner()} </Chip>}

        {isVisible && <Button loadMore={loadMore} />}

        {isEmpty && <Text> Sorry. There are no images ... </Text>}
        {error && <Text> Something went wrong. Try again later.😭 </Text>}
      </Container>
    );
  }
}
