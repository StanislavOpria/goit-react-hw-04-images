import { useState, useEffect } from 'react';
import { getImages } from 'services/serviceAPI';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Buttom';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { AppWraper } from './App.styled';

export const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [collection, setCollection] = useState([]);
  const [page, setPage] = useState(0);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [image, setImage] = useState('false');

  useEffect(() => {
    if (searchTerm === '') {
      return;
    }

    setStatus('pending');

    async function fetchData() {
      try {
        const newCollection = await getImages(searchTerm, page);

        if (newCollection instanceof Error) {
          throw newCollection;
        }

        if (newCollection.length === 0 && page === 1) {
          setCollection(newCollection);
          setStatus('idle');
          alert(`No images found for your request "${searchTerm}"`);
          return;
        }

        if (newCollection.length === 0) {
          setStatus('resolved');
          alert(`No more images by request "${searchTerm}"`);
          return;
        }

        setCollection([...collection, ...newCollection]);
        setStatus('resolved');
      } catch (newError) {
        setError(newError);
        setStatus('rejected');
      }
    }

    fetchData();
  }, [searchTerm, page]);

  const handleSubmit = query => {
    if (query.trim() !== '') {
      if (query === searchTerm) {
        return;
      }
      setSearchTerm(query);
      setPage(1);
      setCollection([]);
    } else {
      return alert('Tap somthing for request');
    }
  };

  const addImages = () => {
    setPage(prevState => prevState + 1);
  };

  const handleModal = pickedImage => {
    setIsOpenModal(prevState => !prevState);
    setImage(pickedImage);
  };

  return (
    <AppWraper>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery collection={collection} openModal={handleModal} />
      {status === 'pending' && <Loader />}
      {status === 'resolved' && <Button onClick={addImages} />}
      {status === 'rejected' && (
        <p error={error.message}>Somthing goes wrong... Try againe.</p>
      )}
      {isOpenModal && <Modal image={image} closeModal={handleModal} />}
    </AppWraper>
  );
};
