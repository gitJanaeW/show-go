// SONJA'S SPOTIFY ID FOR TESTING
// 21gssgncgaiksynw4ely2rkea

// IMITI'S KEY
// 31csn67tinuymf4dvg7aqwjuueee
// MINE
// 

// VARIABLES
// getting HTML elements
const spotIdInp = document.querySelector("#spotify-username");
const locationInp = document.querySelector("#location");
const submitBtn = document.querySelector("#submit-button");
const watchlistBtn = document.querySelector("#heart-icon");
const concertList = document.querySelector(".concert-list");
const loader = document.querySelector("#loader");
const formBlock = document.querySelector("#event-picker");
const errorText = document.querySelector(".error-text");

// misc
let city = "";
let index = 0;
const colors = ["red", ""];

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
  world: "KnvZfZ7vAeF",
};

// local storage auto input
spotIdInp.value = localStorage.getItem("id");
locationInp.value = localStorage.getItem("city");

// spotify api key
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "2b92fef2bcmsh556664cb99f6a08p1d4c5fjsn24644372ab39",
    "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
  },
};
// fetch user profile
function fetchResults(spotifyID) {
  submitBtn.setAttribute("disabled", "");
  // spotify user playlist fetch
  fetch(
    "https://spotify23.p.rapidapi.com/user_profile/?id=" +
      spotifyID +
      "&playlistLimit=10&artistLimit=10",
    options
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      handlePlaylists(response);
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

  // check if the user has public playlists to grab
  function handlePlaylists(response){
    if("public_playlists" in response){
      let playlist = response.public_playlists[0].uri.slice(17);
      getArtist(playlist);
    }
    else{
      loader.classList = "";
      submitBtn.removeAttribute("disabled");
      errorText.innerHTML = "Please check if you <a class='has-text-warning is-underlined' href='./having-issues.html#find-your-id'>have public playlists</a> or <a class='has-text-warning is-underlined' href='./having-issues.html#sample-username'>test our usernames<a>";
    }
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

// funtion to sort info for the events needed
function getConcertValues(concerts) {
  errorText.textContent = "";
  debugger;
  for (var i = 0; i < concerts._embedded.events.length ||
    concerts._embedded.events[10]; i++) {
    // img var
    const ticketImg = concerts._embedded.events[i].images[i].url;
    // time var
    let time = concerts._embedded.events[i].dates.start.localDate;
    const finalTime = moment(time).format("MMM D, YYYY");
    // event name var
    const eventName = concerts._embedded.events[i].name;
    // purchase url for events
    const buyTicketUrl = concerts._embedded.events[i].url;
    // concert start time
    const startTime = concerts._embedded.events[i].dates.start.localTime;
    // convert 24 hours to 12 hours
    const timeString12hr = new Date(
      "2022-05-18T" + startTime + "Z"
    ).toLocaleTimeString("en-US", {
      timeZone: "UTC",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    });

    createResults(
      ticketImg,
      finalTime,
      eventName,
      buyTicketUrl,
      timeString12hr
    );
  }
}

// function for creating the individual event cards
function createResults(
  ticketImg,
  finalTime,
  eventName,
  buyTicketUrl,
  timeString12hr
) {
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
  blankDiv.innerHTML =
    "<div class='card-image'><img class='is-rounded ml-6 mr-4' src='" +
    ticketImg +
    "'></div>";

  var column = document.createElement("div");
  column.classList = "column p-0 mt-4 ml-6";
  var columnClasses = ["title", "title is-4", "subtitle is-6"];
  var columnContent = [
    eventName,
    finalTime,
    "Doors open at " + timeString12hr + "!",
  ];
  for (var x = 0; x < columnClasses.length; x++) {
    var columnP = document.createElement("p");
    columnP.classList = columnClasses[x];
    columnP.textContent = columnContent[x];
    column.appendChild(columnP);
  }

  var ticketBtns = document.createElement("div");
  ticketBtns.classList =
    "p-0 mr-3 is-flex is-flex-direction-column is-justify-content-space-between is-align-items-flex-end";
  var buyTicketsBtn = document.createElement("button");
  buyTicketsBtn.classList =
    "button mr-5 mb-5 is-light is-rounded has-text-centred my-2 p-5";
  buyTicketsBtn.setAttribute("type", "button");
  buyTicketsBtn.setAttribute("id", "submit-button");
  buyTicketsBtn.setAttribute("onclick", "window.open('" + buyTicketUrl + "');");
  buyTicketsBtn.textContent = "Buy Tickets";

  var cardImg = document.createElement("div");
  cardImg.classList = "card-image";

  var imgBox = document.createElement("figure");
  imgBox.classList = "image is-8by9";
  imgBox.innerHTML =
    "<img class='is-rounded' src='./assets/images/aconcert.jpeg'>";

  var textBox = document.createElement("div");
  textBox.classList = "media-content has-text-centered";
  textBox.innerHTML =
    "<p class='title is-4'>start-enddate</p><p class='subtitle is-6'>weekdaystart-weekday-end</p>";

  // append DOM elements
  concertList.appendChild(concertCard);
  concertCard.appendChild(cardContent);
  cardContent.appendChild(columns);
  columns.appendChild(blankDiv);
  columns.appendChild(column);
  columns.appendChild(ticketBtns);
  ticketBtns.appendChild(buyTicketsBtn);
  loader.className = "";

  // Bring back submit button
  submitBtn.removeAttribute("disabled");
}

function clearResults() {
  while (concertList.firstChild) {
    concertList.removeChild(concertList.firstChild);
  }
}

// event listener to begin the search for events
submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  loader.className = "loader";

  if (concertList.childElementCount) {
    clearResults();
  }
  var spotifyID = spotIdInp.value;
  localStorage.setItem("id", spotifyID);

  city = locationInp.value;
  localStorage.setItem("city", city);

  fetchResults(spotifyID);
});
