'use strict'
// function that allows to make the mass move to a certain angle (angleCenter) on a circle of given radius.

const Five = require('johnny-five');
const debug = require('debug')('ru:GYtoAngle');
const delay = require('delay');
debug('Packages required');

//var constantPosition = require('./constantPosition.js');
debug('Function required');

function gyroToAngle(radiusCenter, direction) {

    var accelerometer = new Five.Accelerometer({
        controller: 'MPU6050',
        sensitivity: 16384 // optional
    });

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

        var baseAngle;

        if (48 <= inclination < 137) {
             baseAngle = (inclination - 48)*90 / (137 - 48)
        } else if (137 <= inclination < 222.5) {
             baseAngle = (inclination - 137)*90 / (222.5 - 137) + 90
        } else if (222.5 <= inclination < 313) {
            baseAngle = (inclination - 222.5)*90 / (313 - 222.5) + 180
        } else if (313 <= inclination < 48) {
            baseAngle = (inclination - 313)*90 / (48 - 313) + 270
        }

        debug('baseAngle defined');



        var angleCenter;

        if (direction === 'b') {
            angleCenter = baseAngle - 90
        } else {
            angleCenter = baseAngle + 90
        }

        debug('angleCenter defined');


        await constantPosition(radiusCenter, angleCenter);

    });

}

module.exports = gyroToAngle;

/**
 * Created by opatiny on 8/29/17.
 */
