import express from 'express';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import YAML from 'yaml';
import cors from 'cors';

import listRouter from './routes/lists';
import detailsRouter from './routes/details';

import { axiosErrorHandler, errorHandler, logErrors } from './middlewares/error.handler';


const file = fs.readFileSync('./swagger.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);

const app = express();
// middleware transform from req.body to json
app.use(express.json())
// enable cors
app.use(cors());

const port = process.env.PORT || 3000;


app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', detailsRouter);
app.use('/api/list', listRouter);


//middlewares error
app.use(logErrors);
app.use(axiosErrorHandler);
app.use(errorHandler);

// start server
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
