const BASE_URL = 'https://pixabay.com/api/';
const KEY = '27289011-631f37c1ff3a5cbdb3c134909';
const IMAGE_TYPE = 'photo';
const ORIENTATION = 'horizontal';
const SAFE_SEARCH = 'true';
const PER_PAGE = 12;

export function fetchImagesAPI(searchQuery, page) {
  const url = `${BASE_URL}?key=${KEY}&q=${searchQuery}&image_type=${IMAGE_TYPE}&orientation=${ORIENTATION}&safesearch=${SAFE_SEARCH}&page=${page}&per_page=${PER_PAGE}`;

  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(
      new Error(`There is no images with "${searchQuery}" query`)
    );
  });
}
