import axios from "axios";

const apiBaseUrl = 'https://api.themoviedb.org/3';
const apiKey = "bf4a763b189ccc4cd91190cae84597c9";

const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;

const movieDetailsEndpoint = id=> `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
const movieCreditsEndpoint = id=> `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const similarMoviesEndpoint = id=> `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;


export const image500 = posterPath=> posterPath? 'https://image.tmdb.org/t/p/w500'+posterPath : null;
export const image342 = posterPath=> posterPath? 'https://image.tmdb.org/t/p/w342'+posterPath : null;
export const image185 = posterPath=> posterPath? 'https://image.tmdb.org/t/p/w185'+posterPath : null;

export const fallbackMoviePoster = 'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';
export const fallbackPersonImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';

const handleApi = async (endpoint, params)=>{
    const options = {
        method: 'GET',
        url: endpoint,
        params: params? params: {}
    };
    try{
        const response = await axios.request(options);
        return response.data;
    }catch(error){
        console.log('error: ',error);
        return {};
    }
}

export const fetchTrendingMovies = ()=>{
    return handleApi(trendingMoviesEndpoint);
}

export const fetchTopRatedMovies = ()=>{
    return handleApi(topRatedMoviesEndpoint);
}

export const fetchMovieDetails = (id)=>{
    return handleApi(movieDetailsEndpoint(id));
}
export const fetchMovieCredits = (movieId)=>{
    return handleApi(movieCreditsEndpoint(movieId));
}
export const fetchSimilarMovies = (movieId)=>{
    return handleApi(similarMoviesEndpoint(movieId));
}

export const searchMovies = (params)=>{
    return handleApi(searchMoviesEndpoint, params);
}
