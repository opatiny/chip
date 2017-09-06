// code that allows to keep the mass in the center at a horizontal position relatively to the center of the cylinder.
// The radius of the circle the mass is on (radiusCenter, --r) and if it goes backwards (--d b) or forwards (--d f) are parameters.

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


var constantPosition = require('./constantPosition.js');
debug('constantPosition required');

const direction = 'b';
const radiusCenter = 25;

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
        process.exit(0);
    }

    var accelerometer = new Five.Accelerometer({
        controller: 'MPU6050',
        sensitivity: 16384 // optional
    });
    debug('Hellloooooo agaaaaain');


    accelerometer.on('change', async function () {

        const result = {
            inclination: this.inclination
        };

        debug('inclination' + '\t' + result.inclination);

        let inclination = result.inclination;

        if (inclination < 0) {
            inclination = Math.abs(inclination)
        } else {
            inclination = 360 - Math.abs(inclination)
        }
        debug('corrected inclination' + '\t' + inclination);


        var baseAngle; // the angle of the gyro that corresponds to the balanced position of the cylinder for a certain theta

        if (48 <= inclination < 137) {
            baseAngle = (inclination - 48) * 90 / (137 - 48)
        } else if (137 <= inclination < 222.5) {
            baseAngle = (inclination - 137) * 90 / (222.5 - 137) + 90
        } else if (222.5 <= inclination < 313) {
            baseAngle = (inclination - 222.5) * 90 / (313 - 222.5) + 180
        } else if (313 <= inclination < 48) {
            baseAngle = (inclination - 313) * 90 / (48 - 313) + 270
        }

        debug('baseAngle' + '\t' + baseAngle);


        var angleCenter;

        if (direction === 'b') {
            angleCenter = baseAngle - 90
        } else {
            angleCenter = baseAngle + 90
        }

        debug('angleCenter' + '\t' + angleCenter);


        await constantPosition(radiusCenter, angleCenter);

    });
});


