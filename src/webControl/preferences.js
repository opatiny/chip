// defining the parameters that need to be used depending on the cylinder
// prototype and the type of mcu (C.H.I.P. or C.H.I.P. Pro).

function preferences(cylinderPrototype) {

    var ChipIO;
    var servoPins;

    if (cylinderPrototype = 3) {
        ChipIO = require('../chip-io-pro');
        servoPins = [0, 1, 2];
    } else {
        ChipIO = require('../../node_modules/chip-io');
        servoPins = [15, 14, 13];
    }

    var prototypeParameters = require('../prefs/cylinderPrototype' + cylinderPrototype);

    return  {
        ChipIO,
        servoPins,
        prototypeParameters
    };
}


module.exports = preferences;

