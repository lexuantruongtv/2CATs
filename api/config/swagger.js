const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API',
      version: '1.0.0',
      description: 'API documentation for backend',
    },
    servers: [
      {
        url: 'http://localhost:5000/api/users',
      },
    ],
  },
  apis: ['./api/controllers/*.js'], // chỉ định file chứa swagger annotations
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;