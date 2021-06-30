const express = require('express');
const { authJwt } = require('../middlewares/index');
const {
    characterById,
    filmsById,
    speciesById,
    characterBygender,
    getCharacter,
    postCharacter,
    deleteCharacter,
} = require('../controllers/characters.controller');

module.exports = function(app) {  
    app.get('/characterById/:character', authJwt.verifyToken, characterById)

    app.get('/filmsById/:film', authJwt.verifyToken, filmsById);

    app.get('/speciesById/:specie', authJwt.verifyToken, speciesById);

    app.get('/characterBygender/:gender', authJwt.verifyToken, characterBygender);

    app.get('/characters/:character', authJwt.verifyToken, getCharacter);

    app.post('/characters', authJwt.verifyToken, postCharacter);

    app.delete(
        '/characters',
        authJwt.verifyToken,
        authJwt.isAdmin,
        deleteCharacter
    );
};
