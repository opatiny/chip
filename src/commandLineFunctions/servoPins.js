const five = require('johnny-five');

let defaultServo = {
    address: 0x40,
    controller: "PCA9685"
};


let servo1 = new five.Servo(Object.assign({}, defaultServo, {pin: 15}));
let servo2 = new five.Servo(Object.assign({}, defaultServo, {pin: 14}));
let servo3 = new five.Servo(Object.assign({}, defaultServo, {pin: 13}));


module.exports = {servo1, servo2, servo3};
