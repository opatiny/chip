
var pro=true;

if (pro) {
   let ChipIO=require('./chip-io-pro');
   let servoPins=[0,1,2];
} else {
   let ChipIO=require('chip-io');
   let servoPins=[15,14,13];
}


module.exports={
    ChipIO,
    servoPins
};