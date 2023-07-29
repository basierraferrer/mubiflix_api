import express from 'express';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import YAML from 'yaml';

import listRouter from './routes/lists';
import detailsRouter from './routes/details';



const file = fs.readFileSync('./swagger.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);

const app = express();
// middleware que transforma la req.body a un json
app.use(express.json())

const port = 3000;


app.get('/', (_req, res) => {
  res.redirect('/docs')
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', detailsRouter);
app.use('/api/list', listRouter);

app.get('*', (_req, res) => {
  res.redirect('/docs');
})

// start server
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
