const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },
});

// Allows virtual properties to be included
UserSchema.set('toJSON', {virtuals: true});
UserSchema.set('toObject', {getters: true});

UserSchema.virtual('fullName').get(function getFullName() {
    return `${this.firstName} ${this.lastName}`;
});

// Removes the email and password from the userObject when called
UserSchema.methods.toJSON = function toJSON() {
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.email;
    return userObject;
};

UserSchema.statics.signup = async function signup(
    email,
    password,
    firstName,
    lastName
) {
    // validation

    const exists = await this.findOne({email});

    if (exists) {
        throw Error('Email already in use');
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({
        email,
        password: hash,
        firstName,
        lastName,
    });

    return user;
};

module.exports = mongoose.model('User', UserSchema);
