//http://johnny-five.io/examples/imu-mpu6050/

var five = require('johnny-five');
var chipio = require('chip-io');

var board = new five.Board({
    io: new chipio()
});

board.on('ready', function () {

    var accelerometer = new five.Accelerometer({
        controller: 'MPU6050',
        sensitivity: 16384 // optional
    });

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


    accelerometer.on('change', function () {
        var result = {
            x: this.x,
            y: this.y,
            z: this.z,
            o: this.orientation
        };
        console.log(result);

        var degrees1 = 90 + 90 * result.x;
        var degrees2 = 90 + 90 * result.y;
        var degrees3 = 90 + 90 * result.z;


        servo1.to(degrees1);
        servo2.to(degrees2);
        servo3.to(degrees3);


    });
});
