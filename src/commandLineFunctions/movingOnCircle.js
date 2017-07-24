const debug = require('debug')('tm:circle');
const delay = require('delay');
const {servo1, servo2, servo3} = require('./servoPins.js');

// function that returns the values of servos angles to move on a circle of given radius

// servo1, servo2, servo3 and delay are parameters of the variable because it was the only way to put them in the function.
async function movingOnCircle (radiusCenter, numberRotation = Infinity) {




    const radiusServo = require('./systemParameters3.js').radiusServo; // rayon défini par l'axe du servo en [mm]
    const bigRadius = require('./systemParameters3.js').bigRadius; // distance between center of cylinder and center of servo [mm]
    const distance = require('./systemParameters3.js').distance; // distance between point on center circle of cylinder and end of servo axis [mm]
    const cylinderRadius = require('./systemParameters3.js').cylinderRadius; // radius of the cylinder in [mm]

    // parameters that depend on the servo characteristics
    const infoServo1 = require('./systemParameters3').infoServo1; // parameters of the angles of servo1
    const infoServo2 = require('./systemParameters3').infoServo2; // parameters of the angles of servo2
    const infoServo3 = require('./systemParameters3').infoServo3; // parameters of the angles of servo3
    const setServoAngle = require('./systemParameters3').setServoAngle; // function transforming angles of the servos setServoAngle()

    var formula = require('./returnAngleFormula.js');


    for (var currentRotation = 0; currentRotation < numberRotation; currentRotation++) {
        for (var angleCenter = 0; angleCenter < 360; angleCenter += 1) {
            var r = radiusCenter;
            var xMassPosition1 = r * Math.cos(angleCenter / 180 * Math.PI);
            var yMassPosition1 = r * Math.sin(angleCenter / 180 * Math.PI);

            var xMassPosition2 = r * Math.cos((angleCenter + 120) / 180 * Math.PI);
            var yMassPosition2 = r * Math.sin((angleCenter + 120) / 180 * Math.PI);

            var xMassPosition3 = r * Math.cos((angleCenter + 240) / 180 * Math.PI);
            var yMassPosition3 = r * Math.sin((angleCenter + 240) / 180 * Math.PI);

            var angle1 = setServoAngle( 180 - formula(xMassPosition1, yMassPosition1, bigRadius, radiusServo, distance), infoServo1 );
            var angle2 = setServoAngle( 180 - formula(xMassPosition2, yMassPosition2, bigRadius, radiusServo, distance), infoServo2 );
            var angle3 = setServoAngle( 180 - formula(xMassPosition3, yMassPosition3, bigRadius, radiusServo, distance), infoServo3 );

            console.log(angleCenter +'\t' + angle1);

            servo1.to(angle1);
            servo2.to(angle2);
            servo3.to(angle3);

            await delay(400/30);
        }
    }

}

module.exports = movingOnCircle;
