const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//Connect to the Database
mongoose.connect(config.database);

//On Connection
mongoose.connection.on('connected',() => {
	console.log('connected to the database');
});

//On Error
mongoose.connection.on('error',(err) => {
	console.log('Database Error'+err);
});

const app = express();

const users = require('./routes/users');

//port number
const port = 3000;

//CORS middliware
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));														

//Body parser Middleware
app.use(bodyParser.json());

app.use('/users',users);

app.get('/',(req, res) => {
	res.send('Invalid Endpoint');
});

app.listen(port, () => {
	console.log('Server started on port' + port);
});