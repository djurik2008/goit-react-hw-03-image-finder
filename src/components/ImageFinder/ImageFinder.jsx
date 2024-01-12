import { Component } from 'react';
import FinderForm from 'components/FinderForm/FinderForm';
import Searchbar from 'components/Searchbar/Searchbar';

class ImageFinder extends Component {
  state = {
    search: '',
    images: [],
    loading: false,
    error: null,
    page: 1,
    modalOpen: false,
    postDetails: {},
  };

  handleSearch = ({ search }) => {
    this.setState({
      search,
      posts: [],
      page: 1,
    });
  };

  render() {
    const { handleSearch } = this;
    return (
      <Searchbar>
        <FinderForm onSubmit={handleSearch} />
      </Searchbar>
    );
  }
}

export default ImageFinder;
