import { Component } from 'react';
import FinderForm from 'components/FinderForm/FinderForm';
import Searchbar from 'components/Searchbar/Searchbar';
import { searchImages } from 'api/images';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';
import css from './ImageFinder.module.css';

class ImageFinder extends Component {
  state = {
    search: '',
    images: [],
    loading: false,
    error: null,
    page: 1,
    modalOpen: false,
    largeImageURL: '',
    alt: '',
  };

  async componentDidUpdate(_, prevState) {
    const { search, page } = this.state;
    if (search && (search !== prevState.search || page !== prevState.page)) {
      this.fetchImages();
    }
  }

  async fetchImages() {
    const { search, page } = this.state;
    try {
      this.setState({
        loading: true,
      });
      const {
        data: { hits },
      } = await searchImages(search, page);
      this.setState(({ images }) => ({
        images: hits?.length ? [...images, ...hits] : images,
      }));
    } catch (error) {
      this.setState({
        error: error.message,
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  handleSearch = ({ search }) => {
    this.setState({
      search,
      images: [],
      page: 1,
    });
  };

  showModal = e => {
    e.preventDefault();
    this.setState({
      modalOpen: true,
      largeImageURL: e.currentTarget.href,
      alt: e.target.alt,
    });
  };

  closeModal = () => {
    this.setState({
      modalOpen: false,
    });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { handleSearch, loadMore, showModal, closeModal } = this;
    const { images, loading, error, modalOpen, largeImageURL, alt } =
      this.state;
    const isImages = Boolean(images.length);
    return (
      <>
        <Searchbar>
          <FinderForm onSubmit={handleSearch} />
        </Searchbar>
        {error && <p className={css.error}>{error}</p>}
        {isImages && (
          <ImageGallery>
            <ImageGalleryItem items={images} showModal={showModal} />
          </ImageGallery>
        )}
        {isImages && (
          <div className={css.loadMoreContainer}>
            <Button onClick={loadMore} type="button">
              Load more
            </Button>
          </div>
        )}
        {loading && (
          <div className={css.loader}>
            <Loader />
          </div>
        )}
        {modalOpen && (
          <Modal close={closeModal}>
            <img src={largeImageURL} alt={alt} loading="lazy" />
          </Modal>
        )}
      </>
    );
  }
}

export default ImageFinder;
