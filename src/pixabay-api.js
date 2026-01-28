const BASE_URL = 'https://pixabay.com/api/';
const KEY = '54359388-9cf15bfeabb0906e8f4ff86d6';

export function fetchImages(query) {
  const url = new URL(BASE_URL);

  url.searchParams.set('key', KEY);
  url.searchParams.set('q', query);
  url.searchParams.set('image_type', 'photo');
  url.searchParams.set('orientation', 'horizontal');
  url.searchParams.set('safesearch', 'true');

  console.log('USING KEY:', KEY);
  console.log('REQUEST URL:', url.toString());

  return fetch(url.toString())
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(data => (Array.isArray(data.hits) ? data.hits : []));
}
