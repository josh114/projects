import express from 'express';
import cors from 'cors';
import projectRouter from './src/project/projectRoutes.js';


const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/project', projectRouter);


export default app;
