const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        firstname: {type:String, required:true},
        lastname: {type:String, required:true},
        email: {type:String, required:true, unique:true},
        phone: {type:Number, required:true, unique:true},
        password: {type:String, required:true},
        isBuyer: {
            type: Boolean,
            default: false,

        },
        isSeller: {
            type: Boolean,
            default: false,

        },
    },
    {timestamps:true}
);

module.exports = mongoose.model( "User",UserSchema);