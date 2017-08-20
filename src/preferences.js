
var pro=true;

if (pro) {
   ChipIO=require('./chip-io-pro')
} else {
   ChipIO=require('chip-io');
}


module.exports={
    ChipIO
}