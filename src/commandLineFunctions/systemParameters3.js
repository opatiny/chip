'use strict'

// parameters of cylinderPrototype3
// do not forget that angles are in rad in javascript!! (default)
const radiusServo = 50; // rayon défini par l'axe du servo en [mm]
const bigRadius = 100; // distance between center of cylinder and center of servo [mm]
const distance = 100; // distance between point on center circle of cylinder and end of servo axis [mm]
const cylinderRadius = 160; // radius of the cylinder in [mm]



// value of one degree of the servos in cylinderPrototype3, servo model : MG996R

/* remarks:
    - 0 servo degrees can't be 0 true degrees because they aren't enough gears on the axis/servo connection -> soft compensation
    - see drive file 'Cylinders procedures'
 */


var infoServo1={
    trueMinAngle: 0, // minimal angle that the servo can really reach, this is equal to the minimal value of alpha (irl)
    trueMaxAngle: 156,  // maximal angle that the servo can really reach, this is equal to the maximal value of alpha (irl)
    servoZeroAngle: 10, // angle of the servo that correspond to an irl zero degree
    servoMaxAngle: 180 // maximal angle the servo can reach -> if you write i.e. 170, the servo won't move
};

var infoServo2={
    trueMinAngle: 0, // minimal angle that the servo can really reach, this is equal to the minimal value of alpha (irl)
    trueMaxAngle: 153,  // maximal angle that the servo can really reach, this is equal to the maximal value of alpha (irl)
    servoZeroAngle: 9, // angle of the servo that correspond to an irl zero degree
    servoMaxAngle: 180 // maximal angle the servo can reach -> if you write i.e. 170, the servo won't move
};

var infoServo3={
    trueMinAngle: 0, // minimal angle that the servo can really reach, this is equal to the minimal value of alpha (irl)
    trueMaxAngle: 152,  // maximal angle that the servo can really reach, this is equal to the maximal value of alpha (irl)
    servoZeroAngle: 11, // angle of the servo that correspond to an irl zero degree
    servoMaxAngle: 175 // maximal angle the servo can reach -> if you write i.e. 170, the servo won't move
};

// function that allows to transpose the angle given by the formula to the irl angle that the servo outputs
function setServoAngle( angle, info) {
    var trueAngle = Math.round(angle * (info.servoMaxAngle - info.servoZeroAngle) / (info.trueMaxAngle - info.trueMinAngle) + info.servoZeroAngle);
    return(trueAngle);
}

// console.log( setServoAngle(0, infoServo1) );
// console.log( setServoAngle(165, infoServo1) );

module.exports = {
    radiusServo,
    bigRadius,
    distance,
    cylinderRadius,
    infoServo1,
    infoServo2,
    infoServo3,
    setServoAngle
};
