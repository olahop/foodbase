const express = require('express');
const mongoose = require('mongoose');

// routes
const foodRouter = require('./routes/food');
const setupRouter = require('./routes/setup');

// express initiation
const app = express();

// connecting to the database
mongoose.connect('mongodb://localhost:27017/prosjekt3', { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.then(
  () => console.log('DB Connected!')
);

// express configurations
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT')
  next();
});

// API routes
app.use('/api/food', foodRouter);
app.use('/api/setup', setupRouter);

// Test route
app.get('/', (req, res) => {
  res.send('Server running!');
});

// start the server
app.listen(4000, function() {
  console.log(`Example server running at port ${4000}!`);
});
