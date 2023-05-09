const express = require("express");
const UserRoute = require("./routes/UserRoutes")
const combo = require("./routes/combo")
const app = express();
const swaggerUI=require('swagger-ui-express')
const YAML = require('yamljs');
const swaggerJsDocs =require('swagger-jsdoc');

const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended:true}))
app.use('/api',UserRoute)
app.use('/try',combo)

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
      title: 'Crud API ',
  },
  servers: [
      {
          url: 'http://localhost:3001/',
          description: 'Development server',
      },
  ],
  components: {
      securitySchemes: {
          bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
          },
      },
  },
  security: [{
      bearerAuth: []
  }],
}; 

const options = {
  swaggerDefinition,
  apis: ['./swaggerDocuments/*.js'],
};

const swaggerSpec = swaggerJsDocs(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));



app.listen(port, () => {
  console.log(`listing at http://localhost:${port}`);
});
