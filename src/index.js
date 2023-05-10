import './css/styles.css';
import { fetchPixabay } from './js/fetchPixabay';
import Notiflix from 'notiflix';

const searchForm = document.getElementById('search-form');
const searchQuery = document.querySelector('input[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');


searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const searchQueryValue = searchForm.elements.searchQuery.value.trim();
    console.log(searchQueryValue);
    gallery.innerHTML = "";
    if (searchQueryValue === '') { 
    gallery.innerHTML = "";
        Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
        );
    return
    }
    const {hits} = await fetchPixabay(searchQueryValue);
    console.log(hits);
    hits.forEach(element => {
        createGallery(element)
    });
});


function createGallery(galleryData) {
    const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = galleryData;
    const galleryCard = `
        <div class="photo-card">
            <img class="photo-card-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
                <p class="info-item">
                    <b class="info-txt"><span>Likes:</span>${likes}</b>
                </p>
                <p class="info-item">
                    <b class="info-txt"><span>Views:</span>${views}</b>
                </p>
                <p class="info-item">
                    <b class="info-txt"><span>Comments:</span>${comments}</b>
                </p>
                <p class="info-item">
                    <b class="info-txt"><span>Downloads:</span>${downloads}</b>
                </p>
            </div>
        </div>
    `
    gallery.insertAdjacentHTML("beforeend", galleryCard)
}
