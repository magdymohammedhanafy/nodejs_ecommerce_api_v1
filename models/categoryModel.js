const mongoose=require('mongoose');

//creat Schema
const categorySchema=new mongoose.Schema({
    name: 
    {
        type:String,
        required:[true,"Category required"],
        unique:true,
        minLength:[3,"Too short caregory name"],
        maxLength:[32,"Too long category name"],
    },
    slug:
    {
        type:String,
        lowecase:true,
    },
    image:String,
},
{timestamps:true},

    );
//creat model
const Categorymodel = mongoose.model('Category', categorySchema);

module.exports=Categorymodel;