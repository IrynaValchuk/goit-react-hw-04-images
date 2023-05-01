import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { ImageGallery, Searchbar, Loader, Button } from 'components';
import { fetchImages } from 'services/api';
import { PER_PAGE } from 'constants';
import 'react-toastify/dist/ReactToastify.css';
import css from 'components/App/App.module.css';

export const App = () => {
  const [queryValue, setQueryValue] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    if (queryValue === '') {
      return;
    }
    const handleFetchImages = async () => {
      try {
        setIsLoading(true);
        setLoadMore(false);
        const response = await fetchImages(queryValue, page);
        const totalPage = Math.ceil(response.totalHits / PER_PAGE);
        setImages(prevImages => [
          ...prevImages,
          ...normalaziedImages(response.hits),
        ]);
        setLoadMore(page < totalPage);
        if (response.totalHits === 0) {
          toast.error(
            `Sorry, there are no images matching your search query. Please try again.`
          );
        }
      } catch (error) {
        toast.error(`${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    handleFetchImages();
  }, [queryValue, page]);

  const normalaziedImages = images => {
    return images.map(({ id, webformatURL, largeImageURL, tags }) => ({
      id,
      webformatURL,
      largeImageURL,
      tags,
    }));
  };

  const handleSubmit = newQueryValue => {
    if (newQueryValue === queryValue) {
      return toast.success('Your query has been completed.');
    }

    setQueryValue(newQueryValue);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} />
      {loadMore && <Button onClick={handleLoadMore} />}
      {isLoading && <Loader />}
      <ToastContainer autoClose={2000} />
    </div>
  );
};
