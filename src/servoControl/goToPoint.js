// program that allows move the mass on any circle using CHIP

var five = require('johnny-five');
var chipio = require('chip-io');
var delay = require('delay');

var board = new five.Board({
    io: new chipio()
});

board.on("ready", async function () {
    console.log("Connected");

    // Initialize the servo instance
    var servo1 = new five.Servo({
        address: 0x40,
        controller: "PCA9685",
        pin: 15
    });
    console.log("servo1 initialized");

    var servo2 = new five.Servo({
        address: 0x40,
        controller: "PCA9685",
        pin: 14
    });
    console.log("servo2 initialized");


    var servo3 = new five.Servo({
        address: 0x40,
        controller: "PCA9685",
        pin: 13
    });
    console.log("servo3 initialized");



    var formula = require('./returnAngleFormula.js');


    /*
     REMARK: it seems that the angles of the servos do not correspond to normal angle, by that, it is ment that if a servo must
     go to 180 degrees from an initial position of 0, it will make more than half a circle. To counter this problem, we have seen
     that the best way for a servo to make 180 degrees (irl), is to make it sweep from 5 to 150 degrees. We do not begin at 0 degrees,
     because they are then tensions in the servos (they vibrate).
     irl servo (in degrees)
     0   5
     180 150
     */
    var oneServoDegree  = 1; // (150 - 5) / 180;

    // parameters of the cylinder
    // do not forget that angles are in rad in javascript!! (default)
    var radiusServo = 16.2; // rayon défini par l'axe du servo en [mm]
    var bigRadius = 109.2; // distance between center of cylinder and center of servo [mm]
    var distance = 109.2; // distance between point on center circle of cylinder and end of servo axis [mm]

    // parameters that can vary
    var xMassPosition = 0;
    var yMassPosition = 0;


    // every point in the cylinder is on a circle of center G.
    var r = (xMassPosition**2 + yMassPosition**2)**0.5;

    var xMassPosition2 = r * Math.cos(120 / 180 * Math.PI);
    var yMassPosition2 = r * Math.sin(120 / 180 * Math.PI);

    var xMassPosition3 = r * Math.cos(240 / 180 * Math.PI);
    var yMassPosition3 = r * Math.sin(240 / 180 * Math.PI);


    var angle1 = Math.round( 5 + oneServoDegree * formula(xMassPosition, yMassPosition, bigRadius, radiusServo, distance) );
    var angle2 = Math.round( 5 + oneServoDegree * formula(xMassPosition2, yMassPosition2, bigRadius, radiusServo, distance) );
    var angle3 = Math.round( 5 + oneServoDegree * formula(xMassPosition3, yMassPosition3, bigRadius, radiusServo, distance) );

    5 + oneServoDegree *


    console.log(xMassPosition, yMassPosition, angle1, angle2, angle3);

    servo1.to(angle1);
    servo2.to(angle2);servo3.to(angle3);

    await delay(50);

})

