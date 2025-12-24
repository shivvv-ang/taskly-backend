import {Schema,model} from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase: true,
        trim: true,
    },
    password:{
        type:String,
        required:true,  
        select: false,
    }
},{timestamps:true});

// note :- email has unique index 



//hash password before data is saved in db with pre hook

userSchema.pre("save", async function () {
    // Only hash password if it was modified or is new
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
});


//User Methods

//compare password

userSchema.methods.comparePassword =  function (password) {
    return bcrypt.compare(password, this.password);
  };


  //generate access token

  userSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            userId: this._id,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

const User = model("User", userSchema);
export default User;