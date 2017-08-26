'use strict'
// formula that returns the angle of the servos depending on the angle in the center (defines mass position)
// angleServo are the angles of the three different servos, they are between 0 and 180 degrees

// do not forget that angles are in rad in javascript!! (default)

function formula(xMassPosition, yMassPosition, bigRadius, radiusServo, distance) {

    var x = xMassPosition;
    var y = yMassPosition;
    var d = distance;
    var R = bigRadius;
    var s = radiusServo;

    var delta = x ** 2 + y ** 2 + s ** 2 - d ** 2 - R ** 2;

    // a is the x component of a point situated on the circle described by the end of the servos axis, this function returns two values on the circle (a1, a2), but only one is correct.

    var root = 4 * (y ** 2 * R ** 2 - R * (R - x) * delta + y ** 2 * (s ** 2 - R ** 2) + (s ** 2 - R ** 2) * (R - x) ** 2) - delta ** 2;

    var a1 = (2 * y ** 2 * R - (R - x) * delta + y * Math.sqrt(root)) / (2 * (y ** 2 + (R - x) ** 2));
    var a2 = (2 * y ** 2 * R - (R - x) * delta - y * Math.sqrt(root)) / (2 * (y ** 2 + (R - x) ** 2));

    // console.log(a1,a2);

    var a;
    if ((y > 0) || (y === 0)) {
        a = Math.max(a1, a2);
    } else {
        a = Math.min(a1, a2);
    }

    let result = Math.acos((a - R) / s) / Math.PI * 180;

    return result;
}

module.exports = formula;

/* just to check the results in the console
var results=[];

var angleCenter;
for(angleCenter = 0; angleCenter < 360; angleCenter += 5) {
    var angleServo = Math.round( formula(angleCenter, radiusCenter, bigRadius, radiusServo, distance) );
    var angleServo2 = Math.round( formula((angleCenter+120), radiusCenter, bigRadius, radiusServo, distance) );
    var angleServo3 = Math.round( formula((angleCenter+240), radiusCenter, bigRadius, radiusServo, distance) );

    results.push({
        angleCenter,
        angleServo,
        angleServo2,
        angleServo3
    });

    console.log(angleServo3);
    // console.log(angleCenter + '\t' + angleServo + '\t' + angleServo2 + '\t' + angleServo3);
}


 var angleServo = formula(angleCenter, radiusCenter, bigRadius, radiusServo, distance);
 console.log(angleServo);
 */

//console.log(results);
