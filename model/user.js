const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    user:{
        type: String,
        require: true,
    },
    pass:{
        type: String,
        require: true,
    }
});

module.exports = mongoose.model("User", userSchema);