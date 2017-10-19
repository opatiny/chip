// code allowing webSocket to work-> kind of interface between web page and rest of js code.
'use strict'

const debug = require('debug')('wc:ws'); // wc for web control
const delay = require('delay');
const express = require('express');
const app = express();
require('express-ws')(app);
debug('Packages required');

let prefs = {};

app.use(express.static('html'));

app.ws('/ws', (ws, req) => {

    ws.on('message', msg => {
        var message = JSON.parse(msg);
        // ws.send(msg);
        debug(message);
        prefs[message.event] = message.value;

        module.exports = {prefs};
        debug(prefs);

    });

    ws.on('close', () => {
        console.log('WebSocket was closed');
        prefs = {};
    });

    ws.on('connection', () => {
        console.log('WebSocket was opened');
    });
});
app.listen(80);

module.exports = {prefs};