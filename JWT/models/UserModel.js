const mongoose = require("mongoose");
const brypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
   fullName: {
       type: String,
       required: true,
       trim: true
   },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    hash_password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.comparePassword = function(password) {
  return brypt.compareSync(password,this.hash_password);
};

mongoose.model("User",UserSchema);
