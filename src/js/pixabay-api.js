import axios from 'axios';

const Base_URL = 'https://pixabay.com/api/';
const KEY_USER = '43953173-48a4f3f757f38a8504babc00c'


export const fetchFotoByQuery = async (query = "happy", page = 1, per_page = 15) => {
    const searchParams = new URLSearchParams({
        key: KEY_USER,
        q: query,
        per_page: per_page,
        image_type: "photo",
        page: page,
        safesearch: true,
        orientation: 'horizontal'
    });
    try {
        const response = await axios.get(`${Base_URL}?${searchParams.toString()}`);
        return response.data;
    }
    catch (error) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    };
}