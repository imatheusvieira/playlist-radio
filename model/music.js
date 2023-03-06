const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    author:{
        type: String,
        require: true,
    },
    image:{
        type: String,
        require: true,
    },
    music:{
        type: String,
        require: true,
    },
});

module.exports = mongoose.model("Music", musicSchema);