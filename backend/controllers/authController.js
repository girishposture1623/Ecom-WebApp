import User from "../models/User.js"
import bcrypt from "bcryptjs"
import sendEmail from "../utils/sendEmail.js"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// token generate
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
}
// console.log(generateToken)

const registerUser = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'User already exist' })
        }
        // HashPassword
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const user = await User.create({ name, email, password: hashPassword })
        if (user) {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();

            const message = `Welcome to Shoplix, ${name}!

Your OTP for registration is: ${otp}`;

            await sendEmail({
                to: user.email,
                subject: "Welcome to Shoplix - Your OTP for Registration",
                text: message,
            });

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({
                message: "Invalid user data",
            });
        }
        // await newUser.save();
        // res.status(200).json({message: 'User Registerd successfully'})
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: error.message,
        });
    }
}

// Login  User

const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            })
        } else {
            res.status(400).json({ message: 'Invalid email or password' })
        }
    } catch (error) {

        res.status(500).json({ message: 'server error' })
    }
}

// 
const getUser = async (req, res) => {
    try {
        const users = await User.find({}).select("-password")
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }

}


export { registerUser, loginUser, getUser }