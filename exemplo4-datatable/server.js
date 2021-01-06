const hostname = '127.0.0.1';
const port = 3000;

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

const mysqlConfig = require('./config/mysql.js');
const usersRouter = require('./routes/usersRouter');

global.connection = mysql.createConnection({
    host: mysqlConfig.host,
    port: mysqlConfig.port,
    user: mysqlConfig.user,
    password: mysqlConfig.password,
    database: mysqlConfig.database
});

global.connection.connect(function(err) {
    if (err) throw err;
    console.log('You are now connected to MySQL...');
  });
  
app.use('/users', usersRouter);

app.listen(port, function(){
    console.log(`Server running at http://${hostname}:${port}/`);
});