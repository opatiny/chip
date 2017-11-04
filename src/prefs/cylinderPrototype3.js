
// parameters of cylinderPrototype3
// do not forget that angles are in rad in javascript!! (default)

const delayValue = 800 / 30; // the time to wait between to values of the angles in [ms]
const step = 1; // the number of degrees that are added to angleCenter every time the servos move


const radiusServo = 50; // rayon défini par l'axe du servo en [mm]
const maxRadiusCenter = 40; // rayon défini par l'axe du servo en [mm]

const bigRadius = 100; // distance between center of cylinder and center of servo [mm]
const distance = 100; // distance between point on center circle of cylinder and end of servo axis [mm]
const cylinderRadius = 160; // radius of the cylinder in [mm]


// value of one degree of the servos in cylinderPrototype3, servo model : MG996R

/* remarks:
    - 0 servo degrees can't be 0 true degrees because they aren't enough gears on the axis/servo connection -> soft compensation
    - see drive file 'Cylinders procedures'
 */


var infoServo1 = {
    minRealAngle: 0, // minimal angle that the servo can really reach, this is equal to the minimal value of alpha (irl)
    maxRealAngle: 156, // maximal angle that the servo can really reach, this is equal to the maximal value of alpha (irl)
    codeMinAngle: 10, // angle of the servo that correspond to an irl zero degree
    codeMaxAngle: 180 // maximal angle the servo can reach -> if you write i.e. 170, the servo won't move
};

var infoServo2 = {
    minRealAngle: 0, // minimal angle that the servo can really reach, this is equal to the minimal value of alpha (irl)
    maxRealAngle: 153, // maximal angle that the servo can really reach, this is equal to the maximal value of alpha (irl)
    codeMinAngle: 9, // angle of the servo that correspond to an irl zero degree
    codeMaxAngle: 180 // maximal angle the servo can reach -> if you write i.e. 170, the servo won't move
};

var infoServo3 = {
    minRealAngle: 0, // minimal angle that the servo can really reach, this is equal to the minimal value of alpha (irl)
    maxRealAngle: 152, // maximal angle that the servo can really reach, this is equal to the maximal value of alpha (irl)
    codeMinAngle: 11, // angle of the servo that correspond to an irl zero degree
    codeMaxAngle: 175 // maximal angle the servo can reach -> if you write i.e. 170, the servo won't move
};

// function that allows to transpose the angle given by the formula to the irl angle that the servo outputs
function setServoAngle(angle, info) {
    var trueAngle = Math.round(angle * (info.codeMaxAngle - info.codeMinAngle) / (info.maxRealAngle - info.minRealAngle) + info.codeMinAngle);
    return (trueAngle);
}

// console.log( setServoAngle(0, infoServo1) );
// console.log( setServoAngle(165, infoServo1) );

module.exports = {
    delayValue,
    step,
    radiusServo,
    bigRadius,
    distance,
    cylinderRadius,
    maxRadiusCenter,
    infoServo1,
    infoServo2,
    infoServo3,
    setServoAngle
};
