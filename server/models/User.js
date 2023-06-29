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

UserSchema.statics.signup = async function (
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
