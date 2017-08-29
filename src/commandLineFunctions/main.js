'use strict'
/* This document will require all the different functions that we developed, like making to rotations,
 going to a specific point, moving three meters forward or backwards,... It uses command line arguments
 (https://www.youtube.com/watch?v=yTJ9OJmbiHU).

 To run the code just use
 node main --? numberYouWant --? otherNumberYouWant
*/

var debug = require('debug')('cl:main');
var Five = require('johnny-five');
var ChipIO = require('../preferences.js').ChipIO;
debug('chipio required');

var delay = require('delay');

var board = new Five.Board({
    io: new ChipIO()
});

debug('new chipio');

var goToPoint = require('./goToPoint.js');
var movingOnCircle = require('./movingOnCircle.js');
var moveDistance = require('./moveDistance.js');
var spiral = require('./spiral.js');
var goToAngle = require('./goToAngle.js');

debug('functions required');

board.on('ready', async function () {
    debug('Connected');

    function grab(flag) {
        let index = process.argv.indexOf(flag);
        return (index === -1) ? undefined : process.argv[index + 1];
    }

    // parameters that can vary (here, they come from the process.argv)
    const radiusCenter = grab('--r'); // radius of the circle the mass runs on in [mm]
    const numberRotation = grab('--tour'); // number of rotations we want the mass to do (whole numbers), if it is unlimited, write Infinity
    const xMassPosition = grab('--x'); // x component of mass position in [mm]
    const yMassPosition = grab('--y'); // y component of mass position in [mm]
    const length = grab('--l'); // distance the cylinder has to move in [mm]
    const timeToWait = grab('--d'); // delay to wait [ms]
    const numberSpires = grab('--spires'); // number of time you want the mass to go around on your spiral
    const angleCenter = grab('--a'); // value of the angle of the mass in degrees

    debug(radiusCenter, numberRotation, xMassPosition, yMassPosition, length, timeToWait, angleCenter);

    if (!(radiusCenter && numberRotation) && !(xMassPosition && yMassPosition) && !length && !timeToWait && !numberSpires && !(angleCenter && radiusCenter)) {
        console.log('No data to execute.');
    }


    if (timeToWait) {
        await delay(timeToWait);
        console.log(`You waited ${timeToWait} [ms]`);
    }

    if (radiusCenter && numberRotation) {
        console.log('You are in movingOnCircle');
        await movingOnCircle(radiusCenter, numberRotation);
    }
    if (xMassPosition && yMassPosition) {
        console.log('You are in goToPoint');
        await goToPoint(xMassPosition, yMassPosition);
    }
    if (length) {
        console.log('You are in moveDistance');
        await moveDistance(length);
    }

    if (numberSpires) {
        console.log('You are in spiral');
        await spiral(numberSpires);
    }

    if (angleCenter && radiusCenter) {
        console.log('You are in goToAngle');
        await goToAngle(angleCenter, radiusCenter);
    }

    debug('end of code');
    process.exit(0);

});

