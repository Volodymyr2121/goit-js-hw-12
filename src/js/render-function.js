export const createGalleryMarkUp = (images) => {
    return images.map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads}) => `
        <div class="col">
          <div class="card shadow-sm">
            <a href="${largeImageURL}" class="gallery-link">
              <img src="${webformatURL}" alt="${tags}" class="gallery-img img-fluid" />
            </a>
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center">
                
                <small class="text-body-secondary">Likes ${likes}</small>
                <small class="text-body-secondary">Views ${views}</small>
                <small class="text-body-secondary">Comments ${comments}</small>
              </div>
            </div>
          </div>
        </div>`
    ).join('');
};