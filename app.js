const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// connect to database
mongoose.connect(config.database, {
  useNewUrlParser: true
});

// on connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+ config.database);
});

// on error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

const app = express();

const users = require('./routes/users');
// const spots = require('./routes/spots');
// const regions = require('./routes/regions');

//port number
const port = process.env.PORT || 8080;

// CORS middleware
app.use(cors());

// set static 
app.use(express.static(path.join(__dirname, 'public')));

// body parser middleware
app.use(bodyParser.json());

// passport middlware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
// app.use('/spots', spots);
// app.use('/regions', regions);

// index route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
  res.sendfile(path.join(__dirname, 'public/index.html'));
});

// start server
app.listen(port, () => {
  console.log('Server started on port '+port);
});