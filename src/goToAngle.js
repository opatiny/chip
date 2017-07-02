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
    var servo = new five.Servo({
        address: 0x40,
        controller: "PCA9685",
        pin: 0,
    });


    var degrees = 90;

    servo.to(degrees);

});


