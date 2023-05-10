import axios from 'axios';

const BASE_URL = `https://pixabay.com/api/`;
const searchParams = new URLSearchParams({
    key: '36215378-6c8e338d573220a39b2f02086',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
});

export async function fetchPixabay(q, page, perPage) {
    searchParams.append('q', q)
    searchParams.append('page', page)
    searchParams.append('per_page', perPage)
    const url = `${BASE_URL}?${searchParams}`;
    const res = await axios.get(url);
    return res.data;
}