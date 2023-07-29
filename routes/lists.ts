import express from 'express';
import { getMostPopular, getNowPlaying, getTopRated } from '../services/tmdb';
import { getArrayMovieInfo } from '../utils/utils';


const router = express.Router();

router.get('/nowplaying/:offset', async (req, res, next) => {
  try {
    const offset = parseInt(req.params.offset);
    const results = await getNowPlaying();
    let movies = [];

    if (!offset) {
      movies = getArrayMovieInfo(results);
    } else {
      movies = getArrayMovieInfo(results.slice(0, offset));
    }

    res.json(movies);
  } catch (error) {
    next(error);
  }
});


router.get('/toprated', async (_req, res, next) => {
  try {
    const response = await getTopRated();
    const movies = getArrayMovieInfo(response);
    res.json(movies);
  } catch (error) {
    //res.status(500).send('Error trying to get list top rated from TMDB');
    next(error);
  }
});


router.get('/mostpopular', async (_req, res, next) => {
  try {
    const response = await getMostPopular();
    const movies = getArrayMovieInfo(response);
    res.json(movies);
  } catch (error) {
    //res.status(500).send('Error trying to get list most popular from TMDB');
    next(error)
  }
});

export default router;
