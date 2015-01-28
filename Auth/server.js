var express = require('express');
var path = require('path');
var User = require('./user');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');

var secret = 'this is a secret shhh';

var app = express();

mongoose.connect('mongodb://localhost:27017/prep');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});
app.use(express.static(path.join(__dirname, 'public')));

app.post('/signup', function(req, res) {
  console.log(req.body);
  var user = new User({
    username: req.body.username,
    password: req.body.password
  });
  User.findOne({ username: req.body.username }, function(err, existingUser) {
    console.log(err);
    if (existingUser) return res.json({ success: false, message: 'Registration Failed. User already exists. '});
    user.save(function(err) {
      console.log(err);
      if (err) return res.json(({ success: false, message: 'Registration failed. Something bad happen.' }));
      var token = jwt.sign({ username: user.username }, secret);
      res.json({ success: true, message: 'Enjoy your token!', token: token });
    });
  });
});

app.post('/login', function(req, res) {
  User.findOne({ username: req.body.username }, function(err, user) {
    if (err) throw err;

    if (!user) return res.json({ success: false, message: 'Authentication failed. User not found.' });

    var validPassword = user.comparePassword(req.body.password);
    if (!validPassword) return res.json({ success: false, message: 'Authentication failed. Wrong password.' });
    

    var token = jwt.sign({ username: user.username}, secret);

    res.json({success: true, message: 'Enjoy your token!', token: token });
  });   
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/app/views/index.html'));
});

app.listen(3000, function() {
	console.log('Server has started on port 3000');
});