
// code that allows to indicate what distance the cylinder should move, having related directly the number of rotations of the mass and of the cylinder (can be totally wrong)

const debug = require('debug')('cl:distance');
const delay = require('delay');
const {servo1, servo2, servo3} = require('../servoPins.js');

const cylinderPrototype = require('../preferences').cylinderPrototype;


async function moveDistance(length) {

    const delayValue = cylinderPrototype.delayValue; // the time to wait between to values of the angles in [ms]
    const step = cylinderPrototype.step; // the number of degrees that are added to angleCenter every time the servos move


    // parameters that depend on the system parameters
    const radiusServo = cylinderPrototype.radiusServo; // rayon défini par l'axe du servo en [mm]
    const bigRadius = cylinderPrototype.bigRadius; // distance between center of cylinder and center of servo [mm]
    const distance = cylinderPrototype.distance; // distance between point on center circle of cylinder and end of servo axis [mm]
    const cylinderRadius = cylinderPrototype.cylinderRadius; // radius of the cylinder in [mm]

    // parameters that depend on the servo characteristics
    const infoServo1 = cylinderPrototype.infoServo1; // parameters of the angles of servo1
    const infoServo2 = cylinderPrototype.infoServo2; // parameters of the angles of servo2
    const infoServo3 = cylinderPrototype.infoServo3; // parameters of the angles of servo3
    const setServoAngle = cylinderPrototype.setServoAngle; // function transforming angles of the servos setServoAngle()

    debug('Parameters required');


    var formula = require('../returnAngleFormula.js');

    debug('Formula required');


    // angle is the number of degrees the cylinder needs to move (angular position).
    var angle = 360 * length / (cylinderRadius * 2 * Math.PI);


    // in this case, we consider the maximal possible radius in the center
    const radiusCenter = radiusServo - 0.005;

    debug({radiusServo: radiusServo, radiusCenter: radiusCenter, P: 2 * Math.PI * cylinderRadius, angle: angle});


    for (var angleCenter = 0; angleCenter < angle; angleCenter += step) {
        var r = radiusCenter;

        var xMassPosition1 = r * Math.cos(angleCenter / 180 * Math.PI);
        var yMassPosition1 = r * Math.sin(angleCenter / 180 * Math.PI);

        var xMassPosition2 = r * Math.cos((angleCenter + 120) / 180 * Math.PI);
        var yMassPosition2 = r * Math.sin((angleCenter + 120) / 180 * Math.PI);

        var xMassPosition3 = r * Math.cos((angleCenter + 240) / 180 * Math.PI);
        var yMassPosition3 = r * Math.sin((angleCenter + 240) / 180 * Math.PI);

        var angle1 = setServoAngle(180 - formula(xMassPosition1, yMassPosition1, bigRadius, radiusServo, distance), infoServo1);
        var angle2 = setServoAngle(180 - formula(xMassPosition2, yMassPosition2, bigRadius, radiusServo, distance), infoServo2);
        var angle3 = setServoAngle(180 - formula(xMassPosition3, yMassPosition3, bigRadius, radiusServo, distance), infoServo3);

        console.log(angleCenter, angle1, angle2, angle3);

        servo1.to(angle1);
        servo2.to(angle2);
        servo3.to(angle3);

        await delay(delayValue);
    }


}

module.exports = moveDistance;
