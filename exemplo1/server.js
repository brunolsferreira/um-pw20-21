const express = require('express');
const app = express();
const hostname = '127.0.0.1';
const port = 3000;

app.get('/', function(req, res) {
    res.send("Pagina principal");
});

app.get('/users', function(req, res) {
    res.send("Utilizadores");
});

app.get('/users/:userId', function(req, res) {
    res.send("Utilizadores: " + req.params['userId']);
});

app.listen(port, function(){
    console.log(`Server running at http://${hostname}:${port}/`);
});
