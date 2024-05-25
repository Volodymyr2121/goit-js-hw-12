const Base_URL = 'https://pixabay.com/api/';
const KEY_USER = '43953173-48a4f3f757f38a8504babc00c'

 export const fetchFotoByQuery =(query = "happy") => {
     const searchParams = new URLSearchParams({
         key: KEY_USER,
         q: query,
         per_page: 21,
         image_type: "photo",
         safesearch: true,
orientation: 'horizontal'
     });

     return fetch(`${Base_URL}?${searchParams}`).then(response => {
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            return response.json();
        });
};


