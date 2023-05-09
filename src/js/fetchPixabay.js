import axios from 'axios';

const BASE_URL = `https://pixabay.com/api/`;
const searchParams = new URLSearchParams({
    key: '36215378-6c8e338d573220a39b2f02086',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
});

// export function fetchPixabay(q) {
//     searchParams.append('q', q)
//     const url = `${BASE_URL}?${searchParams}`;
//     return fetch(url)
//         .then(response => {
//             console.log(response);
//             if (response.ok) return response.json() 
//             throw new Error(response.status);
//         });
// };

export async function fetchPixabay(q) {
    searchParams.append('q', q)
    const url = `${BASE_URL}?${searchParams}`;
    const res = await axios.get(url);
    return res.data;
}