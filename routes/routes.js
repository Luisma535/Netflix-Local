const express = require('express');
const router = express.Router()
const fileUpload = require('express-fileupload');
const pool = require('../db/database')
 
router.get('/',async(req, res) => {
    let pelis = await pool.query("SELECT * FROM peliculas")
    let musics = await pool.query("SELECT * FROM music")
    res.render('home',{pelis,musics})
})
 
router.get("/upload-peli",(req,res)=>{
    res.render("upload-peli")
})
router.get("/upload-music",(req,res)=>{
    res.render("upload-music")
})
router.post('/upload-peli', async (req, res) => {
    if(!req.files){
        console.log('Not files found')
    }else{
        let file = req.files.file;
        console.log(file)
        let path = __dirname + '/../public/videos/' + file.name;
        let res = await file.mv(path, async (err) => {
            if(err){ 
                 console.log(err)
            }else{
                
                const res = await pool.query(`INSERT INTO peliculas ( name , path) VALUES ( '${file.name}' ,'/videos/${file.name}')`)
            }
        })
    }
    res.redirect('/');
})

router.post('/upload-music', async (req, res) => {
    if(!req.files){
        console.log('Not files found')
    }else{
        let file = req.files.file;
        console.log(file)
        let path = __dirname + '/../public/music/' + file.name;
        let res = await file.mv(path, async (err) => {
            if(err){ 
                 console.log(err)
            }else{
                
                const res = await pool.query(`INSERT INTO music ( name , path) VALUES ( '${file.name}' ,'/music/${file.name}')`)
            }
        })
    }
    res.redirect('/');
})

router.get("/peli/:id",async(req,res)=>{
    let id = req.params.id 
    del = await pool.query("DELETE FROM peliculas WHERE id = ?",[id])
    res.send(id + " Borrado... actualice la pagina principal")
})

router.get("/music/:id",async(req,res)=>{
    let id = req.params.id 
    del = await pool.query("DELETE FROM music WHERE id = ?",[id])
    res.send(id + " Borrado... actualice la pagina principal")
})
module.exports = router