import css from './Searchbar.module.css';

const Searchbar = ({ children }) => {
  return <header className={css.searchbar}>{children}</header>;
};

export default Searchbar;
