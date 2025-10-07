import { updateUser, deleteUser , getUserById} from "../services/user.service.js";
import bcrypt from "bcryptjs";

export const getUserController = async (req, res) => {
    const {id} = req.params;
    try {
        const user = await getUserById(id)
        if(!user) return res.status(404).json({message: "User not found"})
        return res.status(200).json({message: "User finded", user})
    }catch(error){
        return res.status(500).json({message: error.message})
    }
}

export const updateUserController = async (req, res) => {
    const {id} = req.params
    const { username, email, password } = req.body;
    try {
        //Hash Password
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)

        const userUpdated = await updateUser({id, username, email, password: passwordHash});
        if(!userUpdated) return res.status(404).json({message: "User not found"})
        return res.status(200).json({message: "User updated", user: userUpdated})
    }catch(error){
        return res.status(500).json({message: error.message})
    }
} 

export const deleteUserController = async (req, res) => {
    const { id } = req.params;
    try {
        const userDeleted = await deleteUser(id);
        if(!userDeleted) return res.status(404).json({message: "User not found"})
        return res.status(200).json({message: "User deleted", user: userDeleted})
    }catch(error){
        return res.status(500).json({message: error.message})
    }
}