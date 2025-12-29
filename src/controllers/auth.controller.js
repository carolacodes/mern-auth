import { createUser, findUserByEmail , findUserById} from "../services/auth.service.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../libs/jwt.js"
import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const register = async (req, res) => {
    const {username, email, password} = req.body
    try {
        if (!username || !email || !password) {
        return res.status(400).json({ message: "Missing fields" })
        }
        const usernameNorm = username.trim()
        const emailNorm = email.trim().toLowerCase()
        const userFound = await findUserByEmail(emailNorm)
        if(userFound) return res.status(400).json(["ERROR user already exists"])
        
        //Hash Password
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)

        const userCreated = await createUser({
                                            username: usernameNorm,
                                            email: emailNorm,
                                            password: passwordHash})
        if(!userCreated) {
            return res.status(400).json("ERROR creating user")
        }
        console.log("Username: "+userCreated.username, "Email: "+userCreated.email)
        const token = generateToken(userCreated._id)

        const isProd = process.env.NODE_ENV === "production"
        // 👇 Seteamos la cookie con el token
        res.cookie("token", token, {
            httpOnly: true, // significa que la cookie no es accesible desde JavaScript del lado del cliente solo en el servidor
            secure: isProd,                 // true en Render (https) // true si usas HTTPS (en produccion), false si usas HTTP
            sameSite: isProd ? "none" : "lax", // none para Vercel<->Render, lax para local, // stric que solo se puede acceder al mismo dominio, lax permite cierto acceso cruzado, none permite todo (pero requiere secure:true)
            maxAge: 1000 * 60 * 60, // duracion de la cookie
        });
        console.log("REGISTER BODY:", req.body)
        console.log("EMAIL NORM:", emailNorm)
        return res.status(201).json({
            user: {
                id: userCreated._id,
                username: userCreated.username,
                email: userCreated.email
            }
        });
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body
    try{
        if (!email || !password) {
            return res.status(400).json({ message: "Missing fields" })
        }
        const emailNorm = email.trim().toLowerCase()
        const userFound = await findUserByEmail(emailNorm)
        if(!userFound) return res.status(400).json("User not found")
        
        if (!password || !userFound?.password) {
            return res.status(400).json({ message: "Email or password missing" })
        }
        const isMatch = await bcrypt.compare(password, userFound.password)

        if(!isMatch) return res.status(401).json("Invalid password")

        const token = generateToken(userFound._id)

        const isProd = process.env.NODE_ENV === "production"
        // 👇 Cookie con el token
        res.cookie("token", token, {
            httpOnly: true, // significa que la cookie no es accesible desde JavaScript del lado del cliente solo en el servidor
            secure: isProd,                 // true en Render (https) // true si usas HTTPS (en produccion), false si usas HTTP
            sameSite: isProd ? "none" : "lax", // none para Vercel<->Render, lax para local, // stric que solo se puede acceder al mismo dominio, lax permite cierto acceso cruzado, none permite todo (pero requiere secure:true)
            maxAge: 1000 * 60 * 60, // duracion de la cookie
        });
        console.log("LOGIN BODY:", req.body)
        return res.status(201).json({
            user: {
                id: userFound._id,
                username: userFound.username,
                email: userFound.email
            }
        });
    }catch(error){
        return res.status(500).json({message: error.message})
    }
}


export const logout = (req, res) => {
    res.clearCookie("token"); //limpiamos cookie que contiene el token 
    return res.status(200).json("Logout successful");
}

export const profile = async (req, res) => {
    try {
        const idUser = req.user.id
        if(!idUser) return res.status(401).json("Unauthorized")
        
        const userFindById = await findUserById(idUser)
        if(!userFindById) return res.status(404).json("User not found")

        return res.status(200).json({
            id: userFindById._id,
            username: userFindById.username,
            email: userFindById.email,
            createdAt: userFindById.createdAt,
            updateAt: userFindById.updatedAt
        })
    }catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json("Not authorized");
    }

    const jwtSecret = process.env.JWT_SECRET;

    jwt.verify(token, jwtSecret, async (err, decoded) => {
        if (err) {
        return res.status(401).json("Not authorized");
        }

        // si tu token se genera con { sub: userId }
        const userId = decoded.sub;

        try {
        const userFound = await User.findById(userId);
        if (!userFound) {
            return res.status(401).json("Not authorized");
        }

        return res.status(200).json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        });
        } catch (error) {
        return res.status(500).json({ message: error.message });
        }
    });
}