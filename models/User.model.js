// User model here
const mongoose = require ('mongoose')
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema (
    {
        username : {
            type: String,
            trim : true,
            unique: [true, "Username already exists"],
            required: [true, "Username is required"]
        },
        password : {
            type: String,
            required : [true, "Password is required"]
        }
    },
    {
        timestamps: true,
    }
)

userSchema.pre ('save', function (next) {
    bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(this.password, salt))
    .then(hasPassword => {
        this.password = hasPassword
        next()
    })
    .catch (error => next(error))
})

userSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);
  }

const User = mongoose.model ('userSchema', userSchema)

module.exports = User