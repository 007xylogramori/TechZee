const mongoose = require('mongoose');
const { Schema } = mongoose;

const ClassSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    userId:{
        type: mongoose.Types.ObjectId,
        required:true,
        ref: "User"
    },
    description: {
        type: String,
        required: true,
    },
    classCode: {
        type: String,
        default: ""
    },
    isActive:{
        type:Boolean,
        default:true
    }

},
    {timestamps:true}
)

// model declared 
const classSchema = mongoose.model('Classes', ClassSchema);
module.exports = classSchema ;