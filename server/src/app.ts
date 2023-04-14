import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import postsRoutes from './routes/posts.routes';


const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use(postsRoutes);

export default app;