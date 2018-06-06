//Main app object
const app = {};
//Declaring properties that will be reused
app.baseURL = 'https://api.themoviedb.org/3';
app.apiKey = '4596c01cc129c0cbf8d2d1ac4cf4b6fe';

// Hidden items
$('.other').hide();
$('#otherThree').hide();
$('.pick-again').hide();
// Method for requesting information from MovieDB API
app.getTV = function (selectedGenre, selectedYear) {
    $.ajax({
        url: `${app.baseURL}/discover/tv`,
        method: 'GET',
        dataType: 'json',
        data: {
            api_key: app.apiKey,
            language: 'en-US',
            sort_by: 'popularity.desc',
            with_genres: selectedGenre, // genre parameter
            first_air_date_year: selectedYear // year parameter
        }
    })
        .then(async res => {
            const tvObjects = res.results;
            const topThree = tvObjects.slice(1, 4);
            $('.rec').html(`<h1>What about...</h1>`);
            app.displayTV(topThree);
            return topThree;
        })
        .then(topThree => {
            const otherTV = topThree.map(function (value) {
                return value.id;
            });
            return otherTV;
        })
        .then(otherTV => {
            return app.getSimilar(otherTV);
        })
        .then(res => {
            const otherThree = res.slice(1, 4);
            app.displayOtherTV(otherThree);
        });
};

// Display top three results based on genre and year
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
};

// Display top three results that are similar to the top three from above
app.displayOtherTV = function (tv) {
    tv.forEach(tvShow => {
        const $poster = $('<img class="image-container">').attr(
            'src',
            `https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`
        );
        const $title = $('<h2>').text(tvShow.name);
        const $overview = $('<p>').text(tvShow.overview);
        const $released = $('<h3>').text(tvShow.first_air_date);
        const $TVContainer = $('<div>').append($poster, $title, $released, $overview);
        $('#otherThree').append($TVContainer);
    });
};

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
        $('.other').show();
    });

    // Toggle the class of hidden on the year dropdown corresponding to the decade dropdown
    $('#decadeForm').change(function () {
        let val = $('#decadeForm').val();
        $('.yearForm').addClass('hidden');
        if (val) {
            $('#year' + val).toggleClass('hidden');
        }
    });
}

// Event listeners to listen for when user prefers other titles
$('.other').on('click', function () {
    $('.recOthers').html(`<h1>Or maybe...</h1>`);
    $('#otherThree').show();
    $('.pick-again').show();
});


// STRETCH GOALS - GETTING SIMILAR TITLES (get similar TV shows method url: https://developers.themoviedb.org/3/tv/get-similar-tv-shows)
app.getSimilar = function (tv_id) {
    return $.ajax({
        url: `${app.baseURL}/tv/${tv_id}/similar`,
        method: 'GET',
        dataType: 'json',
        data: {
            api_key: app.apiKey,
            tv_id: `${tv_id}`
        }
    }).then(res => {
        return res.results;
    });
};

// Init method for storing methods needed on initial load
app.init = function () {
    app.events();
};

// Document ready
$(function () {
    app.init();
});

