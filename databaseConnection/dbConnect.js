const mongoose = require('mongoose');
// const AutoIncrementFactory = require('mongoose-sequence')
const dotenv = require('dotenv');
dotenv.config();
const connection = mongoose.connect(process.env.url);
// const AutoIncrement = AutoIncrementFactory(connection);

module.exports = connection;