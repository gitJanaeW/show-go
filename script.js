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

// location
let city = "ottawa";
// spotify api key
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "1f43d66821mshd84ba78416fea1bp1371a7jsn4400a674f71b",
    "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
  },
};
// spotify user playlist fetch
fetch(
  "https://spotify23.p.rapidapi.com/user_profile/?id=21gssgncgaiksynw4ely2rkea&playlistLimit=10&artistLimit=10",
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
function getEvent(genreId, city) {
  var gas =
    "https://app.ticketmaster.com/discovery/v2/events.json?genreId=" +
    genreId +
    "&city=" +
    city +
    "&apikey=pUF7AkmB2U2SWPEbs1grVeUmhITpd9lt";
  fetch(gas)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

const navbarBurger = document.querySelector(".navbar-burger");
const navDropdown = document.querySelector("#nav-dropdown");
const navbarItem = document.querySelector(".navbar-item");
document.addEventListener("click", function () {
  navbarBurger.classList.toggle("is-active");
  navDropdown.classList.toggle("is-active");
});
