var debug = require('debug')('tm:circle');

// function that returns the values of servos angles to move on a spiral with the number of rotations as a parameter (-- spires)

// servo1, servo2, servo3 and delay are parameters of the variable because it was the only way to put them in the function.
async function spiral (numberSpires, servo1, servo2, servo3, delay) {

    const radiusServo = require('./systemParameters.js').radiusServo; // rayon défini par l'axe du servo en [mm]
    const bigRadius = require('./systemParameters.js').bigRadius; // distance between center of cylinder and center of servo [mm]
    const distance = require('./systemParameters.js').distance; // distance between point on center circle of cylinder and end of servo axis [mm]
    const cylinderRadius = require('./systemParameters.js').cylinderRadius; // radius of the cylinder in [mm]
    const radiusCenter = 16.195; // maximal possible radius with cylinderPrototype2
    /*
     REMARK: it seems that the angles of the servos do not correspond to normal angle, by that, it is ment that if a servo must
     go to 180 degrees from an initial position of 0, it will make more than half a circle. To counter this problem, we have seen
     that the best way for a servo to make 180 degrees (irl), is to make it sweep from 5 to 150 degrees. We do not begin at 0 degrees,
     because they are then tensions in the servos (they vibrate).
     irl servo (in degrees)
     0   5
     180 150
     */
    const oneServoDegree = require('./systemParameters.js').oneServoDegree;

    var formula = require('./returnAngleFormula.js');

    console.log(numberSpires);

    var counter=0;
    for (var currentRotation = 0; currentRotation < numberSpires; currentRotation++) {
        for (var angleCenter = 0; angleCenter < 360; angleCenter += 5) {
            var r = radiusCenter - counter++ * radiusCenter / 72 / numberSpires;
            var xMassPosition1 = r * Math.cos(angleCenter / 180 * Math.PI);
            var yMassPosition1 = r * Math.sin(angleCenter / 180 * Math.PI);

            var xMassPosition2 = r * Math.cos((angleCenter + 120) / 180 * Math.PI);
            var yMassPosition2 = r * Math.sin((angleCenter + 120) / 180 * Math.PI);

            var xMassPosition3 = r * Math.cos((angleCenter + 240) / 180 * Math.PI);
            var yMassPosition3 = r * Math.sin((angleCenter + 240) / 180 * Math.PI);

            var angle1 = Math.round(5 + oneServoDegree * formula(xMassPosition1, yMassPosition1, bigRadius, radiusServo, distance));
            var angle2 = Math.round(5 + oneServoDegree * formula(xMassPosition2, yMassPosition2, bigRadius, radiusServo, distance));
            var angle3 = Math.round(5 + oneServoDegree * formula(xMassPosition3, yMassPosition3, bigRadius, radiusServo, distance));

            console.log(r.toPrecision(4), angle1, angle2, angle3);

            servo1.to(angle1);
            servo2.to(angle2);
            servo3.to(angle3);

            await delay(25);
        }
    }

}

module.exports = spiral;
