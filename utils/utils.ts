import dotenv from 'dotenv';
import { Cast, Results } from "../types/movie";
dotenv.config();

const URL = process.env.API_URL || 'apiurl';
const API_KEY = process.env.API_KEY || 'someApiKey';

/**
 * @function buildURL
 * This function returns the URL that we need to execute to request data from the API at https://www.themoviedb.org/
 * @param path value of the path that complements the URL to be return
 * @returns URL to use in axios
 */
function buildURL(path: any) {
    return `${URL}/${path}?api_key=${API_KEY}`;
}

/**
 * @function getMovieInfo
 * This function transforms the movie data from the API at https://www.themoviedb.org/ into the structure required by Mubiflix.
 * @param resultData movie data obtained from the API at https://www.themoviedb.org/
 * @returns the movie data structure to be used in the Mubiflix app
 */
function getMovieInfo(resultData: any) {
    const movies = {
        id: resultData.id,
        genres: getGenres(resultData.genres),
        overview: resultData.overview,
        pathBackgroud: resultData.backdrop_path,
        posterPath: resultData.poster_path,
        releaseYear: new Date(resultData.release_date).getFullYear().toString(),
        runtime: resultData.runtime,
        score: resultData.vote_average,
        title: resultData.title,
    }
    return movies;
}

/**
 * @function getGenres
 * This function returns a concat string of all genres applied on a movie
 * @param results movie data obtained from the API at https://www.themoviedb.org/
 * @returns genres structure to be used as complement of movie info detail in the Mubiflix app
 */
function getGenres(results: Results) {
    const genres: string[] = [];
    if (!!results && results.length) {
        results.forEach(item => genres.push(item.name));
    }

    return genres.join(', ');
}

/**
 * @function transformCharacter
 * This function transforms the 'character' data from the API at https://www.themoviedb.org/
 * and replaces forward slash ('/') or hyphen ('-') characters with a line break character ('\n')
 * to better fit the Mubiflix app interface.
 * Example:
 * I: Spider-Man / Miles Morales
 * O: Spider-Man \n Miles Morales
 * 
 * @param character obtained from the API at https://www.themoviedb.org/ 
 * @returns transform string
 */
function transformCharacter(character = '') {
    // Expresión regular para buscar "/" o "-"
    const regex = /( )+[\/-]+( )/g;
    return character.replace(regex, ' \n ');
}

/**
 * @function getMovieCast
 * This function returns a list of actors participating in the movie with the structure required by Mubiflix.
 * @param results movie data obtained from the API at https://www.themoviedb.org/
 * @returns A list with the structure of the actors who participated in the movie
 */
function getMovieCast(results: Results) {
    const cast: Cast[] = [];

    if (!!results && results.length) {
        results.forEach((item: any) => {
            cast.push({
                character: transformCharacter(item.character),
                name: item.name,
                pathImage: item.profile_path ?? '',
            });
        });
    }

    return cast;
}

/**
 * @function getMovieDetail
 * This function creates the movie detail structure for Mubiflix based on the data obtained from the API at https://www.themoviedb.org/
 * @param results movie data obtained from the API at https://www.themoviedb.org/
 * @returns The movie detail structure defined by Mubiflix
 */
function getMovieDetail(results: Results) {
    const movieDetail = {
        ...getMovieInfo(results[0].data),
        cast: getMovieCast(results[1].data.cast),
    }

    return movieDetail;
}

/**
 * @function getArrayMovieInfo
 * This function creates an array of the movie detail structure for Mubiflix based on the data obtained from the API at https://www.themoviedb.org/
 * @param results movie data obtained from the API at https://www.themoviedb.org/
 * @returns Array of The movie detail structure defined by Mubiflix
 */
function getArrayMovieInfo(results: Results) {
    if (results.length) {
        return results.map((item) => getMovieInfo(item));
    }

    return [];
}

export {
    buildURL,
    getArrayMovieInfo,
    getMovieDetail,
    getMovieInfo
}
