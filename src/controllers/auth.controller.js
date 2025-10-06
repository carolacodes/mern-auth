import { createUser, findUserByEmail } from "../services/auth.service.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../libs/jwt.js"

export const register = async (req, res) => {
    const {username, email, password} = req.body
    try {
        //Hash Password
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)

        const userCreated = await createUser({username, email, password: passwordHash})
        if(!userCreated) {
            return res.status(400).json({message: "ERROR creating user"})
        }
        console.log("Username: "+userCreated.username, "Email: "+userCreated.email)
        const token = generateToken(userCreated._id)
        return res.status(201).json({
            user: {
                id: userCreated._id,
                username: userCreated.username,
                email: userCreated.email
            },
            token,
        });
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const login = async (req, res) => {
    try{
        const {email, password} = req.body

        const userFound = await findUserByEmail(email)
        if(!userFound) return res.status(400).json({message: "User not found"})
        
        const isMatch = await bcrypt.compare(password, userFound.password)

        if(!isMatch) return res.status(400).json({message: "Invalid password"})
        
        const token = generateToken(userFound._id)
        return res.status(201).json({
            user: {
                id: userCreated._id,
                username: userCreated.username,
                email: userCreated.email
            },
            token,
        });
    }catch(error){
        return res.status(500).json({message: error.message})
    }
}
