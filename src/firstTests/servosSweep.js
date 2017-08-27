// program that allows to make a servo sweep back and forth using CHIP

var Five = require('johnny-five');

var {
    ChipIO
} = require('../preferences');

var delay = require('delay');


var board = new Five.Board({
    io: new ChipIO()
});

board.on('ready', async function () {
    console.log('Connected');

    // Initialize the servo instance
    var servo = new Five.Servo({
        address: 0x40,
        controller: 'PCA9685',
        pin: 15
    });


    while (true) {
        for (let degrees = 0; degrees <= 180; degrees = degrees + 90) {
            await delay(2000);
            servo.to(degrees);
        }
        for (let degrees = 180; degrees >= 0; degrees = degrees - 90) {
            await delay(2000);
            servo.to(degrees);
        }
    }

/*
    var degrees=0;
    var step=1;
    while (true) {
        degrees+=step;
        if (degrees===180 || degrees===0) step*=-1; // because -1*(-1)=1 ...
        await delay(10);
        servo.to(degrees);
    }
 */

});

