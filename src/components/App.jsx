import { Component } from 'react';
import { getImages } from 'services/serviceAPI';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Buttom';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { AppWraper } from './App.styled';

export class App extends Component {
  state = {
    searchTerm: '',
    collection: [],
    page: 0,
    error: null,
    status: 'idle',
    isOpenModal: false,
    image: '',
  };

  async componentDidUpdate(_, prevState) {
    const { searchTerm: newSearchTerm, page: newPage } = this.state;
    const { searchTerm: prevSearchTerm, page: prevPage } = prevState;

    if (newSearchTerm !== prevSearchTerm || newPage !== prevPage) {
      this.setState({ status: 'loading' });
      try {
        const collection = await getImages(newSearchTerm, newPage);
        if (collection instanceof Error) {
          throw collection;
        }
        if (collection.length === 0 && newSearchTerm !== prevSearchTerm) {
          this.setState(
            {
              status: 'idle',
              collection,
            },
            () => alert(`No images found for your request "${newSearchTerm}"`)
          );
          return;
        }
        if (collection.length === 0) {
          this.setState(
            {
              status: 'resolved',
            },
            () => alert(`No more images by request "${newSearchTerm}"`)
          );
          return;
        }
        this.setState(prevState => ({
          collection: [...prevState.collection, ...collection],
          status: 'resolved',
        }));
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    }
  }

  handleSubmit = searchTerm => {
    if (searchTerm.trim() !== '') {
      if (searchTerm === this.state.searchTerm) {
        return;
      }
      this.setState({
        searchTerm,
        page: 1,
        collection: [],
      });
    } else {
      return alert('Tap somthing for request');
    }
  };

  addImages = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleModal = image => {
    this.setState(prevState => ({
      isOpenModal: !prevState.isOpenModal,
      image,
    }));
  };

  render() {
    const { collection, status, isOpenModal, image } = this.state;
    return (
      <AppWraper>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery collection={collection} openModal={this.handleModal} />
        {status === 'loading' && <Loader />}
        {status === 'resolved' && <Button onClick={this.addImages} />}
        {status === 'rejected' && <p>Somthing goes wrong... Try againe.</p>}
        {isOpenModal && <Modal image={image} closeModal={this.handleModal} />}
      </AppWraper>
    );
  }
}
