const mongoose = require('mongoose');

const City = new mongoose.model('City', new mongoose.Schema({
    name: String,
}));

module.exports.City = City;