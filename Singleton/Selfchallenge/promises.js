const apiKey = '6e465039ebd3e5abf76127a373cf0e08'

async function getMovie(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function getPopularMovies() {
    const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}`
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
}

async function getTopMoviesIds(n = 3) {
    debugger
    const popularMovies = await getPopularMovies()
    const ids = popularMovies.slice(0, n).map(movie => movie.id)
    return ids;
}

// Peticiones en secuencia
document.getElementById("sequence").onclick = async function() {
    const ids = await getTopMoviesIds()
    const URL_IMAGE = 'https://image.tmdb.org/t/p/w300'
    document.getElementById("render").innerHTML = ""
    for (const id of ids) {
        const movies = await getMovie(id)
        document.getElementById("render").insertAdjacentHTML('beforeend', `<li><p>${movies.title}</p></li><img src="${URL_IMAGE}${movies.poster_path}">`);
    }
}

// Peticiones en paralelo
document.getElementById("parallel").onclick = async function() {
    const ids = await getTopMoviesIds()
    const URL_IMAGE = 'https://image.tmdb.org/t/p/w300'
    document.getElementById("render").innerHTML = ""
    const promises = []
    ids.map((id) => {
        promises.push(getMovie(id))
    })
    Promise.all(promises).then(result => {
        for(const movie of result) {
            document.getElementById("render").insertAdjacentHTML('beforeend', `<li><p>${movie.title}</p></li><img src="${URL_IMAGE}${movie.poster_path}">`)
        }
    })


    //let movies = Promise.all(promises).then(response => {document.getElementById("render").insertAdjacentHTML('beforeend', `<li><p>${response.title}</p></li><img src="${URL_IMAGE}${movies.poster_path}">`)});
    
}