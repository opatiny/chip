const debug = require('debug')('tm:circle');
const delay = require('delay');
const {servo1, servo2, servo3} = require('./servoPins.js');



// function that returns the values of servos angles to move on a circle of given radius

// servo1, servo2, servo3 and delay are parameters of the variable because it was the only way to put them in the function.
async function movingOnCircle (radiusCenter, numberRotation = Infinity) {

    const maxRadiusCenter = require('./systemParameters3.js').maxRadiusCenter; // radius of the cylinder in [mm]
    if (radiusCenter === 'max') {
        radiusCenter = maxRadiusCenter;
    }

    debug(radiusCenter);

    const radiusServo = require('./systemParameters3.js').radiusServo; // rayon défini par l'axe du servo en [mm]
    const bigRadius = require('./systemParameters3.js').bigRadius; // distance between center of cylinder and center of servo [mm]
    const distance = require('./systemParameters3.js').distance; // distance between point on center circle of cylinder and end of servo axis [mm]


    const delayValue = 400/30; // the time to wait between to values of the angles in [ms]
    const step = 1; // the number of degrees that are added to angleCenter every time the servos move

    // parameters that depend on the servo characteristics
    const infoServo1 = require('./systemParameters3').infoServo1; // parameters of the angles of servo1
    const infoServo2 = require('./systemParameters3').infoServo2; // parameters of the angles of servo2
    const infoServo3 = require('./systemParameters3').infoServo3; // parameters of the angles of servo3
    const setServoAngle = require('./systemParameters3').setServoAngle; // function transforming angles of the servos setServoAngle()

    const formula = require('./returnAngleFormula.js');


    if (numberRotation >= 0){

        console.log('Moving on a positive circle');

        for (let currentRotation = 0; currentRotation < numberRotation; currentRotation++) {
            for (let angleCenter = 0; angleCenter < 360; angleCenter += step) {

                let r = radiusCenter;

                let xMassPosition1 = r * Math.cos(angleCenter / 180 * Math.PI);
                let yMassPosition1 = r * Math.sin(angleCenter / 180 * Math.PI);

                let xMassPosition2 = r * Math.cos((angleCenter + 120) / 180 * Math.PI);
                let yMassPosition2 = r * Math.sin((angleCenter + 120) / 180 * Math.PI);

                let xMassPosition3 = r * Math.cos((angleCenter + 240) / 180 * Math.PI);
                let yMassPosition3 = r * Math.sin((angleCenter + 240) / 180 * Math.PI);

                // console.log(xMassPosition1, yMassPosition1, xMassPosition2, yMassPosition2, xMassPosition3);

                let angle1 = setServoAngle( 180 - formula(xMassPosition1, yMassPosition1, bigRadius, radiusServo, distance), infoServo1 );
                let angle2 = setServoAngle( 180 - formula(xMassPosition2, yMassPosition2, bigRadius, radiusServo, distance), infoServo2 );
                let angle3 = setServoAngle( 180 - formula(xMassPosition3, yMassPosition3, bigRadius, radiusServo, distance), infoServo3 );

                debug(angleCenter +'\t' + angle1 +'\t' + angle2 +'\t' + angle3);

                servo1.to(angle1);
                servo2.to(angle2);
                servo3.to(angle3);

                await delay(delayValue);
            }
        }

    } else {

        console.log('Moving on a negative circle');

        for (let currentRotation = 0; currentRotation > numberRotation; currentRotation--) {
            for (let angleCenter = 360; angleCenter > 0; angleCenter -= step) {
                let r = radiusCenter;
                let xMassPosition1 = r * Math.cos(angleCenter / 180 * Math.PI);
                let yMassPosition1 = r * Math.sin(angleCenter / 180 * Math.PI);

                let xMassPosition2 = r * Math.cos((angleCenter + 120) / 180 * Math.PI);
                let yMassPosition2 = r * Math.sin((angleCenter + 120) / 180 * Math.PI);

                let xMassPosition3 = r * Math.cos((angleCenter + 240) / 180 * Math.PI);
                let yMassPosition3 = r * Math.sin((angleCenter + 240) / 180 * Math.PI);

                let angle1 = setServoAngle(180 - formula(xMassPosition1, yMassPosition1, bigRadius, radiusServo, distance), infoServo1);
                let angle2 = setServoAngle(180 - formula(xMassPosition2, yMassPosition2, bigRadius, radiusServo, distance), infoServo2);
                let angle3 = setServoAngle(180 - formula(xMassPosition3, yMassPosition3, bigRadius, radiusServo, distance), infoServo3);

                debug(angleCenter + '\t' + angle1 + '\t' + angle2 + '\t' + angle3);

                servo1.to(angle1);
                servo2.to(angle2);
                servo3.to(angle3);

                await delay(delayValue);
            }
        }
    }


}

module.exports = movingOnCircle;
