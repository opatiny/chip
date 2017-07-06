/**
 * Created by opatiny on 7/6/17.
 */


console.log(process.argv);

function grab(flag) {
    var index = process.argv.indexOf(flag);
    return (index === -1) ? null : process.argv[index + 1];
}


// parameters that can vary (here, they come from the process.argv)
const radiusCenter = grab('--r'); // radius of the circle the mass runs on in [mm]

console.log(radiusCenter);

var goToPoint = require('./goToPointFile.js');
console.log("Functions required.");