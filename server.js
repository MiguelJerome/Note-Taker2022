const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// custom middleware applied on all routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));



// Use apiRoutes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

 function listenPort(){
    const port = process.env.PORT || 3001;
    app.listen(port, () => {
    console.log(`API server now on port ${port}!`);
  });
}

listenPort();

module.exports = listenPort;