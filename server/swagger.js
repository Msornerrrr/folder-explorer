import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'PDF API',
    description: '...',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen()(outputFile, endpointsFiles, doc);