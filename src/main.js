import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


import { fetchFotoByQuery } from "./js/pixabay-api";
import { createGalleryMarkUp } from "./js/render-function";

const galleryEl = document.querySelector('.js-gallery');
const searchFormEl = document.querySelector('.js-search-form');
const loaderEl = document.querySelector('.js-loader');

function onSearchFormSabmit(event) {
    event.preventDefault();
    const searhQuery = event.target.elements.searchKeyword.value.trim();
    if (searhQuery === "") {
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

    fetchFotoByQuery(searhQuery).then(ImageData => {
        if (ImageData.hits.length === 0) {
            iziToast.show({
                    message: "Sorry, there are no images matching your search query. Please try again!",
                    position: 'center',
                    timeout: 2000,
                    color: 'red',
                });
        }
        galleryEl.innerHTML = createGalleryMarkUp(ImageData.hits)
        let gallery = new SimpleLightbox('.card a');
        gallery.refresh();
    })
        
        .catch(error => console.log(error))
        .finally(() => {
            event.target.reset();
            loaderEl.classList.add('is-hidden')
    })
}


searchFormEl.addEventListener('submit', onSearchFormSabmit)