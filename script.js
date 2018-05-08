// URL: https://api.themoviedb.org/3/movie/550?api_key=4596c01cc129c0cbf8d2d1ac4cf4b6fe
// KEY: 4596c01cc129c0cbf8d2d1ac4cf4b6fe
// USERNAME: LiYingCodes
// PW:juliying
// DEVLINK: https://developers.themoviedb.org/3/discover/tv-discover

// Create event listener for $('.genreForm').on('submit', function () {});
    // Collect user input for genre and store in variable called selectedGenre
    // const selectedGenre = $(this).val()
// Create event listener for $('.yearForm').on('submit', function () {});
    // Collect user input for year and store in variable called selectedYear
    // const selectedYear = $(this).val()
// Put this as parameter in app.getTV function app.getTV = function (genre, year)   
// Create method to display objects app.displayTV(), this takes parameter of tv
// Use the method tv.map(tvShow) to run through object and take specific information: tvShow.title, tvShow.poster_path, tvShow.overview, tvShow.release_date AND create new array with this information.
// Use filter method to filter top 3 choices
// Display all information in array onto HTML
// STRETCH GOALS



//Declaring variables that will be reused
// const baseURL = 'https://api.themoviedb.org/3/movie/550?';
// const apiKey = '4596c01cc129c0cbf8d2d1ac4cf4b6fe';

//Main app object
const app = {};

app.getTV = function (){
    $.ajax({
      url: "https://api.themoviedb.org/3/discover/tv",
      method: "GET",
      dataType: "json",
      data: {
        api_key: "4596c01cc129c0cbf8d2d1ac4cf4b6fe",
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

// Init method for storing methods needed on initial load
app.init = function () {
   app.getTV();

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