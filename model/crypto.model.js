const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: String,
    price: Number,
    marketCap: Number,
    '24hChange': Number,
    lastUpdated: { type: Date, default: Date.now }
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto