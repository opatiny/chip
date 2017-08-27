//http://johnny-five.io/examples/imu-mpu6050/
// this program returns values of the accelerometer on every change of these values

var Five = require('johnny-five');

var {
    ChipIO
} = require('../preferences');


var board = new Five.Board({
    io: new ChipIO()
});

board.on('ready', function () {

    var accelerometer = new Five.Accelerometer({
        controller: 'MPU6050',
        sensitivity: 16384 // optional
    });

    accelerometer.on('change', function () {
        var result = {
            x: this.x,
            y: this.y,
            z: this.z,
            pitch: this.pitch,
            roll: this.roll,
            acceleration: this.acceleration,
            inclination: this.inclination,
            orientation: this.orientation
        };
        console.log(result);
    });
});
