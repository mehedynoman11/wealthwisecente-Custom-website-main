import mongoose from "mongoose";

// interface IUser extends Document{
//     name:string;
//     email: string;
//     password?: string;
//     id: string;
// }

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false,
    },
})

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;