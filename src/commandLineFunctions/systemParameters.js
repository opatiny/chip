// parameters of cylinderPrototype2
// do not forget that angles are in rad in javascript!! (default)
/*
 const radiusServo = 16.2; // rayon défini par l'axe du servo en [mm]
 const bigRadius = 109.2; // distance between center of cylinder and center of servo [mm]
 const distance = 109.2; // distance between point on center circle of cylinder and end of servo axis [mm]
 const cylinderRadius = 150; // radius of the cylinder in [mm]
*/

/*
 REMARK: it seems that the angles of the servos do not correspond to normal angle, by that, it is ment that if a servo must
 go to 180 degrees from an initial position of 0, it will make more than half a circle. To counter this problem, we have seen
 that the best way for a servo to make 180 degrees (irl), is to make it sweep from 5 to 150 degrees. We do not begin at 0 degrees,
 because they are then tensions in the servos (they vibrate).
 irl servo (in degrees)
 0   5
 180 150
 */

// value of one degree of the servos in cylinderPrototype2
//const oneServoDegree = (150 - 5) / 180;

// parameters of cylinderPrototype3
// do not forget that angles are in rad in javascript!! (default)
const radiusServo = 50; // rayon défini par l'axe du servo en [mm]
const bigRadius = 100; // distance between center of cylinder and center of servo [mm]
const distance = 100; // distance between point on center circle of cylinder and end of servo axis [mm]
const cylinderRadius = 160; // radius of the cylinder in [mm]



// value of one degree of the servos in cylinderPrototype2
const oneServoDegree = 1;

module.exports = {
    radiusServo,
    bigRadius,
    distance,
    cylinderRadius,
    oneServoDegree,
};
