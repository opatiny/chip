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
    var oneServoDegree  = (150 - 5) / 180;
    

    // parameters of the cylinder
    // do not forget that angles are in rad in javascript!! (default)
    const radiusServo = 16.2; // rayon défini par l'axe du servo en [mm]
    const bigRadius = 109.2; // distance between center of cylinder and center of servo [mm]
    const distance = 109.2; // distance between point on center circle of cylinder and end of servo axis [mm]

    // parameters that can vary
    const radiusCenter = 16.1995; // rayon du cercle défini par la masse au centre du cylindre en [mm]
    const rotation = Infinity; // number of rotations we want the mass to do (whole numbers), if it is unlimited, write NaN


    for (var currentRotation=0; currentRotation<rotation; currentRotation++) {
        for(var angleCenter = 0; angleCenter < 360; angleCenter += 5) {
            var r = radiusCenter;
            var xMassPosition1 = r * Math.cos(angleCenter / 180 * Math.PI);
            var yMassPosition1 = r * Math.sin(angleCenter / 180 * Math.PI);

            var xMassPosition2 = r * Math.cos((angleCenter + 120) / 180 * Math.PI);
            var yMassPosition2 = r * Math.sin((angleCenter + 120) / 180 * Math.PI);

            var xMassPosition3 = r * Math.cos((angleCenter + 240) / 180 * Math.PI);
            var yMassPosition3 = r * Math.sin((angleCenter + 240) / 180 * Math.PI);

            var angle1 = Math.round( 5 + oneServoDegree * formula(xMassPosition1, yMassPosition1, bigRadius, radiusServo, distance) );
            var angle2 = Math.round( 5 + oneServoDegree * formula(xMassPosition2, yMassPosition2, bigRadius, radiusServo, distance) );
            var angle3 = Math.round( 5 + oneServoDegree * formula(xMassPosition3, yMassPosition3, bigRadius, radiusServo, distance) );

            console.log(angleCenter, angle1, angle2, angle3);

            servo1.to(angle1);
            servo2.to(angle2);
            servo3.to(angle3);

            await delay(50);
        }
    }
});

