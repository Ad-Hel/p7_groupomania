/**
 * Protocol and app declarations
 */
const http = require('http');
const dotenv = require('dotenv').config();
const app = require('./app');

if (dotenv.error){
    throw dotenv.error;
}
 
 /**
  * This function get a value, test it et return it.
  * First of all, it parses it into integer
  * Secondly it test if the value is a number and if it is greater than 0
  * @param {string} val 
  * @returns {integer || false}
  */
 const normalizePort = val => {
   const port = parseInt(val, 10);
 
   if (isNaN(port)) {
     return val;
   }
   if (port >= 0) {
     return port;
   }
   return false;
 };
 /**
  * Set the port to listen
  * Test the environnemental port
  * Set it to 3000 if the environnemental port is not valid
  */
 const port = normalizePort(process.env.PORT || '3000');
 app.set('port', port);
 
 /**
  * This function  catch server error to provide a meaningful console message.
  * @param {string} error 
  */
 const errorHandler = error => {
   if (error.syscall !== 'listen') {
     throw error;
   }
   const address = server.address();
   const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
   switch (error.code) {
     case 'EACCES':
       console.error(bind + ' requires elevated privileges.');
       process.exit(1);
       break;
     case 'EADDRINUSE':
       console.error(bind + ' is already in use.');
       process.exit(1);
       break;
     default:
       throw error;
   }
 };
 
 /**
  * Server declaration
  */
 const server = http.createServer(app);
 
 /**
  * add event listener to provide meaningful messages in the console
  */
 server.on('error', errorHandler);
 server.on('listening', () => {
   const address = server.address();
   const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
   console.log('Listening on ' + bind);
 });
 
 /**
  * launch server
  */
 server.listen(port);