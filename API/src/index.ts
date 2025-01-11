import { app } from './server';
import logger from './library/logger';
import *  as process from 'process';
const port = process.env.SERVICE_PORT || 8080;
import { loadRoutes } from './routes';

// checking health
loadRoutes(app);
app.get('/api/v1/live', (req, res) =>
  res.status(200).json({ data: 'hey i am ready to serve', timestamp: new Date().toISOString() }),
);
app.listen(port, () => logger.info(`Server is running on: http:localhost:${port}`));
export default app;
