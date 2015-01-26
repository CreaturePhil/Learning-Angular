var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/app/views/index.html'));
});

app.listen(3000, function() {
	console.log('Server has started on port 3000');
});