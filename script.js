// URL: https://api.themoviedb.org/3/movie/550?api_key=4596c01cc129c0cbf8d2d1ac4cf4b6fe
// KEY: 4596c01cc129c0cbf8d2d1ac4cf4b6fe
// USERNAME: LiYingCodes
// PW:juliying
// DEVLINK: https://developers.themoviedb.org/3/discover/tv-discover



// Put this as parameter in app.getTV function app.getTV = function (genre, year)   

// Use filter method to filter top 3 choices
// Display all information in array onto HTML


//Main app object
const app = {};
//Declaring properties that will be reused
app.baseURL = 'https://api.themoviedb.org/3';
app.apiKey = '4596c01cc129c0cbf8d2d1ac4cf4b6fe';

app.getTV = function (selectedGenre, selectedYear){
    console.log(selectedGenre, selectedYear);
    
    $.ajax({
      url: `${app.baseURL}/discover/tv`,
      method: "GET",
      dataType: "json",
      data: {
        api_key: app.apiKey,
        language: "en-US",
        sort_by: "popularity.desc",
        with_genre: selectedGenre, // genre parameter
        first_air_date_year: selectedYear // year parameter
      }
    }).then(res => {
        const tvObjects = res.results;
      console.log(tvObjects);
        app.displayTV(tvObjects);

    });
};


// Create method to display objects app.displayTV(), this takes parameter of tv
// Use the method tv.map(tvShow) to run through object and take specific information: tvShow.title, tvShow.poster_path, tvShow.overview, tvShow.release_date AND create new array with this information.
app.displayTV = function (tv) {
    tv.forEach((tvShow) => {
        const $poster = $('<img>').attr('src', tvShow.poster_path.url);
        const $title = $('<h2>').text(tvShow.title);
        const $overview = $('<p>').text(tvShow.overview);
        const $released = $('<h3>').text(tvShow.release_date);
        const $TVContainer = $('<div>').append($poster, $title, $overview, $released);
        $('#tv-results').append($TVContainer);
    })
};
// Create event listeners that retrieve user input for both parameters
app.events = function () {


// Create event listener for $('.genreForm').on('submit', function () {}); 
// Collect user input for genre and store in variable called selectedGenre
    let selectedGenre
$(".genreForm").on("submit", function(e) {
    e.preventDefault();
    selectedGenre = $('input[name=genre]:checked').val();
    console.log(selectedGenre);
});
// Create event listener for $('.yearForm').on('submit', function () {});
// Collect user input for year and store in variable called selectedYear

$(".decadeForm").on("change", function() {
    console.log($(this).val());
    
    if ($(this).val() === "80") {
        $(".80").toggleClass("hidden");
    }
    if ($(this).val() === "90") {
        $(".90").toggleClass("hidden");
        // $(".80").hide(".80");
    } 
    if ($(this).val() === "2000") {
        $(".2000").toggleClass("hidden");
        // $(".90").remove(".90");
    } 
    if ($(this).val() === "2010") {
        $(".2010").toggleClass("hidden");
        // $(".2000").remove(".2000");
    }
});
    let selectedYear;
$(".yearForm").on("change", function() {
    // const selectedYear = $(".yearForm option:selected").val();
     selectedYear = $(this).val();
    // console.log(selectedYear);
    app.getTV(selectedGenre, selectedYear);
});

}



// Toggle the class of hidden on the year dropdown corresponding to the decade dropdown 




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