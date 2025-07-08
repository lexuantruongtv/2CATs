import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  dswaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API',
      version: '1.0.0',
      description: 'API documentation for backend',
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
      },
    ],
  },
  apis: ['./controllers/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;