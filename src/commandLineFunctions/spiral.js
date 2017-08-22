const debug = require('debug')('tm:spiral');

const delay = require('delay');
const {servo1, servo2, servo3} = require('./servoPins.js');

const cylinderPrototype = require('../preferences').cylinderPrototype;

// function that returns the values of servos angles to move on a spiral with the number of rotations as a parameter (-- spires)

// servo1, servo2, servo3 and delay are parameters of the variable because it was the only way to put them in the function.
async function spiral(numberSpires) {


    const radiusServo = cylinderPrototype.radiusServo; // rayon défini par l'axe du servo en [mm]
    const bigRadius = cylinderPrototype.bigRadius; // distance between center of cylinder and center of servo [mm]
    const distance = cylinderPrototype.distance; // distance between point on center circle of cylinder and end of servo axis [mm]
    const radiusCenter = cylinderPrototype.radiusServo - 10; // maximal possible radius with cylinderPrototype2

    // parameters that depend on the servo characteristics
    const infoServo1 = cylinderPrototype.infoServo1; // parameters of the angles of servo1
    const infoServo2 = cylinderPrototype.infoServo2; // parameters of the angles of servo2
    const infoServo3 = cylinderPrototype.infoServo3; // parameters of the angles of servo3
    const setServoAngle = cylinderPrototype.setServoAngle; // function transforming angles of the servos setServoAngle()

    debug('Parameters required');

    var formula = require('./returnAngleFormula.js');

    debug('Formula required');


    console.log(numberSpires);

    var counter = 0;
    for (var currentRotation = 0; currentRotation < numberSpires; currentRotation++) {
        for (var angleCenter = 0; angleCenter < 360; angleCenter += 5) {
            var r = radiusCenter - counter++ * radiusCenter / 72 / numberSpires;
            var xMassPosition1 = r * Math.cos(angleCenter / 180 * Math.PI);
            var yMassPosition1 = r * Math.sin(angleCenter / 180 * Math.PI);

            var xMassPosition2 = r * Math.cos((angleCenter + 120) / 180 * Math.PI);
            var yMassPosition2 = r * Math.sin((angleCenter + 120) / 180 * Math.PI);

            var xMassPosition3 = r * Math.cos((angleCenter + 240) / 180 * Math.PI);
            var yMassPosition3 = r * Math.sin((angleCenter + 240) / 180 * Math.PI);

            var angle1 = setServoAngle(180 - formula(xMassPosition1, yMassPosition1, bigRadius, radiusServo, distance), infoServo1);
            var angle2 = setServoAngle(180 - formula(xMassPosition2, yMassPosition2, bigRadius, radiusServo, distance), infoServo2);
            var angle3 = setServoAngle(180 - formula(xMassPosition3, yMassPosition3, bigRadius, radiusServo, distance), infoServo3);

            console.log(r.toPrecision(4), angle1, angle2, angle3);

            servo1.to(angle1);
            servo2.to(angle2);
            servo3.to(angle3);

            await delay(25);
        }
    }

}

module.exports = spiral;
