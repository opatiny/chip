// function that returns the values of servos angles to move on a circle of given radius

// servo1, servo2, servo3 and delay are parameters of the variable because it was the only way to put them in the function.
async function movingOnCircle (radiusCenter, numberRotation, servo1, servo2, servo3, delay) {

    const radiusServo = require('./systemParameters.js').radiusServo; // rayon défini par l'axe du servo en [mm]
    const bigRadius = require('./systemParameters.js').bigRadius; // distance between center of cylinder and center of servo [mm]
    const distance = require('./systemParameters.js').distance; // distance between point on center circle of cylinder and end of servo axis [mm]
    const cylinderRadius = require('./systemParameters.js').cylinderRadius; // radius of the cylinder in [mm]
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


    for (var currentRotation = 0; currentRotation < numberRotation; currentRotation++) {
        for (var angleCenter = 0; angleCenter < 360; angleCenter += 5) {
            var r = radiusCenter;
            var xMassPosition1 = r * Math.cos(angleCenter / 180 * Math.PI);
            var yMassPosition1 = r * Math.sin(angleCenter / 180 * Math.PI);

            var xMassPosition2 = r * Math.cos((angleCenter + 120) / 180 * Math.PI);
            var yMassPosition2 = r * Math.sin((angleCenter + 120) / 180 * Math.PI);

            var xMassPosition3 = r * Math.cos((angleCenter + 240) / 180 * Math.PI);
            var yMassPosition3 = r * Math.sin((angleCenter + 240) / 180 * Math.PI);

            var angle1 = Math.round(5 + oneServoDegree * formula(xMassPosition1, yMassPosition1, bigRadius, radiusServo, distance));
            var angle2 = Math.round(5 + oneServoDegree * formula(xMassPosition2, yMassPosition2, bigRadius, radiusServo, distance));
            var angle3 = Math.round(5 + oneServoDegree * formula(xMassPosition3, yMassPosition3, bigRadius, radiusServo, distance));

            console.log(angleCenter, angle1, angle2, angle3);

            servo1.to(angle1);
            servo2.to(angle2);
            servo3.to(angle3);

            await delay(50);
        }
    }

}

module.exports = movingOnCircle;
