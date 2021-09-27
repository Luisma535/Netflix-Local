const express = require('express'); 
const mysql = require('mysql');
const Conecction = require('express-myconnection')
const path = require('path'); 
const mysql_store = require('express-mysql-session');
const session = require('express-session');
const routes = require('./routes/routes'); 
const pool = require('./db/database'); 
const { database } = require('./keys/keys') 
const fileUpload = require('express-fileupload');
require("dotenv").config() 
//App
const app = express()
  
//config 
const port = process.env.PORT || 4040;
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static("public"))

//middlewares 
app.use(Conecction(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306, 
    database: 'videos'
}));
 
app.use(session({
    secret: 'Netflix',
    resave: false,
    saveUninitialized: false,
    store: new mysql_store(database)
}));
 
app.use(express.urlencoded({extends: false}));
app.use(express.json());
app.use(fileUpload())
  
//Routes
app.use(routes);
 
//Run  
app.listen(port,()=>console.log("Server on port " +port))




