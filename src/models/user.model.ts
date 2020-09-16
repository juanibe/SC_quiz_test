import mongoose, { Schema, Model, model } from 'mongoose';
import { compareSync } from 'bcrypt'

export interface User extends mongoose.Document {
    fullname: string;
    email: string;
    password: string;
    role: number;
}

const validateEmail = function (email: string) {
    const regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
    return regex.test(email)
};

const UserSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        maxlength: 65,
        minlength: 3,
    },

    email: {
        type: String,
        required: true,
        validate: [validateEmail, 'invalidEmail']

    },
    password: {
        type: String,
        required: true,
    },

    role: Number,
});

UserSchema.methods.comparePasswords = function (password: string): boolean {
    return compareSync(password, this.password)
}

export default model<User>('User', UserSchema);