import axios from "axios"
import { buildURL } from "../utils/utils"


export const getTopRated = async () => {
  try {
    const response = await axios.get(buildURL('now_playing'))
    return response.data.results;
  } catch (err) {
    throw new Error('Error trying to get list top rated from TMDB');
  }
}
export const getMostPopular = async () => {
  try {
    const response = await axios.get(buildURL('popular'))
    return response.data.results;
  } catch (err) {
    throw new Error('Error trying to get list most popular from TMDB');
  }
}
export const getDetails = async (movieId: number) => {
  try {
    const response = await Promise.all([
      axios.get(buildURL(movieId)),
      axios.get(buildURL(`${movieId}/credits`)),
    ]);
    return response;
  } catch (err) {
    throw new Error('Error trying to get detail of a movie from TMDB');
  }
}
export const getNowPlaying = async () => {
  try {
    const response = await axios.get(buildURL('now_playing'))
    return response.data.results;
  } catch (err) {
    throw new Error('Error trying to get list now playing from TMDB');
  }
}
