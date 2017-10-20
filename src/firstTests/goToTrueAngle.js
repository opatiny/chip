// http://johnny-five.io/examples/servo-PCA9685/
// control of one servo, the code brings it to a given angle irl (degrees)

const debug = require('debug')('ft:trueAngle');

var Five = require('johnny-five');
var ChipIO = require('../preferences.js').ChipIO;
const cylinderPrototype = require('../preferences').cylinderPrototype;

// Initialize the servo instance
const {servo1, servo2, servo3} = require('../servoPins.js');

debug('Packages required');

var board = new Five.Board({
    io: new ChipIO()
});

board.on('ready', function () {
    console.log('Connected');

    // parameters that depend on the servo characteristics
    const infoServo1 = cylinderPrototype.infoServo1; // parameters of the angles of servo1
    const infoServo2 = cylinderPrototype.infoServo2; // parameters of the angles of servo2
    const infoServo3 = cylinderPrototype.infoServo3; // parameters of the angles of servo3
    const setServoAngle = cylinderPrototype.setServoAngle; // function transforming angles of the servos setServoAngle()


    const trueAngle = grab('--a'); // general angle of all the servos in degree or
    const trueAngle1 = grab('--a1'); // angle of servo1 in degree
    const trueAngle2 = grab('--a2'); // angle of servo2 in degree
    const trueAngle3 = grab('--a3'); // angle of servo3 in degree

    if (!trueAngle && !trueAngle1 && !trueAngle2 && !trueAngle3) {
        console.log('No data to execute.');
    }


    if (trueAngle) {
        let servoAngle1 = setServoAngle(trueAngle, infoServo1);
        let servoAngle2 = setServoAngle(trueAngle, infoServo2);
        let servoAngle3 = setServoAngle(trueAngle, infoServo3);
        servo1.to(servoAngle1);
        servo2.to(servoAngle2);
        servo3.to(servoAngle3);
        console.log(`trueAngle: ${trueAngle}, servoAngle1: ${servoAngle1}, servoAngle2: ${servoAngle2}, servoAngle3: ${servoAngle3} `);
    }

    if (trueAngle1) {
        let servoAngle1 = setServoAngle(trueAngle1, infoServo1);
        servo1.to(servoAngle1);
        console.log(`trueAngle1: ${trueAngle1}, servoAngle1: ${servoAngle1}`);
    }
    if (trueAngle2) {
        let servoAngle2 = setServoAngle(trueAngle2, infoServo2);
        servo1.to(servoAngle2);
        console.log(`trueAngle2: ${trueAngle2}, servoAngle2: ${servoAngle2}`);
    }
    if (trueAngle3) {
        let servoAngle3 = setServoAngle(trueAngle3, infoServo3);
        servo1.to(servoAngle3);
        console.log(`trueAngle3: ${trueAngle3}, servoAngle3: ${servoAngle3}`);
    }

});


function grab(flag) {
    let index = process.argv.indexOf(flag);
    return (index === -1) ? null : process.argv[index + 1];
}

