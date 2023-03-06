const mongoose = require("mongoose");

const connection = () =>{
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>console.log("MongoDB Atlas conectado!!")).catch((err) =>console.log(err))
}

module.exports = connection;