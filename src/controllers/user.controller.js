import { updateUser, deleteUser , getUserById} from "../services/user.service.js";
import bcrypt from "bcryptjs";

export const getUserController = async (req, res) => {
    try {
        // El ID viene del token decodificado en el middleware
        const userId = req.user.id;

        const user = await getUserById(userId)
        if(!user) return res.status(404).json({message: "User not found"})
        return res.status(200).json({message: "User finded", 
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }})
    }catch(error){
        return res.status(500).json({message: error.message})
    }
}

export const updateUserController = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // El ID viene del token decodificado en el middleware
        const userId = req.user.id;

        //Hash Password
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)

        const userUpdated = await updateUser({id: userId, username, email, password: passwordHash});
        if(!userUpdated) return res.status(404).json({message: "User not found"})
        return res.status(200).json({message: "User updated", 
        user: {
            id: userUpdated._id,
            username: userUpdated.username,
            email: userUpdated.email,
        }})
    }catch(error){
        return res.status(500).json({message: error.message})
    }
} 

export const deleteUserController = async (req, res) => {
    try {
        // El ID viene del token decodificado en el middleware
        const userId = req.user.id;

        const userDeleted = await deleteUser(userId);
        if(!userDeleted) return res.status(404).json({message: "User not found"})
        //limpiar cookie del token al borrar cuenta
        res.clearCookie("token");
        return res.status(200).json({message: "User deleted"})
    }catch(error){
        return res.status(500).json({message: error.message})
    }
}