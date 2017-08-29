'use strict'
const debug = require('debug')('ru:main');
const delay = require('delay');

var Five = require('johnny-five');
var ChipIO = require('../preferences.js').ChipIO;
debug('Packages required');


var gyroToAngle = require('./gyroToAngle');

debug('Function required');

var board = new Five.Board({
    io: new ChipIO()
});
debug('board created');

board.on('ready', async function () {

    // the function allowing command line arguments
    function grab(flag) {
        let index = process.argv.indexOf(flag);
        return (index === -1) ? undefined : process.argv[index + 1];
    }

    // your command line parameters
    const radius = grab('--r'); // radius of the circle the mass runs on in [mm]
    const direction = grab('--d'); // direction in which you go (backwards: 'b' or forwards: 'f')

    debug('radius', radius + '\t' + 'direction', direction);

    if (!(radius && direction)) {
        console.log('No data to execute');
    }

    if (radius && direction) {
        console.log('You are in constantPosition');
        await gyroToAngle(radius, direction);
    }

    debug('end of code');
    process.exit(0);
});

