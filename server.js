// Import Packages
const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');


// Initiate Express App
const app = express();

// Set Express Render Engine
app.set('view engine','ejs');

// Declare 'public' folder for CSS and JS
app.use(express.static('public'));

// Index Page Redirect
app.get('/',(req,res)=>{ 
    res.render('index',{page_title:'Home'});
});

// About Page Redirect
app.get('/about',(req,res)=>{
    res.render('about',{page_title:'About'});
});

// Portfolio Page Redirect
app.get('/toolbag',(req,res)=>{
    res.render('toolbag',{page_title:'Toolbag'});
});

// Web Development Page Redirect
app.get('/web',(req,res)=>{
    res.render('web',{page_title:'Web Development'});    
});

// Error 404 Page Redirect
app.use((req,res)=>{
    res.status(404).render('404');
});

// Create Enviromental Variable for port 80
const PORT = process.env.PORT || 80;

// Listen for incomming connections on port 80
app.listen(PORT,()=>{
    console.log("[Server]Server Started");
    console.log("[Server]Port: ",PORT);
    console.log("---------------------------------------------")
});