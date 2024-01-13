import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '40923797-6aa6ccd63203db4fea8082569',
    q: '',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: 1,
    per_page: 12,
  },
});

export const searchImages = (q, page = 1) => {
  return instance.get('/', {
    params: {
      q,
      page,
    },
  });
};
