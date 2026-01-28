import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './pixabay-api';
import { createGalleryMarkup } from './render-functions';
import './css/styles.css';

const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loaderBackdropEl = document.querySelector('.loader-backdrop');
const loadingTextEl = document.getElementById('loadingText');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function showLoader() {
  if (loadingTextEl) loadingTextEl.classList.add('is-visible');

  if (loaderBackdropEl) {
    loaderBackdropEl.classList.remove('is-hidden');
    loaderBackdropEl.setAttribute('aria-hidden', 'false');
  }
}

function hideLoader() {
  if (loadingTextEl) loadingTextEl.classList.remove('is-visible');

  if (loaderBackdropEl) {
    loaderBackdropEl.classList.add('is-hidden');
    loaderBackdropEl.setAttribute('aria-hidden', 'true');
  }
}

function clearGallery() {
  galleryEl.innerHTML = '';
}

function notifyEmptyQuery() {
  iziToast.warning({
    message: 'Please enter a search query.',
    position: 'topRight',
  });
}

function notifyNoResults() {
  iziToast.info({
    message:
      'Sorry, there are no images matching your search query. Please try again!',
    position: 'topRight',
  });
}

function notifyError() {
  iziToast.error({
    message: 'Something went wrong. Please try again later.',
    position: 'topRight',
  });
}

formEl.addEventListener('submit', e => {
  e.preventDefault();

  const query = e.currentTarget.elements.query.value.trim();

  if (!query) {
    clearGallery();
    notifyEmptyQuery();
    return;
  }

  clearGallery();
  showLoader();

  fetchImages(query)
    .then(hits => {
      if (!hits.length) {
        notifyNoResults();
        return;
      }

      const markup = createGalleryMarkup(hits);

      galleryEl.insertAdjacentHTML('beforeend', markup);

      lightbox.refresh();
    })
    .catch(() => {
      notifyError();
    })
    .finally(() => {
      hideLoader();
      formEl.reset();
    });
});
