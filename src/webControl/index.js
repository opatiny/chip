const debug = require('debug')('wc:index'); // wc for web control
const Five = require('johnny-five');
const ChipIO = require('../preferences.js').ChipIO;



debug('Packages required');

const cylinderPrototype = require('../preferences.js').cylinderPrototype;
debug('cylinder parameters required');

const remotePrefs = require('./ws');
debug('prefs required');

var board = new Five.Board({
    io: new ChipIO()
});
debug('board created');


const toPrototypeInclination = require('./features/gyroToProto3Angle');
const toAlpha = require('./features/toAlphaFunction');
const control = require('./features/control');
const stable = require('./features/stable');
const stablePid = require('./features/stable-pid');
debug('toAlpha, toPrototypeInclination, control functions required');

board.on('ready', async function () {

    var accelerometer = new Five.Accelerometer({
        controller: 'MPU6050',
        sensitivity: 1024 // optional
    });
    debug('Accelerometer defined');

    var counter = 0; // to count the number of changes
    var inclinationLog = [0, 0];
    var stabilizationPID = {
        previousInclination: 0,
        currentInclination: 0,
        targetInclination: 0,
        radiusCenter: 0
    };
    var angleCenterLog = [0];

    accelerometer.on('change', async function () {

        let newCounter = counter++;
        // debug('Number of changes detected: ' + newCounter);

        const result = {
            inclination: this.inclination
        };
        let inclination = result.inclination;

        if (remotePrefs.ws) {
            remotePrefs.ws.send(inclination);
        }
 
        debug('inclination' + '\t' + inclination);

        const baseAngle = toPrototypeInclination(inclination);
        var angleCenter;
        var radiusCenter;

        if (remotePrefs.algorithm === 'control') {
            angleCenter = await control(baseAngle, remotePrefs);
            radiusCenter = Math.abs(remotePrefs.radius);
            debug('radiusCenter; ' + radiusCenter);
        } else if (remotePrefs.algorithm === 'center') {
            angleCenter = 0;
            radiusCenter = 0;
        } else if (remotePrefs.algorithm === 'stabilization') {

            inclinationLog = [inclinationLog[inclinationLog.length - 1]]; // this allows to have the two last values of inclination
            debug('inclination log' + '\t' + inclinationLog);

            inclinationLog.push(inclination);
            debug('inclination log' + '\t' + inclinationLog);

            angleCenter = await stable(inclinationLog, angleCenterLog);
            angleCenterLog.push(angleCenter);

            radiusCenter = cylinderPrototype.maxRadiusCenter;
            debug('radiusCenter: ' + radiusCenter);
        } else if (remotePrefs.algorithm === 'pid') {
            
            stabilizationPID.previousInclination = stabilizationPID.currentInclination;
            stabilizationPID.currentInclination = inclination;

            debug('inclination log' + '\t' + stabilizationPID);

            radiusCenter = stablePid(stabilizationPID);
            if (radiusCenter < 0) {
                angleCenter = baseAngle - 90;
            } else {
                angleCenter = baseAngle + 90;
            }

            console.log('radiusCenter: ',radiusCenter, 'angleCenter: ', angleCenter);
        }

        await toAlpha(radiusCenter, angleCenter);
    });

});

