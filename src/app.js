'use strict';

// 3rd Party Resources
const express = require('express');
const authRouters = require('./routes/authRoutes.js');
const morgan = require('morgan');
const cors = require('cors')
const errorHandler = require('./error-handlers/500.js')
const notFoundHandler = require('./error-handlers/404.js')



// Prepare the express app
const app = express();

// App Level MW
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(cors());

app.use(authRouters)
app.use('*', notFoundHandler)
app.use(errorHandler)


module.exports = {
  app: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`listening on port ${port}`)
    })
  }
}
