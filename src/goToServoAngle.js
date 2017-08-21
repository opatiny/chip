// http://johnny-five.io/examples/servo-PCA9685/
// control of one servo, the code brings it to a given angle (degrees), the angle you give is directly transmitted to the servo

var five = require('johnny-five');
var chipio = require('chip-io');


var board = new five.Board({
    io: new chipio()
});

board.on('ready', function () {
    console.log('Connected');

    // Initialize the servo instance
    var servo1 = new five.Servo({
        address: 0x40,
        controller: 'PCA9685',
        pin: 15
    });

    var servo2 = new five.Servo({
        address: 0x40,
        controller: 'PCA9685',
        pin: 14
    });

    var servo3 = new five.Servo({
        address: 0x40,
        controller: 'PCA9685',
        pin: 13
    });

    servo2.tuning = {


    };


    const servoAngle = grab('--a'); // general angle of all the servos in degree or
    const servoAngle1 = grab('--a1'); // input angle of servo1 in degree
    const servoAngle2 = grab('--a2'); // input angle of servo2 in degree
    const servoAngle3 = grab('--a3'); // input servoangle of servo3 in degree

    if (!servoAngle && !servoAngle1 && !servoAngle2 && !servoAngle3) {
        console.log('No data to execute.');
    }


    if (servoAngle) {
        servo1.to(servoAngle);
        servo2.to(servoAngle);
        servo3.to(servoAngle);
        console.log(`Values of the servo input angles are ${servoAngle} degrees.`);
    }

    if (servoAngle1) {
        servo1.to(servoAngle1);
        console.log(`Servo input value of angle1 is ${servoAngle1} degrees.`);
    }
    if (servoAngle2) {
        servo2.to(servoAngle2);
        console.log(`Servo input value of angle2 is ${servoAngle2} degrees.`);
    }
    if (servoAngle3) {
        servo3.to(servoAngle3);
        console.log(`Servo input value of angle3 is ${servoAngle3} degrees.`);
    }


});

function grab(flag) {
    let index = process.argv.indexOf(flag);
    return (index === -1) ? null : process.argv[index + 1];
}

