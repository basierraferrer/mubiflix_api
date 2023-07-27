import express from 'express';
import { getDetails } from '../services/tmdb';
import { getMovieDetail } from '../utils/utils';

const router = express.Router();


router.get('/detail/:id', async (req, res) => {
  try {
    const movieId = parseInt(req.params.id);
    const results = await getDetails(movieId);
    res.json(getMovieDetail(results));
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el detalle de la pelicula' });
  }
});

export default router;
