// http://johnny-five.io/examples/servo-PCA9685/
// control of one servo, the code brings it  to a given angle (degrees)

var five = require('johnny-five');
var chipio = require('chip-io');
var delay = require('delay');

var board = new five.Board({
    io: new chipio()
});

board.on("ready", function() {
    console.log("Connected");

    // Initialize the servo instance
    var servo1 = new five.Servo({
        address: 0x40,
        controller: "PCA9685",
        pin: 15
    });

    var servo2 = new five.Servo({
        address: 0x40,
        controller: "PCA9685",
        pin: 14
    });

    var servo3 = new five.Servo({
        address: 0x40,
        controller: "PCA9685",
        pin: 13
    });



    const angle = grab('--a');          // general angle of all the servos in degree
    const angle1 = grab('--a1');        // angle of servo1 in degree
    const angle2 = grab('--a2');        // angle of servo2 in degree
    const angle3 = grab('--a3');        // angle of servo3 in degree

    if (!angle && !(angle1 && angle2 && angle3)){
        console.log('No data to execute.');
    }


    if (angle) {
        servo1.to(angle);
        servo2.to(angle);
        servo3.to(angle);
        console.log(`Values of the angles are ${angle} degrees.` );
    }

    if (angle1 && angle2 && angle3) {
        servo1.to(angle1);
        servo2.to(angle2);
        servo3.to(angle3);
        console.log( `Values of the angles: servo1 = ${angle1}, servo2 = ${angle2}, servo3 = ${angle3}.` );
    }


});

function grab(flag) {
    let index=process.argv.indexOf(flag);
    return (index === -1) ? null : process.argv[index + 1];
}

