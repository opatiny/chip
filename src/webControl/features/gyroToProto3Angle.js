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

    var angleConvertor = {codeAngle0: 1, codeAngle90: 91, codeangle180: 181, codeAngle270: 271}

    if (angleConvertor.codeAngle0 <= inclination < angleConvertor.codeAngle90) {
        baseAngle = (inclination - angleConvertor.codeAngle0) * 90 / (angleConvertor.codeAngle90 - angleConvertor.codeAngle0);
    } else if (angleConvertor.codeAngle90 <= inclination < angleConvertor.codeAngle180) {
        baseAngle = (inclination - angleConvertor.codeAngle90) * 90 / (angleConvertor.codeAngle180 - angleConvertor.codeAngle90) + 90;
    } else if (angleConvertor.codeAngle180 <= inclination < angleConvertor.codeAngle270) {
        baseAngle = (inclination - angleConvertor.codeAngle180) * 90 / (angleConvertor.codeAngle270 - angleConvertor.codeAngle180) + 180;
    } else if (angleConvertor.codeAngle270 <= inclination < angleConvertor.codeAngle0) {
        baseAngle = (inclination - angleConvertor.codeAngle270) * 90 / (angleConvertor.codeAngle0 - angleConvertor.codeAngle270) + 270;
    }

    debug('baseAngle' + '\t' + baseAngle);

    return baseAngle;
}

module.exports = toPrototypeInclination;
