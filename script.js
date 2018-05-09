// URL: https://api.themoviedb.org/3/movie/550?api_key=4596c01cc129c0cbf8d2d1ac4cf4b6fe
// KEY: 4596c01cc129c0cbf8d2d1ac4cf4b6fe
// USERNAME: LiYingCodes
// PW:juliying
// DEVLINK: https://developers.themoviedb.org/3/discover/tv-discover



// Put this as parameter in app.getTV function app.getTV = function (genre, year)   
// Create method to display objects app.displayTV(), this takes parameter of tv
// Use the method tv.map(tvShow) to run through object and take specific information: tvShow.title, tvShow.poster_path, tvShow.overview, tvShow.release_date AND create new array with this information.
// Use filter method to filter top 3 choices
// Display all information in array onto HTML


//Main app object
const app = {};
//Declaring properties that will be reused
app.baseURL = 'https://api.themoviedb.org/3';
app.apiKey = '4596c01cc129c0cbf8d2d1ac4cf4b6fe';

app.getTV = function (){
    $.ajax({
      url: `${app.baseURL}/discover/tv`,
      method: "GET",
      dataType: "json",
      data: {
        api_key: app.apiKey,
        language: "en-US",
        sort_by: "popularity.desc",
        with_genre: 35, // genre parameter
        first_air_date_year: 2009 // year parameter
      }
    }).then(res => {
      const tvObjects = res;
      console.log(tvObjects);
    });
};


// Create event listeners that retrieve user input for both parameters
app.events = function () {
// Create event listener for $('.genreForm').on('submit', function () {}); 
// Collect user input for genre and store in variable called selectedGenre
// const selectedGenre = $(this).val()
$(".genreForm").on("submit", function(e) {
    e.preventDefault();
    const selectedGenre = $('input[name=genre]:checked').val();
    // console.log(selectedGenre);
});
// Create event listener for $('.yearForm').on('submit', function () {});
// Collect user input for year and store in variable called selectedYear
// const selectedYear = $(this).val()
$(".yearForm").on("submit", function(e) {
    e.preventDefault();
    const selectedYear = $($("input[name=year]:checked")).val();
    // console.log(selectedYear);
});
}


// STRETCH GOALS PORTION - GETTING SIMILAR TITLES (get similar TV shows method url: https://developers.themoviedb.org/3/tv/get-similar-tv-shows)

app.getSimilar = function(tv_id){
    return $.ajax({
        url: `${baseURL}/tv/${tv_id}/similar`,
        method: 'GET',
        dataType: 'json',
        data: {
            api_key: app.apiKey,
            tv_id: `${tv_id}`
        }
    })
};





// Init method for storing methods needed on initial load
app.init = function () {
   app.getTV();
   app.events();
};

// Document ready
$(function () {
    app.init();
});



// "genres": {
//     Comedy: 35,
//     Drama: 18,
//     Family: 10751,
//     Romance: 10749,
//     Science Fiction: 878,
//     Thriller : 53
// }