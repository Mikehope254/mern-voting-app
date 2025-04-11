require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./models/index').connectDB;

const routes = require('./routes');
const handle = require('./handlers');

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', routes.auth);
app.use('/api/polls', routes.poll);

app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use(handle.error);

connectDB();

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
