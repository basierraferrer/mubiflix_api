import axios, { AxiosError } from "axios"
import { buildURL } from "../utils/utils"


export const getTopRated = async () => {
  try {
    const response = await axios.get(buildURL('now_playing'))
    return response.data.results;
  } catch (err) {
    const error = err as AxiosError;
    throw error;
  }
}

export const getMostPopular = async () => {
  try {
    const response = await axios.get(buildURL('popular'))
    return response.data.results;
  } catch (err) {
    const error = err as AxiosError;
    throw error;
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
    const error = err as AxiosError;
    throw error;
  }
}
export const getNowPlaying = async () => {
  try {
    const response = await axios.get(buildURL('now_playing'))
    return response.data.results;
  } catch (err) {
    const error = err as AxiosError;
    throw error;
  }
}
