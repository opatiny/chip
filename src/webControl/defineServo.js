const five = require('johnny-five');

function defineServos(servoPins) {
    let defaultServo = {
        address: 0x40,
        controller: 'PCA9685'
    };

    let servo1 = new five.Servo(Object.assign({}, defaultServo, {pin: servoPins[0]}));
    let servo2 = new five.Servo(Object.assign({}, defaultServo, {pin: servoPins[1]}));
    let servo3 = new five.Servo(Object.assign({}, defaultServo, {pin: servoPins[2]}));

    return {servo1, servo2, servo3};

}


module.exports = defineServos;
