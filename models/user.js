const { Schema, model } = require('mongoose');
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
    password: {
        type: String,        
        required: [true, 'Set password for user'],   
        minlength: 6,
    },    
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: emailRegex,
        unique: true,
    },    
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter",
    },
    token: String,
    avatarURL: String,

}, { versionKey: false, timestamps: true });
    
const User = model("user", userSchema);

module.exports = User;