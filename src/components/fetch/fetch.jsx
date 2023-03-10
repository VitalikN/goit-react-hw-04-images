import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '32552972-dc07813a8434780c4e0dd03fe';

export const fetchGallery = async (searchQuery, page) => {
  const { data } = await axios.get(
    `${BASE_URL}?image_type=photo&orientation=horizontal&per_page=12`,
    {
      params: {
        key: API_KEY,
        q: searchQuery,
        page: page,
      },
    }
  );
  //

  return data;
};
