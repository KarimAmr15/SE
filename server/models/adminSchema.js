const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const Schema = mongoose.Schema;

const adminSchema = new Schema(
    {
        fname:{
            type: String,
            required : true
        },
        lname:{
            type: String,
            required: true
        }, 
        mail:{
            type : String,
            required : true
        },
       
        password:{
            type: String,
            required : true
        },
    
         
        },{timestamps : true}
        
  
   
   

);

adminSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
} )

adminSchema.statics.login = async function(mail, password){
    const admin = await this.findOne({mail: mail})
    if(admin){
        const auth = await bcrypt.compare(password, admin.password)
        if(auth) {
            return admin; 
        }
    }
    return null;
    
    throw Error('Incorrect Email!')
}
const Admin = mongoose.model("admins",adminSchema);

module.exports = Admin;



