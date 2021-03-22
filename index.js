'use strict';

const mongoose = require('mongoose')
const server = require('./src/app.js')
require('dotenv').config()

const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
   server.start(PORT)
  })
  .catch(e => console.error('Could not start server', e.message));