/*
// ########################################################################
// ########################################################################
TITLE: WEBPAGE_PORTFOLIO
DESCRIPTION: Personal website Server
TAGS:
-Nodejs
-Express
- 
// ########################################################################
// ########################################################################
*/

// Import Packages
const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');

// ########################################################################

// Initiate Express App
const app = express();

// Set Express Render Engine
app.set('view engine','ejs');

// Declare 'public' folder for CSS and JS
app.use(express.static('public'));

// ########################################################################

// Page Routing: Index Page Redirect
app.get('/',(req,res)=>{ 
    res.render('index',{page_title:'Home'});
});

// Page Routing: About Page Redirect
app.get('/prompt',(req,res)=>{
    res.render('prompt',{page_title:'Prompt'});
});

// Page Routing: Portfolio Page Redirect
app.get('/toolbag',(req,res)=>{
    res.render('toolbag',{page_title:'Toolbag'});
});

// Page Routing: Web Development Page Redirect
app.get('/web',(req,res)=>{
    res.render('web',{page_title:'Web Development'});    
});


// ########################################################################

// API: Retrieve Data
app.get('/data',(req,res)=>{

    files = [  
        'db_windows.json',
        'db_gcloud.json',
        'db_git.json',
        'db_linux.json',
        'db_mingw.json',
        'db_nodejs.json',
        'db_openssl.json',
        'db_python.json',
        'db_vim.json'
    ];

    const data = {};

    for( file_index=0; file_index<files.length; file_index++ ){
        try {
            const __dirname = './database/';
            const __path = path.join( __dirname, files[file_index]);
            const jsonData = fs.readFileSync(__path,'utf-8');
            Object.assign(data, JSON.parse(jsonData));

        } catch(error) {
            console.error("ERROR::READING_JSON_FILE::"+files[file_index]);
            res.status(500).send("ERROR::READING_JSON_FILE"+files[file_index]);
        }
    }

    // Send JSON Data
    res.json(data);
});

// ########################################################################

// Error 404 Page Redirect
app.use((req,res)=>{
    res.status(404).render('404');
});

// Start Server: Create Enviromental Variable for port 80
const PORT = process.env.PORT || 80;

// Start Server: Listen for incomming connections on port 80
app.listen(PORT,()=>{
    console.log("[Server]Server Started");
    console.log("[Server]Port: ",PORT);
    console.log("---------------------------------------------")
});