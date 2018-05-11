// URL: https://api.themoviedb.org/3/movie/550?api_key=4596c01cc129c0cbf8d2d1ac4cf4b6fe
// KEY: 4596c01cc129c0cbf8d2d1ac4cf4b6fe
// USERNAME: LiYingCodes
// PW:juliying
// DEVLINK: https://developers.themoviedb.org/3/discover/tv-discover



// Put this as parameter in app.getTV function app.getTV = function (genre, year)   

// Use filter method to filter top 3 choices


//Main app object
const app = {};
//Declaring properties that will be reused
app.baseURL = 'https://api.themoviedb.org/3';
app.apiKey = '4596c01cc129c0cbf8d2d1ac4cf4b6fe';

// Method for requesting information from MovieDB API
app.getTV = function (selectedGenre, selectedYear){
    $.ajax({
        url: `${app.baseURL}/discover/tv`,
        method: "GET",
        dataType: "json",
        data: {
        api_key: app.apiKey,
        language: "en-US",
        sort_by: "popularity.desc",
        with_genres: selectedGenre, // genre parameter
        first_air_date_year: selectedYear // year parameter
    }
}).then(res => {
    const tvObjects = res.results;
    const topThree = tvObjects.slice(1,4);
    $('.rec').html(`<h1>What about...</h1>`)
    app.displayTV(topThree);
});
};


// Use the method tv.forEach(tvShow) to run through object and take specific information: tvShow.title, tvShow.poster_path, tvShow.overview, tvShow.release_date
// Display all information in array onto HTML
// Method to display objects
app.displayTV = function (tv) {
    tv.forEach((tvShow) => {
        const $poster = $('<img class="image-container">')
            .attr('src', `https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`);
        const $title = $('<h2>').text(tvShow.name);
        const $overview = $('<p>').text(tvShow.overview);
        const $released = $('<h3>').text(tvShow.first_air_date);
        const $TVContainer = $('<div>').append($poster, $title, $released, $overview);
        $('#tv-results').append($TVContainer);
    })
    // console.log($TVContainer);
    
};
// let selectedGenre;
// let selectedYear;

// Event listeners to retrieve user input for parameters: genre and year
app.events = function () {
    $('.form').on('submit', function (e) {
        // Prevent page refresh on submit
        e.preventDefault();
        // Collect user input for genre and store in variable called selectedGenre
        const selectedGenre = $('input[name=genre]:checked').val();   
        // console.log(selectedGenre);
        // Collect user input for year and store in variable called selectedYear    
        const selectedYear = $('.yearForm:not(.hidden)').val();
        // console.log(selectedYear);       
        
        app.getTV(selectedGenre, selectedYear);

        $('.form').hide();
    });

// Toggle the class of hidden on the year dropdown corresponding to the decade dropdown
$('#decadeForm').change(function () {
        let val = $('#decadeForm').val();
        $(".yearForm").addClass("hidden");
        if (val) {
            $('#year' + val).toggleClass("hidden");
        }
    });
}

// STRETCH GOALS - GETTING SIMILAR TITLES (get similar TV shows method url: https://developers.themoviedb.org/3/tv/get-similar-tv-shows)
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
    // app.getTV();
});



// "genres": {
//     Comedy: 35,
//     Drama: 18,
//     Family: 10751,
//     Romance: 10749,
//     Science Fiction: 878,
//     Thriller : 53
// }