const express = require('express');
const app = express();
require('express-ws')(app);


app.use(express.static('html'));

app.ws('/ws', (ws, req) => {
    ws.on('message', msg => {
        var message = JSON.parse(msg);
     //   ws.send(msg);
        console.log(message);
    });

    ws.on('close', () => {
        console.log('WebSocket was closed');
    });

    ws.on('connection', () => {
        console.log('WebSocket was opened');
    });
});

app.listen(8080);