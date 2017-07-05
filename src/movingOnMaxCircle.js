// program that allows move the mass on a circle using CHIP

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

    var degrees = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170, 175, 180, 176, 173, 169, 165, 161, 158, 154, 150, 146, 142, 138, 134, 129, 125, 121, 116, 112, 107, 102, 97, 92, 87, 81, 76, 70, 64, 58, 52, 46, 40, 33, 27, 20, 13, 7];
    // var degrees2 = [120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170, 175, 180, 176, 173, 169, 165, 161, 158, 154, 150, 146, 142, 138, 134, 129, 125, 121, 116, 112, 107, 102, 97, 92, 87, 81, 76, 70, 64, 58, 52, 46, 40, 33, 27, 20, 13, 7, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115]
    // var degrees3 = [134, 129, 125, 121, 116, 112, 107, 102, 97, 92, 87, 81, 76, 70, 64, 58, 52, 46, 40, 33, 27, 20, 13, 7, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170, 175, 180, 176, 173, 169, 165, 161, 158, 154, 150, 146, 142, 138]
     /*
        REMARK: it seems that the angles of the servos do not correspond to normal angle, by that, it is ment that if a servo must
        go to 180 degrees from an initial position of 0, it will make more than half a circle. To counter this problem, we have seen
        that the best way for a servo to make 180 degrees (irl), is to make it sweep from 5 to 145 degrees. We do not begin at 0 degrees,
        because they are then tensions in the servos (they vibrate).
        irl servo (in degrees)
        0   5
        180 145
     */

    var oneServoDegree  = (145 - 5) / 180;

    while (true) {
        for (let i=0; i<degrees.length; i++) {

            let angle1 = oneServoDegree * degrees[i];
            let angle2 = oneServoDegree * degrees[(i + degrees.length/3) % degrees.length];
            let angle3 = oneServoDegree * degrees[(i + degrees.length/3*2) % degrees.length];

            console.log(angle1, angle2, angle3);

            servo1.to(angle1);
            servo2.to(angle2);
            servo3.to(angle3);

            await delay(50);
        }
    }
})

