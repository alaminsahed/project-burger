const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type:String, required:[true,'please enter your name']},
    email: {type:String, unique:true, require:true},
    password: {type:String, max:1024}
})

userSchema.methods.genJWT = function(){
    const token = jwt.sign({email:this.email, password: this.password},process.env.key);
    return token;
} 

module.exports.User = User;
