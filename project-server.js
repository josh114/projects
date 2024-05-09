import mongoose from 'mongoose';
import app from './app.js';
import * as dotenv from 'dotenv';
dotenv.config();
const db = process.env.db;
const port = process.env.PORT;
mongoose
  .connect(db)
  .then(() => console.log('DB connected successfully'))
  .catch((err) => {
    console.error(err?.message);
  });

app.listen(port, () => {
  console.log(`server  listening on port ${port}`);
});
