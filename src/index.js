import './css/styles.css';
import { fetchPixabay } from './js/fetchPixabay';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.getElementById('search-form');
const searchQuery = document.querySelector('input[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
let boxGallery = new SimpleLightbox('.gallery a');
let searchQueryValue = '';
let page = 1;
const perPage = 40;

btnLoadMore.style.display = 'none';
searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  btnLoadMore.style.display = 'none';
  searchQueryValue = searchForm.elements.searchQuery.value.trim();
  gallery.innerHTML = '';
  page = 1;
  const res = await fetchAndAddPhotos();
  const totalHits = res.totalHits;
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  btnLoadMore.style.display = 'block';
});

function createGalleryCard(galleryData) {
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = galleryData;
  const galleryCard = `
         
            <div class="photo-card">
                <a class="photo-card-link" href="${largeImageURL}"><img class="photo-card-img" src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
                <div class="info">
                    <p class="info-item">
                        <b class="info-txt"><span class="info-txt-bold">Likes:</span>${likes}</b>
                    </p>
                    <p class="info-item">
                        <b class="info-txt"><span class="info-txt-bold">Views:</span>${views}</b>
                    </p>
                    <p class="info-item">
                        <b class="info-txt"><span class="info-txt-bold">Comments:</span>${comments}</b>
                    </p>
                    <p class="info-item">
                        <b class="info-txt"><span class="info-txt-bold">Downloads:</span>${downloads}</b>
                    </p>
                </div>
            </div>
        
    `;
  gallery.insertAdjacentHTML('beforeend', galleryCard);
}

btnLoadMore.addEventListener('click', async event => {
  event.preventDefault();
  page += 1;
  await fetchAndAddPhotos();
});

async function fetchAndAddPhotos() {
  if (searchQueryValue === '') {
    gallery.innerHTML = '';
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  const res = await fetchPixabay(searchQueryValue, page, perPage);
  const totalHits = res.totalHits;

  if (totalHits === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  const totalPhoto = page * perPage;
  if (totalPhoto >= totalHits) {
    btnLoadMore.style.display = 'none';
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }
  res.hits.forEach(element => {
    createGalleryCard(element);
  });
  boxGallery.refresh();
  return res;
}
