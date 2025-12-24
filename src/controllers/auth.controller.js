import { User } from "../models/models.js";
import {ApiError, log} from "../utils/utils.js"
import { validateRegistration , validateLogin } from "../validators/validators.js";

export const registerUser = async(req,res,next)=>{

    log.info("Register endpoint hit");

    try {

        const { error } = validateRegistration(req.body);
        if (error) {
            return next(
                new ApiError(
                    400,
                    "Validation failed",
                    error.details.map(err => err.message)
                )
            );
        }

        const {name,email,password} = req.body;       
        
        const userAlreadyExist = await User.findOne({ email });

        if (userAlreadyExist) {
            return next(new ApiError(409, "Email is already registered"));
        }

        const user = await new User({ name, email, password }).save();

        log.info("User registered successfully", { userId: user._id,email:email});

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
          });

    } catch (err) {

        log.error("Error in registerUser: %o", err);
        next(err); 

    }
}

export const loginUser = async (req, res, next) => {

    log.info("Login endpoint hit");

    try {
      
        const { error } = validateLogin(req.body);
        if (error) {
            return next(
                new ApiError(
                    400,
                    "Validation failed",
                    error.details.map(err => err.message)
                )
            );
        }

        const { email, password } = req.body;

      
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return next(new ApiError(404, "User not found"));
        }

     
        const isMatch =  user.comparePassword(password);

        if (!isMatch) {
            return next(new ApiError(401, "Invalid credentials"));
        }

        
        const accessToken = await user.generateAccessToken()


        log.info("User logged in successfully", { email });

    
        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 3 * 60 * 60 * 1000,
        };

       
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .json({
                success: true,
                message: "User logged in successfully",
                data: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
            });

    } catch (err) {
        log.error("Error in loginUser: %o", err);
        next(err); 
    }
  };

  export const logOut = async(req,res,next)=>{

    log.info("Logout endpoint hit");

    try {

        res.clearCookie("accessToken");
       
        log.info("User logged out successfully");

        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });

    } catch (error) {
        log.error("Error in logOut: %o", err);
        next(err)
    }
  }