const mongoose = require('mongoose');


const connect = async()=>{
    const db = await mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log("database connected"))
    .catch((err)=>{
        
        console.log(err);
        console.log("database denied")})
}


module.exports = connect;