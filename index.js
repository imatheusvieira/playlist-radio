require("dotenv").config();
const express = require('express');
const connection = require("./database/db");
const path = require("path");
const Music = require("./model/music")
const User = require("./model/user")

const app = express();

const port = process.env.PORT || 5000
let music = null;
let musicDel = null;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded( {extended: true } ));

connection();

app.get('/', async (req, res) => {
    const playlist = await Music.find();
    res.render("index",  { playlist});
});

app.post('/login', async (req, res) => {
    const { user, pass } = req.body;
    const users = await User.findOne();

    if(user == users.user && pass == users.pass){
        res.redirect("/admin");
    } else {

        res.redirect("/")
    }
        
});

app.get('/admin', async (req, res) =>{
    const playlist = await Music.find();
    res.render("admin",  { playlist, music:null, musicDel:null });
});

app.post('/create', async (req, res) =>{
    const music = req.body;
    await Music.create(music);
    res.redirect('/')
});

app.get('/by/:id/:action', async (req, res)=>{
    const { id, action } = req.params;

    music = await Music.findById({ _id: id});

    const playlist = await Music.find();
    if( action == "edit"){
        res.render("admin", { playlist, music, musicDel:null});
    } else{
        res.render("admin", { playlist, music: null, musicDel: music});
    }
    
})

app.post('/update/:id', async (req, res) =>{
    const newMusic = req.body;
    await Music.updateOne({_id: req.params.id}, newMusic)
    
    res.redirect('/admin')
})

app.get('/delete/:id', async (req, res) =>{
    await Music.deleteOne({ _id: req.params.id});
    res.redirect('/admin')
})

app.listen(port, ()=>{
    console.log(`Servidor rodando em: http://localhost:${port}`);
});