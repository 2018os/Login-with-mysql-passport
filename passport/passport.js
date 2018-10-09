const { User } = require('../models');
const LocalStrategy = require('passport-local').Strategy;

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.name);
  });
      
  passport.deserializeUser((id, done) => {
    User.find({ where: { name: id } })
    .then((users) => {
      done(null, users);
    })
    .catch((err) => {
      console.error(err);
    });
  });
      
  passport.use(new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password',
  },
    async function(username, password, done) {
      try {
        let user = await User.find({ where: { name: username } });
        if(!user) {
          return done(null, false, { message: 'Incorrect username.' });
        } else {
          if(user.password != password) {
            return done(null, false, { message: 'Incorrect password.' });
          } else {
            return done(null, user);
          }
        }
      } catch(err) {
        console.error(err);
      }
    }
  ));
}