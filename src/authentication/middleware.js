import jwt from 'jsonwebtoken';
import app from '../config/index.js'
import dotenv from 'dotenv';

dotenv.config();

const jwtDecode =  async (token) => {
    // invalid token - synchronous
    try {
        let decoded = jwt.verify(token, process.env.SECRETKEY);
        return decoded;
    } catch(err) {
        console.log(err.message);
        return null;
    }
}

// middleware to fetch user object
const authService = async (req, res, next) => {
    try {
        const authHeader = req.get("Authorization");
        
        if (!authHeader) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = await jwtDecode(token);
        
        if (!decoded) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.decoded = decoded;
        next();
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default authService;