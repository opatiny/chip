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


    while (true) {
        for (let i=0; i<degrees.length; i++) {

            let angle1 = degrees[i];
            let angle2 = degrees[i + degrees.length/3];
            let angle3 = degrees[i + degrees.length/3*2];

            console.log(angle1, angle2, angle3);

            servo1.to(angle1);
            servo2.to(angle2);
            servo3.to(angle3);

            await delay(10);
        }
    }
})

