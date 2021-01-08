//Login adaptado de https://www.luiztools.com.br/post/autenticacao-em-node-js-com-passport/

const hostname = '127.0.0.1';
const port = 3000;

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

const passport = require('passport');
const session = require('express-session');

require('./auth')(passport);

app.set('view engine', 'ejs');

app.use(session({  
  secret: '123',//configure um segredo seu aqui,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 60 * 1000 }//30min
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

const mysqlConfig = require('./config/mysql');
const usersRouter = require('./routes/usersRouter');
const loginRouter = require('./routes/loginRouter');

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

function authenticationMiddleware(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login?fail=true');
}
 
app.use('/users', authenticationMiddleware, usersRouter);
app.use('/login', loginRouter);

app.listen(port, function(){
    console.log(`Server running at http://${hostname}:${port}/`);
});