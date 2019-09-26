import usersRouter from '../routes/users';
import photosRouter from '../routes/photos';
import authRoute from '../routes/auth';
import cors from 'cors';
import morgan from 'morgan';
import express, { json } from 'express';
const app = express();

const corsOptions = {
	exposedHeaders: 'authToken'
};

// settings
app.set('port', process.env.PORT || 3001);

// middlewares
let morganFormat;
process.env.NODE_ENV === 'development' ? (morganFormat = 'dev') : (morganFormat = 'common');
app.use(morgan(morganFormat));
app.use('/public/uploads/', express.static('public/uploads'));
app.use(json());
app.use(cors(corsOptions));

// routes
app.use('/api/users', usersRouter);
app.use('/api/photos', photosRouter);
app.use('/api/auth', authRoute);

export default app;
