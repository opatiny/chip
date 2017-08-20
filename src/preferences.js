
var pro=true;

var ChipIO;
var servoPins;

if (pro) {
   ChipIO=require('./chip-io-pro');
   servoPins=[2,1,0];
} else {
   ChipIO=require('chip-io');
   servoPins=[15,14,13];
}


module.exports={
    ChipIO,
    servoPins
};

console.log(servoPins, ChipIO);