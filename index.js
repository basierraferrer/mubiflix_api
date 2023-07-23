const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const YAML = require('yaml');

const axios = require('axios');
const { buildURL, getArrayMovieInfo, getMovieDetail } = require('./utils/utils');

const file = fs.readFileSync('./swagger.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);


const app = express();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('Mubiflix API');
});

app.get('/nowplaying:offset', async (req, res) => {
  try {
    const offset = parseInt(req.params.offset);
    const response = await axios.get(buildURL('now_playing'));
    const results = response.data.results;
    let movies = [];

    if (!offset) {
      movies = getArrayMovieInfo(results);
    } else {
      movies = getArrayMovieInfo(results.slice(0, offset));
    }

    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las películas destacadas' });
  }
});


app.get('/toprated', async (req, res) => {
  try {
    const response = await axios.get(buildURL('top_rated'));
    const movies = getArrayMovieInfo(response.data.results); // Suponiendo que el servicio externo devuelve un array de películas
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las mejores películas calificadas' });
  }
});


app.get('/mostpopular', async (req, res) => {
  try {
    const response = await axios.get(buildURL('popular'));
    const movies = getArrayMovieInfo(response.data.results); // Suponiendo que el servicio externo devuelve un array de películas
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las películas más populares' });
  }
});


app.get('/detail/:id', async (req, res) => {
  try {
    const movieId = parseInt(req.params.id);
    const response = await Promise.all([
      axios.get(buildURL(movieId)),
      axios.get(buildURL(`${movieId}/credits`)),
    ]);
    res.json(getMovieDetail(response));
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el detalle de la pelicula' });
  }
});



// start server
app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});
