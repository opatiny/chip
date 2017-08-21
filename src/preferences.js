
var pro = false;

var ChipIO;
var servoPins;

if (pro) {
    ChipIO = require('./chip-io-pro');
    servoPins = [0, 1, 2];
} else {
    ChipIO = require('../node_modules/chip-io');
    servoPins = [15, 14, 13];
}


module.exports = {
    ChipIO,
    servoPins
};

console.log(servoPins, ChipIO);
