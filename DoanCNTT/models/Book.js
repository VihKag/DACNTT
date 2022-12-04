const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Book = new Schema({
    _id: {
        type: String,
        required: true,
    },
    tensach: {
        type: String,
        required: true,
    },
    nxb: {
        type: String,
        required: true,
    },
    tacgia: {
        type: String,
        required: true,
    },
    sotrang: {
        type: Number,
        require: true,
    },
    giatien: {
        type: Number,
        require: true,
    },
    theloai: {
        type: String,
        require: true,
    },
    img: {
        type: String,
        require: true,
    },
    luatuoi: {
        type: String,
        require: true,
    },

  });

  module.exports = mongoose.model('Book', Book);;
  