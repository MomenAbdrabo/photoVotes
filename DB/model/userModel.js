import mongoose, {model,Schema } from "mongoose"


const userSchema=new Schema ({

    firstName: String,
    lastName: String,
    
    coverPic: [Object],
    profilePic: Object,
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    age: Number,
    gender: {
        type: String,
        default: 'male',
        enum: ['male', 'female']
    },
    confirmEmail: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String
    },
    status: {
        type: String,
        default: 'offline',
        enum: ['offline', 'online', 'block']
    },

    role: {
        type: String,
        default: 'User',
        enum: ['User', 'Admin']
    }
}, {
    timestamps: true
})


const userModel=mongoose.models.User || model('User',userSchema)

export default userModel