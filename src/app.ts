import config from './config';
import express from 'express';
import { httpContextMiddleware } from './middlewares/httpContextMiddleware';
import { registerRoutes } from './routes';

const app = express();

app.use(httpContextMiddleware);
app.use(express.json());
registerRoutes(app);

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
