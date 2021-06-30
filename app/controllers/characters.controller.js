//API: https://swapi.dev/
//Star wars public API

const axios = require('axios');
const Character = require('../models/charactersSW.model');

module.exports = {

    characterById: async (req, res) => {
        //Get the character by Id
        const characterId = req.params.character;
        await axios
        .get(
            `https://swapi.dev/api/people/${characterId}`
        )
        .then(async (resp) => {
            res.json(resp.data);
        })
        .catch((err) => {
            res.status(401).json({ message: 'Bad Request', error: err });
        });
    },

    filmsById: async (req, res) => {
        //Get the Star Wars films by Id
        const filmId = req.params.film;
        await axios
        .get(
            `https://swapi.dev/api/films/${filmId}`
        )
        .then(async (resp) => {
            res.json(resp.data);
        })
        .catch((err) => {
            res.status(401).json({ message: 'Bad Request', error: err });
        });
    },

    speciesById: async (req, res) => {
        //Get the characters possibles species by Id
        const specieId = req.params.specie;
        await axios
        .get(
            `https://swapi.dev/api/species/${specieId}`
        )
        .then(async (resp) => {
            res.json(resp.data);
        })
        .catch((err) => {
            res.status(401).json({ message: 'Bad Request', error: err });
        });
    },

    characterBygender: async (req, res) => {
        //Get the characters by gender ---> male or female

        const gender = req.params.gender;
        await axios
        .get(
            `https://swapi.dev/api/people/`
        )
        .then(async (resp) => {
            console.log(gender);
            const characters = resp.data.results;
            let filteredByGender = characters.filter(function (e) {
                return e.gender == gender;
            });
            res.json(filteredByGender);
        })
        .catch((err) => {
            res.status(401).json({ message: 'Bad Request', error: err });
        });
    },
    
    getCharacter: (req, res) => {
        const characterId = req.params.character;
        console.log(req.params);
        Character.findOne({ characterId : characterId }).exec((err, _character) => {
            _character === null
            ? res
                .status(404)
                .json({ message: `The character don't exist in the database` })
            : res.json(_character);
        });
    },

    postCharacter: async (req, res) => {
        const characterId = req.body.character;
        Character.findOne({ characterId: characterId }).exec(async (err, _character) => {
            if (err !== null) {
                res.status(409).json({
                message: 'Something went wrong',
                error: err,
                });
            }
            if (_character === null) {
                await axios
                .get(
                    `https://swapi.dev/api/people/${characterId}`
                )
                .then(async (response) => {
                    const character = new Character({
                        characterId: characterId,
                        name: response.data.name,
                        gender: response.data.gender,
                        height: response.data.height,
                        mass: response.data.mass,
                        birth_year: response.data.birth_year
                    });

                    await character
                    .save()
                    .then((response) =>
                        res.json({ message: 'New Character Added!', character: character })
                    )
                    .catch((err) =>
                        res.status(409).json({
                        message: 'Something went wrong',
                        error: err,
                        })
                    );
                })
                .catch((err) => {
                    res.status(401).json({ message: 'Bad Request', error: err });
                });
                
            } else {
                //Status 200, because the request is good, but the ids already exists
                res.json({
                    message: 'The character already exists in the database'
                });
            }
        });
    },

    deleteCharacter: async (req, res) => {
        //This function works fine, but always response the success message, but if don't find the character don't delete anything
        const characterId = req.body.character;
        Character.findOneAndDelete({ characterId: characterId }).exec((err, resp) => {
            err
            ? res
                .status(404)
                .json({ message: 'Bad request. Please check if the characterId is valid' })
            : res.json({ message: 'Character deleted!' });
        });
    },

};
