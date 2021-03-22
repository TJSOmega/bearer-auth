'use strict';

const express = require('express');
const basicAuth = require('../middleware/basic-auth-middleware.js');
const bearerAuth = require('../middleware/bearer-auth-middleware.js');
const User = require('../users.js')

const authRouters = express.Router()



// echo '{"username":"john","password":"foo"}' | http post :3000/signup
authRouters.post('/signup', (req, res) => {
  const user = new User(req.body);
  user.save()
    .then(user => {
      res.status(201).send(user);
    })
    .catch(e => { res.status(403).send("Error Creating User"); });
});

// http post :3000/signin -a john:foo
authRouters.post('/signin', basicAuth, (req, res) => {
  res.status(200).send(req.user);
});

authRouters.get('/user', bearerAuth, (req, res) => {
  res.status(200).json({user: req.user, message: 'You were successful!'});
});


module.exports = authRouters;


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRKUyIsImlhdCI6MTYxNTk1ODM1N30.KvzIc5I-T4Bg4_iA9N_vBAb-Bj7DwiF2PHk7yV9w9Mw