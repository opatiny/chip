const debug = require('debug')('wc:main'); // ru for real use
const express = require('express');
const app = express();
require('express-ws')(app);

let lastDatalist = [0];
let lastButton = [0];
let lastSliderValue = [0];

app.use(express.static('html'));

app.ws('/ws', (ws, req) => {
    ws.on('message', msg => {
        var message = JSON.parse(msg);
        // ws.send(msg);
        debug(message);

        if (message.event === 'datalist') {
            lastDatalist.push(message.value);
        } else if (message.event === 'button') {
            lastButton.push(message.value);
            debug('button:' + '\t' + button);
        } else if (message.event === 'radiusSlider') {
            lastSliderValue.push(message.value);
        }

        // to have only the last value of these parameters
        var cylinderPrototype = lastDatalist[lastDatalist.length - 1];
        var button = lastButton[lastButton.length-1];
        var sliderValue = lastSliderValue[lastSliderValue.length-1];

        console.log('button: ' + button + '\t' + 'cylinderPrototype: ' + cylinderPrototype + '\t' + 'sliderValue: ' + sliderValue);
        module.export = {
            button,
            cylinderPrototype,
            sliderValue
        }

    });

    ws.on('close', () => {
        console.log('WebSocket was closed');
    });

    ws.on('connection', () => {
        console.log('WebSocket was opened');
    });
});

app.listen(8080);

