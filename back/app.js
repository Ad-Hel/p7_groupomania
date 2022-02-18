const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt')
const User = require ('./model/User')


const sequelize = require('./config/database.js');
const app = express();


app.use(express.json());

const usersRoutes = require('./route/user.js');
const picturesRoutes = require('./route/picture')
const likeRoutes = require('./route/like');
const textRoutes = require('./route/text');

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

const createAdmin = async () => {
    const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    const [user, created] = await User.findOrCreate({
        where: {
            role: 3
        },
        defaults: {
            firstName: process.env.ADMIN_FIRST_NAME,
            lastName: process.env.ADMIN_LAST_NAME,
            email: process.env.ADMIN_EMAIL,
            password: hash
        }
    })
    if (created){
        return user
    }
}
createAdmin();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/user', usersRoutes);
app.use('/api/picture', picturesRoutes);
app.use('/api/like', likeRoutes);
app.use('/api/text', textRoutes);


module.exports = app;