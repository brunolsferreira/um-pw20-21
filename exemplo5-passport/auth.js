const LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport){
  
    function findUser(username, success, error) {
        let sql = "SELECT * FROM users WHERE username=?";
        global.connection.query(sql, username, function(err, results) {
            if (err) error(err);
            if (results.length == 0) error(false);
            return success(results[0]);
        });
    }
    
    passport.serializeUser((user, done) => {
        done(null, user.username);
    });
 
    passport.deserializeUser((username, done) => {
        findUser(username, 
            function(user) {
                done(null, user);
            },
            function(error) {
                done(err, null);
            });
    });

    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
        (username, password, done) => {
            findUser(username, 
                function(user) {
                    if (user && user.password === password) return done(null, user);
                    return done(null, false);
                }, function(error) {
                    return done(null, false);
                });
        }
    ));  
}