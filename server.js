'use strict';

const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');

let player = [];    // En array för spelare
let gm = '';        // Endast en GM
let gmKey = '123noob'; // EN kommentar

app.use(cookieParser());
app.use('/public', express.static(__dirname +'/public'));
app.use(bodyParser.urlencoded({extended : true}));

http.listen(3000,()=>{
    console.log('---> Server is running on port 3000 <---');
});

app.get('/', (req, res)=>{
    res.redirect('/userlogin.html');
});

app.get('/userlogin.html', (req, res)=>{
    res.sendFile(__dirname +'/public/userlogin.html');
});

app.get('/gmpage.html', (req, res)=>{
    if(req.headers.cookie === 'gamemaster=true'){           // Om gamemaster=true
        res.sendFile(__dirname +'/public/gmpage.html');
        let timer = setInterval(() => {
            io.emit('gmData', {"gameMaster": gm, "players": player});
        clearInterval(timer);
        }, 1000);
    } else {
        res.send('Dont try to sneak here lol noob..');
    }
});

app.get('/gamepage.html', (req, res)=>{
    res.sendFile(__dirname +'/public/gamepage.html');
});

app.post('/userlogin.html', (req, res)=>{
    let userName = req.body.name;
    let pW = req.body.gmID;

    if(pW === gmKey){
        gm = userName;
        res.cookie('gamemaster', true, {maxAge: 1000 * 60 * 60 * 24});          // Kaka finns i ett dygn
        res.redirect('/gmpage.html');
    } else {
        res.send('Dont try noob');
    }

});

io.on('connection', (socket)=>{
    socket.on('userReady', data =>{
        player.push(data);
        io.emit('newPlayer', data);
    });

    /*socket.on('gmReady', data =>{
        gm = data;
        console.log('GM: ' +gm);
        let timer = setInterval(() => {
            io.emit('gmData', {"gameMaster": gm, "players": player});
            clearInterval(timer);
        }, 1000);
    });*/

    socket.on('outgoingQuestion', data =>{
        console.table(data);
        io.emit('incomingQuestion', data);
    });
});