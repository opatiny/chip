// code that allows to keep the mass in the center at a horizontal position relatively to the center of the cylinder.
// The radius of the circle the mass is on (radiusCenter, --r) and if it goes backwards (--d b) or forwards (--d f) are parameters.

'use strict'
const debug = require('debug')('ru:main'); // ru for real use
const delay = require('delay');

var Five = require('johnny-five');
var ChipIO = require('../preferences.js').ChipIO;
debug('Packages required');

var constantPosition = require('./constantMassPosition.js');
debug('constantMassPosition required');

var board = new Five.Board({
    io: new ChipIO()
});
debug('board created');

// the function allowing command line arguments
function grab(flag) {
    let index = process.argv.indexOf(flag);
    return (index === -1) ? undefined : process.argv[index + 1];
}

// your command line parameters
const r = grab('--r'); // radius of the circle the mass runs on in [mm]
const d = grab('--d'); // direction in which you go (backwards: 'b' or forwards: 'f')
const s = grab('--stable'); // to enter the stable mode (--stable on)

// to require web data
var button = require('../webControl/index').button;
var sliderValue = require('../webControl/index').sliderValue;
debug('webControl data required');
debug('button: ' + button + '\t' + 'sliderValue: ' + sliderValue);

if (typeof s === 'number') {
    var stable = 'on'
} else if (button === 'stabButton') {
    stable = 'on'
}

if (typeof r === 'number') {
    var radiusCenter = r
} else {
    radiusCenter = sliderValue
}

if (typeof d === 'number') {
    var direction = d
} else if (sliderValue > 0){
    direction = 'f'
} else if (sliderValue < 0) {
    direction = 'b'
}

debug('radiusCenter', radiusCenter + '\t' + 'direction', direction);


board.on('ready', async function () {

    if (!(radiusCenter && direction) && !(stable && radiusCenter)) {
        console.log('No data to execute');
        process.exit(0);
    }

    var accelerometer = new Five.Accelerometer({
        controller: 'MPU6050',
        sensitivity: 16384 // optional
    });
    debug('Accelerometer defined');

    var counter = 0; // to count the number of changes
    var inclinationLog = [0, 0];
    var angleCenterLog = [0];


    accelerometer.on('change', async function () {


        let newCounter = counter++;
        //debug('counter' + '\t' + newCounter);
        debug('Number of changes detected: ' + newCounter);

        const result = {
            inclination: this.inclination
        };
        let inclination = result.inclination;
        // debug('inclination' + '\t' + inclination);

        inclinationLog = [inclinationLog[inclinationLog.length-1]]; // this allows to have the two last values of inclination
        inclinationLog.push(inclination);
        debug('inclination log' + '\t' + inclinationLog);



        if (inclination < 0) {
            inclination = Math.abs(inclination)
        } else {
            inclination = 360 - Math.abs(inclination)
        }
        debug('corrected inclination' + '\t' + inclination);

        var baseAngle; // the angle of the gyro that corresponds to the balanced position of the cylinder for a certain theta

        // code that allows to assign the angleCenter of the balanced position of the cylinder, for any value of the accelerometer.
        // These assignations are based on cylinderPrototype3 and the particular position of the gyro on that prototype
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

        if (radiusCenter && direction) {
            if (direction === 'b') {
                angleCenter = baseAngle - 90
            } else {
                angleCenter = baseAngle + 90
            }

            debug('angleCenter' + '\t' + angleCenter);

        } else if (stable === 'on') {
            let previousAngleCenter = angleCenterLog[angleCenterLog.length-1];// this allows to have the last values of angleCenter
            debug('previousAngleCenter' + '\t' + previousAngleCenter);

            let inclinationDiff = inclinationLog[inclinationLog.length-1].toPrecision(4) - inclinationLog[inclinationLog.length-2].toPrecision(4);
            debug('inclinationDiff ' + inclinationDiff);

            // const maxInclinationDiff = 1.4; // we estimate what it could be to make the servos reaction proportional
            const proportionalStep = inclinationDiff / 0.75;

            if (inclinationDiff < 0) {
                angleCenter = previousAngleCenter -1
            } else if (inclinationDiff === 0) {
                angleCenter = previousAngleCenter
            } else {
                angleCenter = previousAngleCenter + 1
            }
            debug('angleCenter' + '\t' + angleCenter);

            angleCenterLog.push(angleCenter);

        }


        await constantPosition(radiusCenter, angleCenter);

    });
});


