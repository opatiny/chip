// function that accepts 'inclination', a this. property of accelerometer.
// It returns the angle corrected and adapted to cp3.


const debug = require('debug')('wc:gyroToProtoAngle'); // wc for web control

function toPrototypeInclination(inclination) {

    if (inclination < 0) {
        inclination = Math.abs(inclination);
    } else {
        inclination = 360 - Math.abs(inclination);
    }
    debug('corrected inclination' + '\t' + inclination);

    var baseAngle; // the angle of the gyro that corresponds to the balanced position of the cylinder for a certain theta

    // code that allows to assign the angleCenter of the balanced position of the cylinder, for any value of the accelerometer.
    // These assignations are based on cylinderPrototype3 and the particular position of the gyro on that prototype
    if (48 <= inclination < 137) {
        baseAngle = (inclination - 48) * 90 / (137 - 48);
    } else if (137 <= inclination < 222.5) {
        baseAngle = (inclination - 137) * 90 / (222.5 - 137) + 90;
    } else if (222.5 <= inclination < 313) {
        baseAngle = (inclination - 222.5) * 90 / (313 - 222.5) + 180;
    } else if (313 <= inclination < 48) {
        baseAngle = (inclination - 313) * 90 / (48 - 313) + 270;
    }

    debug('baseAngle' + '\t' + baseAngle);

    return baseAngle;
}

module.exports = toPrototypeInclination;
