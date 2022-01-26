const express = require('express');
const path = require('path');


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

async function DbSync(){
    try{
        // await sequelize.sync({force: true});
        await sequelize.sync();
        console.log('Synchronisation de la base de données.');
    } catch(error){
        console.error(error);
    }

}
DbSync();


app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', usersRoutes);
app.use('/api/picture', picturesRoutes);

module.exports = app;