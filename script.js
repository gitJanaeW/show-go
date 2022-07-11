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
const watchlistBtn = document.querySelector('#heart-icon');
const concertList = document.querySelector(".concert-list");

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

function getConcertValues(concerts) {
    console.log(concerts);
    for (var i = 0; i < 5; i++) {
        // img var
        const ticketImg = concerts._embedded.events[i].images[i].url;
        // time var
        let time = concerts._embedded.events[i].dates.start.localDate;
        const finalTime = moment(time).format("MMM D, YYYY");
        // event name var
        const eventName = concerts._embedded.events[i].name;

        createResults(ticketImg, finalTime, eventName);
    }
}

function createResults(ticketImg, finalTime, eventName) {
    // create DOm elements
    var concertCard = document.createElement("div");
    concertCard.classList = "card";

    var cardContent = document.createElement("div");
    cardContent.classList = "card-content px-0";

    var columns = document.createElement("div");
    columns.classList = "columns";

    var columns = document.createElement("div");
    columns.classList = "columns";

    var blankDiv = document.createElement("div");
    blankDiv.innerHTML = "<div class='card-image'><img class='is-rounded ml-6 mr-4' style='width:275px' src='" + ticketImg + "'></div>";

    var column = document.createElement("div");
    column.classList = "column p-0 mt-4 ml-6";
    var columnClasses = ["title", "title is-4", "subtitle is-6"];
    var columnContent = [eventName, finalTime, "day + time"];
    for (var x = 0; x < columnClasses.length; x++) {
        var columnP = document.createElement("p");
        columnP.classList = columnClasses[x];
        columnP.textContent = columnContent[x];
        column.appendChild(columnP);
    }

    var ticketBtns = document.createElement("div");
    ticketBtns.classList = "p-0 mr-3 is-flex is-flex-direction-column is-justify-content-space-between is-align-items-flex-end";
    var watchlistBtn = document.createElement("button");
    watchlistBtn.classList = "button mt-4 columns mr-6"
    watchlistBtn.setAttribute("type", "submit");
    watchlistBtn.setAttribute("value", "submit input");
    watchlistBtn.setAttribute("id", "heart-icon");
    watchlistBtn.textContent = "♡";

    var buyTicketsBtn = document.createElement("button");
    buyTicketsBtn.classList = "button mr-5 mb-5 is-light is-rounded has-text-centred my-2 p-5";
    buyTicketsBtn.setAttribute("type", "submit");
    buyTicketsBtn.setAttribute("id", "submit-button");
    buyTicketsBtn.textContent = "Buy Tickets";

    var cardImg = document.createElement("div");
    cardImg.classList = "card-image";

    var imgBox = document.createElement("figure");
    imgBox.classList = "image is-8by9";
    imgBox.innerHTML = "<img class='is-rounded' src='./assets/images/aconcert.jpeg'>";

    var textBox = document.createElement("div");
    textBox.classList = "media-content has-text-centered"
    textBox.innerHTML = "<p class='title is-4'>start-enddate</p><p class='subtitle is-6'>weekdaystart-weekday-end</p>"

    // append DOM elements
    concertList.appendChild(concertCard);
    concertCard.appendChild(cardContent);
    cardContent.appendChild(columns);
    columns.appendChild(blankDiv);
    columns.appendChild(column);
    columns.appendChild(ticketBtns);
    ticketBtns.appendChild(watchlistBtn);
    ticketBtns.appendChild(buyTicketsBtn);
}

submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    // console.log(spotIdInp)
    var spotifyID = spotIdInp.value;
    // var location = locationInp.value;
    city = locationInp.value;
    fetchResults(spotifyID);
});

const btn = document.getElementById('heart-icon');

let index = 0;

const colors = ['red', ''];

btn.addEventListener('click', function onClick() {
    btn.style.backgroundColor = colors[index];
    btn.style.color = 'black';

    index = index >= colors.length - 1 ? 0 : index + 1;
});
// var setMyFavorite = function () {
//     var elem = document.getElementById("#heart-icon");
//     //Gets the RGB value
//     var theColor = window.getComputedStyle(elem, null).getPropertyValue("background-color");
//     var hex = rgb2hex(theColor);
//     if (hex == "#555555") {
//         elem.style.backgroundColor = "#ffffff";
//     }
//     else if (hex == "#ffffff") {
//         elem.style.backgroundColor = "#555555";
//     }
//     //Convert RGB to Hex value
//     var rgb2hex = function (rgb) {
//         rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
//         function hex(x) {
//             return ("0" + parseInt(x).toString(16)).slice(-2);
//         }
//         return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
//     }
// }
// btn.addEventListener('click', function onClick() {
//     btn.style.backgroundColor = colors[index];
//     btn.style.color = 'black';

//     index = index >= colors.length - 1 ? 0 : index + 1; // If someone asked us to explain this line of code, would we know how to?
// });

// watchlistBtn.addEventListener("click", function(){
//     watchlistBtn.textContent = "♥"
// });
