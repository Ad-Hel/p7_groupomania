const express = require('express');


const sequelize = require('./config/database.js');
const app = express();


app.use(express.json());

const usersRoutes = require('./route/user.js');
const picturesRoutes = require('./route/picture')

async function connectionTest(){
    try {
        await sequelize.authenticate();
        console.log('La connexion a été établie avec succès.');
    } catch (error){
        console.error('Impossible de se connecter à la base de données : ', error);
    }
}

connectionTest();

app.use('/api/auth', usersRoutes);
app.use('/api/picture', picturesRoutes);

module.exports = app;