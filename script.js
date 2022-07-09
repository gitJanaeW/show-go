// fetch('https://spotify23.p.rapidapi.com/user_profile/?id=21gssgncgaiksynw4ely2rkea&playlistLimit=10&artistLimit=10', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

// fetch('https://api.spotify.com/v1/playlists/?id=5kuqeNyuOvOHOaqO6e6mZL&playlistsLimit=10&offset=5', options)
// .then(response => response.json())
// .then(response => console.log(response))
// .catch(err => console.error(err));

// fetch('https://spotify23.p.rapidapi.com/playlist_tracks/?id=37i9dQZF1DX4Wsb4d7NKfP&offset=0&limit=100', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

// const options = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': '53f0ae66afmsh4177e51e813c097p13de2fjsn4bf2206ca6c0',
//         'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
//     }
// };

// fetch('https://spotify23.p.rapidapi.com/search/user/?id=21gssgncgaiksynw4ely2rkea?q=%3CREQUIRED%3E&type=multi&offset=0&limit=10&numberOfTopResults=5', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '53f0ae66afmsh4177e51e813c097p13de2fjsn4bf2206ca6c0',
// 		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
// 	}
// };

// fetch('https://spotify23.p.rapidapi.com/artists/?ids=2w9zwq3AktTeYYMuhMjju8', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '53f0ae66afmsh4177e51e813c097p13de2fjsn4bf2206ca6c0',
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
    }
};
// fetch('https://spotify23.p.rapidapi.com/artists/?ids=2w9zwq3AktTeYYMuhMjju8', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));
fetch('https://spotify23.p.rapidapi.com/user_profile/?id=21gssgncgaiksynw4ely2rkea&playlistLimit=10&artistLimit=10', options)
    .then(response => response.json())
    .then(response => console.log(response.public_playlists[0].uri.slice(17)))
    .catch(err => console.error(err));
// fetch('https://spotify23.p.rapidapi.com/playlist_tracks/?id=6E2sF3ikgXfa6n5VykRQI8&offset=0&limit=100', options)
//  .then(response => response.json())
//  .then(response => console.log(response))
//  .catch(err => console.error(err));
