"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = require("bcrypt");
const validateEmail = function (email) {
    const regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return regex.test(email);
};
const UserSchema = new mongoose_1.Schema({
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
UserSchema.methods.comparePasswords = function (password) {
    return bcrypt_1.compareSync(password, this.password);
};
exports.default = mongoose_1.model('User', UserSchema);
