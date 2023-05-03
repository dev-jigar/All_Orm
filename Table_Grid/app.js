const express = require('express');
const app = express();
const port = 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

const Route = require('./routers/Route')






app.use('/api',Route)
app.listen(port, () => {
    console.log(`listing at http://localhost:${port}`);
  });
  