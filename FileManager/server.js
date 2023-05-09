const dotEnv=require('dotenv')
dotEnv.config()
const Port = process.env.PORT
const express = require("express");
const swaggerUI=require('swagger-ui-express')
const YAML = require('yamljs');
const swaggerJsDocs =require('swagger-jsdoc');
const UserRoute = require('./routes')
const app = express();
app.set("view engine", "ejs");



//all app use
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended:true}))
app.use('/api',UserRoute)




app.listen(Port, () => {
    console.log(`listing at http://localhost:${Port}`);
  });
  