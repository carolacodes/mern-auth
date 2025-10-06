import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
    return jwt.sign(
        { sub: userId },                      // payload: sub = subject (id del user)
        process.env.JWT_SECRET,               // secret para firmar
        { expiresIn: process.env.JWT_EXPIRES_IN || "1h" } // duración
    );
};