const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

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

    first_name: {
        type: String,
    },

    last_name: {
        type: String,
    },
});

// every time before a password is saved, hash the password.
UserSchema.pre('save', async function save(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    try {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    } catch (err) {
        return next(err);
    }
});

module.exports = mongoose.model('User', UserSchema);
