import { createUser, findUserByEmail , findUserById} from "../services/auth.service.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../libs/jwt.js"

export const register = async (req, res) => {
    const {username, email, password} = req.body
    try {

        const userFound = await findUserByEmail(email)
        if(userFound) return res.status(400).json(["ERROR user already exists"])

        //Hash Password
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)

        const userCreated = await createUser({username, email, password: passwordHash})
        if(!userCreated) {
            return res.status(400).json("ERROR creating user")
        }
        console.log("Username: "+userCreated.username, "Email: "+userCreated.email)
        const token = generateToken(userCreated._id)

        // 👇 Seteamos la cookie con el token
        res.cookie("token", token, {
            httpOnly: true,     // 🔒 evita acceso por JS (seguridad XSS)
            secure: false,      // true si usás HTTPS
            sameSite: "strict", // previene CSRF
            maxAge: 1000 * 60 * 60, // 1 hora
        });

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
    try{
        const {email, password} = req.body

        const userFound = await findUserByEmail(email)
        if(!userFound) return res.status(400).json("User not found")
        
        const isMatch = await bcrypt.compare(password, userFound.password)

        if(!isMatch) return res.status(401).json("Invalid password")

        const token = generateToken(userFound._id)

        // 👇 Cookie con el token
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60, // 1 hora
        });

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