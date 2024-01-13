import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ items, showModal }) => {
  return items.map(({ id, webformatURL, tags, largeImageURL }) => (
    <li className={css.item} key={id}>
      <a href={largeImageURL} onClick={showModal}>
        <img
          src={webformatURL}
          alt={tags}
          className={css.image}
          loading="lazy"
        />
      </a>
    </li>
  ));
};

export default ImageGalleryItem;
