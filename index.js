require("dotenv").config();
const express = require('express');
const connection = require("./database/db");
const path = require("path");
const Music = require("./model/music")

const app = express();

const port = process.env.PORT || 5000

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded( {extended: true } ));

connection();

app.get('/', (req, res) => {
    res.render("index");
});

app.get('/admin', (req, res) =>{
    res.render("admin")
})

app.post('/create', async (req, res) =>{
    const music = req.body;
    await Music.create(music);
    res.redirect('/')
})


app.listen(port, ()=>{
    console.log(`Servidor rodando em: http://localhost:${port}`);
});