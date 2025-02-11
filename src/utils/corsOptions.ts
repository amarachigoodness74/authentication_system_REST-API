import { CorsOptions } from 'cors';

const allowedOrigins = ['http://127.0.0.1:5500', 'http://localhost:3000'];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like tests) or from allowed origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed'), false);
    }
  },
  optionsSuccessStatus: 200,
};

export default corsOptions;
