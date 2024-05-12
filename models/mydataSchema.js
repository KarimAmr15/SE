const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const Schema = mongoose.Schema;

const userSchema = new Schema(
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
    
        dob: {
            type:String,
            required : true},
         
        },{timestamps : true}
        
  
   
   

);

userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
} )

userSchema.statics.login = async function(mail, password){
    const user = await this.findOne({mail: mail})
    if(user){
        const auth = await bcrypt.compare(password, user.password)
        if(auth) {
            return user; // Return user only if the password is correct
        }
    }
    // If the user doesn't exist or the password is incorrect
    return null;
    
    throw Error('Incorrect Email!')
}
const Customer = mongoose.model("customers",userSchema);

module.exports = Customer;



