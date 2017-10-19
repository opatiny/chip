const debug = require('debug')('wc:index'); // wc for web control
const delay = require('delay');
const Five = require('johnny-five');
const ChipIO = require('../preferences.js').ChipIO;
const express = require('express');
const app = express();
require('express-ws')(app);
debug('Packages required');

const cylinderPrototype = require('../preferences.js').cylinderPrototype;
debug('cylinder parameters required');

const prefs = require('./ws');
debug('prefs required');

    var board = new Five.Board({
        io: new ChipIO()
    });
    debug('board created');


    const toPrototypeInclination = require('./features/gyroToProto3Angle');
    const toAlpha = require('./features/toAlphaFunction');
    const control = require('./features/control');
    const stable = require('./features/stable');
    debug('toAlpha, toPrototypeInclination, control functions required');

    board.on('ready', async function () {

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
            debug('Number of changes detected: ' + newCounter);

            const result = {
                inclination: this.inclination
            };
            let inclination = result.inclination;
            // debug('inclination' + '\t' + inclination);

            const baseAngle = toPrototypeInclination(inclination);
            var angleCenter;
            var radiusCenter;

            if (prefs.algorithm === 'control') {
                angleCenter = await control(baseAngle, prefs);
                radiusCenter = Math.abs(prefs.radius);
                debug('radiusCenter; ' + radiusCenter);
            } else if (prefs.algorithm === 'center') {
                angleCenter = 0;
                radiusCenter = 0;
            } else if (prefs.algorithm === 'stabilization') {

                inclinationLog = [inclinationLog[inclinationLog.length - 1]]; // this allows to have the two last values of inclination
                debug('inclination log' + '\t' + inclinationLog);

                inclinationLog.push(inclination);
                debug('inclination log' + '\t' + inclinationLog);

                angleCenter = await stable(inclinationLog, angleCenterLog);
                angleCenterLog.push(angleCenter);

                radiusCenter = cylinderPrototype.maxRadiusCenter;
                debug('radiusCenter: ' + radiusCenter);
            }

            await toAlpha(radiusCenter, angleCenter);
        });

    });

