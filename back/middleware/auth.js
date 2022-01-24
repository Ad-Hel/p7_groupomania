/**
 * Node modules declaration
 */
 const jwt = require('jsonwebtoken');

 /**
  * This function test if the token of the user is a possible match with a token saved in the database. 
  * if not an error is thrown
  * if there is a match the next function is called
  */
 module.exports = (req, res, next) => {
     try{
         const token = req.headers.authorization.split(' ')[1];
         const decodedToken = jwt.verify(token, 'TOKEN_TO_HIDE_IN_ENV');
         const userId = decodedToken.userId;
         if (req.body.userId && req.body.userId !== userId) {
             throw 'User ID non valable';
         } else {
             next();;
         }
     } catch (error){
         res.status(401).json({ error: error | 'Requête non authentifiée !' });
     }
 }