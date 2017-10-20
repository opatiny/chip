// code that allows the cylinder to remain balanced on a gentle slope.
// The radius of the circle the mass is on (radiusCenter, --r) and if it goes backwards (--d b) or forwards (--d f) are parameters.


const debug = require('debug')('wc:stable'); // wc for web control

function stable(inclinationLog, angleCenterLog) {
    var angleCenter;


    let previousAngleCenter = angleCenterLog[angleCenterLog.length - 1];// this allows to have the last values of angleCenter
    debug('previousAngleCenter' + '\t' + previousAngleCenter);


    let inclinationDiff = inclinationLog[inclinationLog.length - 1].toPrecision(3) - inclinationLog[inclinationLog.length - 2].toPrecision(4);
    debug('inclinationDiff ' + inclinationDiff);

    // const maxInclinationDiff = 1.4; // we estimate what it could be to make the servos reaction proportional
    //const proportionalStep = inclinationDiff / 0.75;

    if (inclinationDiff < 0) {
        angleCenter = previousAngleCenter - 0.5;
    } else if (inclinationDiff === 0) {
        angleCenter = previousAngleCenter;
    } else {
        angleCenter = previousAngleCenter + 0.5;
    }
    debug('angleCenter' + '\t' + angleCenter);


    return angleCenter;
}

module.exports = stable;
