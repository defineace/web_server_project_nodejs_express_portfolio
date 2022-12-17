const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');

const app = express();

app.set('view engine','ejs');
app.use(express.static('public'));

app.get('/',(req,res)=>{ 
    res.render('index',{page_title:'Home'});
});
app.get('/about',(req,res)=>{
    res.render('about',{page_title:'About'});
});
app.get('/portfolio',(req,res)=>{
    res.render('portfolio',{page_title:'Portfolio'});
});
app.get('/web',(req,res)=>{
    res.render('web',{page_title:'Web Development'});    
});
app.use((req,res)=>{
    res.status(404).render('404');
});

const PORT = process.env.PORT || 80;

app.listen(PORT,()=>{
    console.log("Server Started");
});

/*
const sslServer = https.createServer({
        key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'cert','cert.pem')),
    },app);
sslServer.listen(PORT,()=>{
    console.log("Server Started");
});
*/
