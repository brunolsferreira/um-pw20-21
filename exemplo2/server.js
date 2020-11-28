const express = require('express');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
const hostname = '127.0.0.1';
const port = 3000;

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(port, function(){
    console.log(`Server running at http://${hostname}:${port}/`);
});