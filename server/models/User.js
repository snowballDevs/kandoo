const mongoose = require('mongoose');

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

// // Password hash middleware.
// UserSchema.pre('save', function save(next) {
//   const user = this
//   if (!user.isModified('password')) { return next() }
//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) { return next(err) }
//     bcrypt.hash(user.password, salt, (err, hash) => {
//       if (err) { return next(err) }
//       user.password = hash
//       next()
//     })
//   })
// })

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
  

    


// // Helper method for validating user's password.

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch)
  })
}


// function async comparePassword(inputPassword){
//     try{
//         const isMatch = await bcrypt.compare(inputPassword, this.password)
//         return 
//     }

//    catch(err){
//         done(err)
//    }
// }

bcrypt
  .hash(password, saltRounds)
  .then(hash => {
          userHash = hash 
    console.log('Hash ', hash)
    validateUser(hash)
  })
  .catch(err => console.error(err.message))

function validateUser(hash) {
    bcrypt
      .compare(password, hash)
      .then(res => {
        console.log(res) // return true
      })
      .catch(err => console.error(err.message))        
}

module.exports = mongoose.model('User', UserSchema);
