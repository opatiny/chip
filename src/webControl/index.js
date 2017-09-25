const debug = require('debug')('wc:main'); // ru for real use
const express = require('express');
const app = express();
require('express-ws')(app);

let prefs={};


app.use(express.static('html'));

app.ws('/ws', (ws, req) => {
    ws.on('message', msg => {
        var message = JSON.parse(msg);
        // ws.send(msg);
        debug(message);

        prefs[message.event]=message.value;
        module.exports = prefs;

        console.log(prefs);

    });


    ws.on('close', () => {
        console.log('WebSocket was closed');
        prefs={};
    });

    ws.on('connection', () => {
        console.log('WebSocket was opened');
    });

});

app.listen(8080);

