const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {type:String},
    email: {type:String, unique:true, require:true},
    password: {type:String, max:1024}
})

userSchema.methods.genJWT = function(){
    const token = jwt.sign({_id:this._id, email:this.email, password: this.password},process.env.key,{ expiresIn: '1h'});
    return token;
} 

const User = mongoose.model("User", userSchema);
module.exports.User = User;
