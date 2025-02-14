const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");

const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, address, farmSize, experience, password } = req.body;

        // Check if the user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: 'User already exists, please login',
                success: false
            });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new UserModel({
            firstName,
            lastName,
            email,
            phone,
            address,
            farmSize,
            experience,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            message: "Signup successful",
            success: true
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(403).json({
                message: "Authentication failed: Email or password is incorrect",
                success: false
            });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({
                message: "Authentication failed: Email or password is incorrect",
                success: false
            });
        }

        // Generate JWT token
        const jwtToken = jwt.sign(
            { _id: user._id, email: user.email, firstName: user.firstName },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
            id : user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            address: user.address,
            farmSize: user.farmSize,
            experience: user.experience
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        });
    }
};

module.exports = {
    signup,
    login
};
