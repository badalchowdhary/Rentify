const mongoose = require("mongoose")

const PropertiesSchema = new mongoose.Schema(
    {
        title: {type:String, required:true},
        desc: {type:String, required:true},
        price: {type:Number, required:true},
        area: {type:Number, required:true},
        bedrooms: {type:Number, required:true},
        bathrooms: {type:Number, required:true},
        location: {type:String, required:true},
        amenties: {type:Array},
        nearby: {type:Array},
        postedby: {type:String, required:true},
        interestedbuyers: {type:Array},
    },
    {timestamps:true}
);

module.exports = mongoose.model( "Properties",PropertiesSchema);