// code that allows the cylinder to remain balanced on a gentle slope.
// The radius of the circle the mass is on (radiusCenter, --r) and if it goes backwards (--d b) or forwards (--d f) are parameters.


const debug = require('debug')('wc:stable-pid'); // wc for web control

let Controller = require('./pid');
let controller = new Controller({
    k_p: 0.25,
    k_i: 0.01,
    k_d: 0.01,
    dt: 1
  });


function stable(info, radiusCenter) {
    debug('info',info.targetInclination, info.currentInclination, radiusCenter);
    controller.setTarget(info.targetInclination);
    let correction = controller.update(info.currentInclination);

    debug( info.radiusCenter, correction);

    info.radiusCenter+= correction;

    return info.radiusCenter;
}

module.exports = stable;
