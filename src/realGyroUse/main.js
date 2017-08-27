'use strict'
const debug = require('debug')('tm:main');
const delay = require('delay');

var Five = require('johnny-five');
var {
    ChipIO
} = require('../preferences');

var circleFunction = require('./constantPositionFunction');

var board = new Five.Board({
    io: new ChipIO()
});

board.on('ready', async function () {

    var accelerometer = new Five.Accelerometer({
        controller: 'MPU6050',
        sensitivity: 16384 // optional
    });

    accelerometer.on('change', function () {
        var result = {
            inclination: this.inclination
        };
        debug('inclination' + '\t' + result.inclination);
    });

    // the function allowing command line arguments
    function grab(flag) {
        let index = process.argv.indexOf(flag);
        return (index === -1) ? undefined : process.argv[index + 1];
    }

    // your command line parameters
    const radius = grab('--r'); // radius of the circle the mass runs on in [mm]
    const direction = grab('--d'); // direction in which you go (backwards: 'b' or forwards: 'f')

    debug(radius, direction);

    if (!(radius && direction)) {
        console.log('No data to execute.');
    }

    if (angleCenter && radiusCenter) {
        console.log('You are in goToAngle');
        await circleFunction(radiusCenter, direction);
    }

    debug('end of code');
    process.exit(0);
});

