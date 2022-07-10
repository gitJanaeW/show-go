// SONJA'S SPOTIFY ID FOR TESTING
// 21gssgncgaiksynw4ely2rkea
// VARIABLES
// getting HTML elements
const navbarBurger = document.querySelector(".navbar-burger");
const navDropdown = document.querySelector("#nav-dropdown");
const navbarItem = document.querySelector(".navbar-item");
const spotIdInp = document.querySelector("#spotify-username");
const locationInp = document.querySelector("#location");
const submitBtn = document.querySelector("#submit-button");
const btn = document.getElementById('heart-icon');

// misc
let city = "";
let index = 0;
const colors = ['red', ''];

// ticket master genres
let tmGenres = {
    alternative: "KnvZfZ7vAvv",
    ballads: "KnvZfZ7vAve",
    romantic: "KnvZfZ7vAve",
    blues: "KnvZfZ7vAvd",
    "chanson francaise": "KnvZfZ7vAvA",
    "children's music": "KnvZfZ7vAvk",
    classical: "KnvZfZ7vAeJ",
    country: "KnvZfZ7vAv6",
    "dance/electronic": "KnvZfZ7vAvF",
    folk: "KnvZfZ7vAva",
    "hip-hop": "KnvZfZ7vAv1",
    rap: "KnvZfZ7vAv1",
    holiday: "KnvZfZ7vAvJ",
    jazz: "KnvZfZ7vAvE",
    latin: "KnvZfZ7vAJ6",
    "medieval/Renaissance": "KnvZfZ7vAvI",
    metal: "KnvZfZ7vAvt",
    "new age": "KnvZfZ7vAvn",
    other: "KnvZfZ7vAvl",
    pop: "KnvZfZ7vAev",
    "r&b": "KnvZfZ7vAee",
    reggae: "KnvZfZ7vAed",
    religious: "KnvZfZ7vAe7",
    rock: "KnvZfZ7vAeA",
    undefined: "KnvZfZ7vAe6",
    world: "KnvZfZ7vAeF"
};
// spotify api key
const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": "1f43d66821mshd84ba78416fea1bp1371a7jsn4400a674f71b",
        "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
};
function fetchResults(spotifyID, location) {
    console.log(spotifyID)
    // spotify user playlist fetch
    fetch(
        "https://spotify23.p.rapidapi.com/user_profile/?id=" + spotifyID + "&playlistLimit=10&artistLimit=10",
        options
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            let playlist = response.public_playlists[0].uri.slice(17);
            getArtist(playlist);
        });
    // spotify tracks fetch
    function getArtist(id) {
        fetch(
            "https://spotify23.p.rapidapi.com/playlist_tracks/?id=" +
            id +
            "&offset=0&limit=100",
            options
        )
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                getGenre(response.items[0].track.artists[0].id);
            });
    }
    // spotify artist fetch
    function getGenre(artistId) {
        fetch("https://spotify23.p.rapidapi.com/artists/?ids=" + artistId, options)
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                let spotifyGenres = response.artists[0].genres;
                checkGenres(spotifyGenres, tmGenres);
            });
    }
}
// fucntion to see if genres from spotify match with any ticket master genres
function checkGenres(spotifyGenres, tmGenres) {
    let genreOptions = Object.keys(tmGenres);
    for (let i = 0; i < spotifyGenres.length; i++) {
        if (tmGenres[spotifyGenres[i]]) {
            getEvent(tmGenres[genreOptions[i]], city);
            return;
        } else {
            let splitGenres = spotifyGenres[i].split(" ");
            for (let i = 0; i < splitGenres.length; i++) {
                if (tmGenres[splitGenres[i]] + 1) {
                    getEvent(tmGenres[splitGenres[i]], city);
                    return;
                }
            }
        }
    }
}
// ticket master fetch for events by genre id and city
function getEvent(genreId, location) {
    console.log(location)
    var gas =
        "https://app.ticketmaster.com/discovery/v2/events.json?genreId=" +
        genreId +
        "&city=" +
        location +
        "&apikey=pUF7AkmB2U2SWPEbs1grVeUmhITpd9lt";
    fetch(gas)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            getConcertValues(data);
        });
}

function getConcertValues(concerts){
    console.log(concerts);
    // img var
    const ticketImg = concerts._embedded.events[0].images[0].url;
    console.log(ticketImg);
    // time var
    let time = concerts._embedded.events[0].dates.start.localDate;
    const finalTime = moment(time).format("MMM D, YYYY");
    console.log(finalTime);
    // event name var
    const eventName = concerts._embedded.events[0].name;
    console.log(eventName);

    createResults(img, ticketImg, eventName);
}

submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    // console.log(spotIdInp)
    var spotifyID = spotIdInp.value;
    // var location = locationInp.value;
    city = locationInp.value;
    fetchResults(spotifyID);
});

btn.addEventListener('click', function onClick() {
    btn.style.backgroundColor = colors[index];
    btn.style.color = 'black';

    index = index >= colors.length - 1 ? 0 : index + 1; // If someone asked us to explain this line of code, would we know how to?
});