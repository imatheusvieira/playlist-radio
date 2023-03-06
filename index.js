require("dotenv").config();
const express = require('express');
const connection = require("./database/db")

const app = express();

const port = process.env.PORT || 5000

connection();

app.get('/hello', (req, res) => {
    res.send("Hello World")
});

app.listen(port, ()=>{
    console.log(`Servidor rodando em: http://localhost:${port}`);
});