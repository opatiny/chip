'use strict'
// code that moves the mass to an x,y position
const debug = require('debug')('cl:point');

const delay = require('delay');
const {servo1, servo2, servo3} = require('../servoPins.js');

const cylinderPrototype = require('../preferences').cylinderPrototype;


async function goToPoint(xMassPosition, yMassPosition) {

    const radiusServo = cylinderPrototype.radiusServo; // rayon défini par l'axe du servo en [mm]
    const bigRadius = cylinderPrototype.bigRadius; // distance between center of cylinder and center of servo [mm]
    const distance = cylinderPrototype.distance; // distance between point on center circle of cylinder and end of servo axis [mm]

    // parameters that depend on the servo characteristics
    const infoServo1 = cylinderPrototype.infoServo1; // parameters of the angles of servo1
    const infoServo2 = cylinderPrototype.infoServo2; // parameters of the angles of servo2
    const infoServo3 = cylinderPrototype.infoServo3; // parameters of the angles of servo3
    const setServoAngle = cylinderPrototype.setServoAngle; // function transforming angles of the servos setServoAngle()

    debug('Parameters required');

    var formula = require('../returnAngleFormula.js');

    debug('Formula required');


    // every point in the cylinder is on a circle of center G.
    var r = (xMassPosition ** 2 + yMassPosition ** 2) ** 0.5;

    var xMassPosition2 = r * Math.cos(120 / 180 * Math.PI);
    var yMassPosition2 = r * Math.sin(120 / 180 * Math.PI);

    var xMassPosition3 = r * Math.cos(240 / 180 * Math.PI);
    var yMassPosition3 = r * Math.sin(240 / 180 * Math.PI);


    var angle1 = setServoAngle(180 - formula(xMassPosition, yMassPosition, bigRadius, radiusServo, distance), infoServo1);
    var angle2 = setServoAngle(180 - formula(xMassPosition2, yMassPosition2, bigRadius, radiusServo, distance), infoServo2);
    var angle3 = setServoAngle(180 - formula(xMassPosition3, yMassPosition3, bigRadius, radiusServo, distance), infoServo3);


    debug(xMassPosition, yMassPosition, angle1, angle2, angle3);

    servo1.to(angle1);
    servo2.to(angle2);
    servo3.to(angle3);

    await delay(50);

}

module.exports = goToPoint;
