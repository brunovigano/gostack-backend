import express from 'express';
import routes from './routes';
import './database';

const app = express();
app.use(express.json());
app.use(routes);

app.listen(4000, () => {
  console.log('🔥 Listening at port 4000!');
});
