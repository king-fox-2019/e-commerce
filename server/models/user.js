const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hashPassword } = require('../helpers/bcrypt')

const userSchema = new Schema({
    name:{
        type:String,
        required:[true,`Name is required`]
    },
    email:{
        type:String,
        required:[true,`Email is required`],
        validate:{
            validator: function(val){
                return mongoose.models.User.findOne({email:val})
                .then(user=>{
                    if(user) return false
                })
            },
            message : props => `email already exists`
        }
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        minlength:[6,'Password at least 6 characters']
    },
    cart:Array,
    pending:Array,
    role:String
})

userSchema.pre('save',function(next){
    this.password = hashPassword(this.password)
    next()
})

const User = mongoose.model('User',userSchema)

module.exports = User