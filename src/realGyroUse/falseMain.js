'use strict'
const debug = require('debug')('ru:main'); // ru for real use
const delay = require('delay');

var Five = require('johnny-five');
var ChipIO = require('../preferences.js').ChipIO;
debug('Packages required');

var board = new Five.Board({
    io: new ChipIO()
});
debug('board created');

var gyroToAngle = require('./gyroToAngle.js');
debug('gyroToAngle required');

board.on('ready', async function () {

    // the function allowing command line arguments
    function grab(flag) {
        let index = process.argv.indexOf(flag);
        return (index === -1) ? undefined : process.argv[index + 1];
    }

    // your command line parameters
    const radiusCenter = grab('--r'); // radius of the circle the mass runs on in [mm]
    const direction = grab('--d'); // direction in which you go (backwards: 'b' or forwards: 'f')

    debug('radiusCenter', radiusCenter + '\t' + 'direction', direction);

    if (!(radiusCenter && direction)) {
        console.log('No data to execute');
    }

    if (radiusCenter && direction) {
        console.log('You are in gyroToAngle');
        await gyroToAngle(radiusCenter, direction);
    }

    debug('end of code');
    process.exit(0);
});

