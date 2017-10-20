// function that has parameter baseAngle and prefs and returns angleCenter, allows the control of the cylinder.


const debug = require('debug')('wc:control'); // wc for web control

function control(baseAngle, prefs) {
    var angleCenter;
    if (prefs.radius < 0) {
        angleCenter = baseAngle - 90;
    } else {
        angleCenter = baseAngle + 90;
    }

    debug('angleCenter' + '\t' + angleCenter);
    return angleCenter;
}

module.exports = control;
