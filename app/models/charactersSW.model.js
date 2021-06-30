const mongoose = require("mongoose");

const Character = mongoose.model(
    "Character",
    new mongoose.Schema({
        characterId: Number,
        name: String,
        gender: String,
        height: String,
        mass: String,
        birth_year: String
    })
);

module.exports = Character;