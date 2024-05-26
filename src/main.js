// import iziToast from "izitoast";
// import "izitoast/dist/css/iziToast.min.css";
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";


// import { fetchFotoByQuery } from "./js/pixabay-api";
// import { createGalleryMarkUp } from "./js/render-function";

// const galleryEl = document.querySelector('.js-gallery');
// const searchFormEl = document.querySelector('.js-search-form');
// const loaderEl = document.querySelector('.js-loader');
// const loadMoreBtn = document.querySelector('.js-load-more');

// let searchQuery = '';
// let page = 1;
// let totalPages = 0;
// const perPage = 15;

// const onSearchFormSubmit = async event => {
//     event.preventDefault();
//     const searchQuery = event.target.elements.searchKeyword.value.trim();
//     if (searchQuery === "") {
//         galleryEl.innerHTML = '';
//         event.target.reset();
//         iziToast.show({
//             message: 'Input field cannot be empty',
//             position: 'center',
//             timeout: 2000,
//             color: 'red',
//         });
//         return;
//     }

//     galleryEl.innerHTML = '';
//     loaderEl.classList.remove('.is-');
//     loadMoreBtn.classList.add('.d-none');

//     try {
//         const ImageData = await fetchFotoByQuery(searchQuery, page);
//         totalPages = Math.ceil(ImageData.totalHits / perPage);
//         createdImages(ImageData);
//         if (totalPages > 1) {
//             loadMoreBtn.classList.remove('.is-hidden');
//         };
//     } finally {
//         loaderEl.classList.add('.is-hidden');
//     };
// };

// const loadMoreImages = async () => {
//     loaderEl.classList.remove('.is-hidden');
//     try {
//         const imagesData = await fetchFotoByQuery(searchQuery, page + 1);
//         createdImages(imagesData, true);
//         page += 1;
//         if (page >= totalPages) {
//             loadMoreBtn.classList.add('.is-hidden');
//             iziToast.show({
//                 message: 'You have reached the end result',
//                 position: 'topRight',
//                 timeout: 2000,
//                 color: 'blue',
//             });
//         };
//     } catch (error) {
//         iziToast.show({
//             message: 'Search params is not valid',
//             position: 'topRight',
//             timeout: 2000,
//             color: 'red',
//         });
//     } finally {
//         loaderEl.classList.add('.is-hidden');
//     }
// };

// const createdImages = (imagesData, append = false) => {
//     if (imagesData.hits.length === 0) {
//         iziToast.show({
//             message: "Sorry, there are no images matching your search query. Please try again!",
//             position: 'center',
//             timeout: 2000,
//             color: 'red',
//         });
//         galleryEl.innerHTML = '';
//         return;
//     };

//     const markup = createGalleryMarkUp(imagesData.hits);
//     if (append) {
//         galleryEl.insertAdjacentHTML('beforeend', markup);
//     } else {
//         galleryEl.innerHTML = markup;
//     };
//     const gallery = new SimpleLightbox('.card a');
//     gallery.refresh();

//  const smoothScrollOnLoadMore = () => {
//     const lastArticle = galleryEl.querySelector('.card');
//     const newsArticleHeight = lastArticle.getBoundingClientRect().height;
//     const scrollHeight = newsArticleHeight * 2;
//     console.log(scrollHeight);

//     window.scrollBy({
//         top: scrollHeight,
//          left: 0,
//         behavior: 'smooth',
//     });
//  };
// };

// searchFormEl.addEventListener('submit', onSearchFormSubmit)
// loadMoreBtn.addEventListener('click', loadMoreImages);


import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchFotoByQuery } from "./js/pixabay-api";
import { createGalleryMarkUp } from "./js/render-function";

const galleryEl = document.querySelector('.js-gallery');
const searchFormEl = document.querySelector('.js-search-form');
const loaderEl = document.querySelector('.js-loader');
const loadMoreBtn = document.querySelector('.js-load-more');

let searchQuery = '';
let page = 1;
let totalPages = 0;
const perPage = 15;

const onSearchFormSubmit = async event => {
    event.preventDefault();
    searchQuery = event.target.elements.searchKeyword.value.trim();
    if (searchQuery === "") {
        galleryEl.innerHTML = '';
        event.target.reset();
        iziToast.show({
            message: 'Input field cannot be empty',
            position: 'center',
            timeout: 2000,
            color: 'red',
        });
        return;
    }

    galleryEl.innerHTML = '';
    loaderEl.classList.remove('is-hidden');
    loadMoreBtn.classList.add('is-hidden');
    page = 1;

    try {
        const imageData = await fetchFotoByQuery(searchQuery, page);
        totalPages = Math.ceil(imageData.totalHits / perPage);
        createdImages(imageData);
        if (totalPages > 1) {
            loadMoreBtn.classList.remove('is-hidden');
        }
    } catch (error) {
        iziToast.show({
            message: 'Search params are not valid',
            position: 'center',
            timeout: 2000,
            color: 'red',
        });
    } finally {
        loaderEl.classList.add('is-hidden');
    }
};

const loadMoreImages = async () => {
    loaderEl.classList.remove('is-hidden');
    try {
        const imagesData = await fetchFotoByQuery(searchQuery, page + 1);
        createdImages(imagesData, true);
        page += 1;
        if (page >= totalPages) {
            loadMoreBtn.classList.add('is-hidden');
            iziToast.show({
                message: 'You have reached the end of the results',
                position: 'center',
                timeout: 2000,
                color: 'blue',
            });
        }
    } catch (error) {
        console.error('Error fetching photos:', error);
        iziToast.show({
            message: 'Search params are not valid',
            position: 'center',
            timeout: 2000,
            color: 'red',
        });
    } finally {
        loaderEl.classList.add('is-hidden');
    }
};

const createdImages = (imagesData, append = false) => {
    if (imagesData.hits.length === 0) {
        iziToast.show({
            message: "Sorry, there are no images matching your search query. Please try again!",
            position: 'center',
            timeout: 2000,
            color: 'red',
        });
        galleryEl.innerHTML = '';
        loadMoreBtn.classList.add('is-hidden');  // Hide load more button if no images found
        return;
    }

    const markup = createGalleryMarkUp(imagesData.hits);
    if (append) {
        galleryEl.insertAdjacentHTML('beforeend', markup);
    } else {
        galleryEl.innerHTML = markup;
    }

    const gallery = new SimpleLightbox('.card a');
    gallery.refresh();
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtn.addEventListener('click', loadMoreImages);
