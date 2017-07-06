/* This document will require all the different functions that we developed, like making to rotations,
 going to a specific point, moving three meters forward,... It uses command line arguments
 (https://www.youtube.com/watch?v=yTJ9OJmbiHU).
*/



var five = require('johnny-five');
var chipio = require('chip-io');
var delay = require('delay');

var board = new five.Board({
    io: new chipio()
});

board.on("ready", async function () {
    console.log("Connected");

    // Initialize the servo instance
    var servo1 = new five.Servo({
        address: 0x40,
        controller: "PCA9685",
        pin: 15
    });
    console.log("servo1 initialized");

    var servo2 = new five.Servo({
        address: 0x40,
        controller: "PCA9685",
        pin: 14
    });
    console.log("servo2 initialized");

    var servo3 = new five.Servo({
        address: 0x40,
        controller: "PCA9685",
        pin: 13
    });
    console.log("servo3 initialized");



    // var formula = require('./returnAngleFormula.js');
    var goToPoint = require('./goToPointFile.js');
    var movingOnCircle = require('./movingOnCircle.js');
    var moveDistance = require('./moveDistance.js');

    console.log("Functions required.");


    function grab(flag) {
        var index = process.argv.indexOf(flag);
        return (index === -1) ? null : process.argv[index + 1];
    }


    // parameters that can vary (here, they come from the process.argv)
    const radiusCenter = grab('--r'); // radius of the circle the mass runs on in [mm]
    const numberRotation = grab('--tour'); // number of rotations we want the mass to do (whole numbers), if it is unlimited, write Infinity
    const xMassPosition = grab('--x'); // x component of mass position in [mm]
    const yMassPosition = grab('--y'); // y component of mass position in [mm]
    const length = grab('--l'); // distance the cylinder has to move in [mm]
    const timeToWait = grab('--d'); // distance the cylinder has to move in [mm]

    async function wait(timeToWait) {
        await delay(timeToWait)
    }

    console.log(radiusCenter, numberRotation, xMassPosition, yMassPosition, length, timeToWait);

    if (!(radiusCenter && numberRotation) && !(xMassPosition && yMassPosition) && !length && !timeToWait){
        console.log('No data to execute.');
    }

    if (radiusCenter && numberRotation) {
        console.log('You are in movingOnCircle');
        movingOnCircle(radiusCenter, numberRotation, servo1, servo2, servo3, delay);
    }
    if (xMassPosition && yMassPosition) {
        console.log('You are in goToPoint');

        goToPoint(xMassPosition, yMassPosition, servo1, servo2, servo3, delay);
    }
    if (length){
        console.log('You are in moveDistance');

        moveDistance(length, servo1, servo2, servo3, delay);
    }

    if (timeToWait) {
        wait(timeToWait);
        console.log(`You waited ${timeToWait} [ms]`);
    }
});

