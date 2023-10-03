const express = require('express');
const mongoose = require('./db');

const authRoutes = require('./routes/auth');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const passport = require('passport');
     



const app = express();
app.use(express.json());


//passport jwt setup
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'ThisKeyWillBeSecret';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.identifier}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));


const port=4000;
app.use('/auth',authRoutes);

app.get('/',(req,res)=>{
    res.send('Hello World');
})
app.listen(port,()=>{
    console.log(`app is listening to port ${port}`);
})