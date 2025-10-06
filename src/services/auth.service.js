import User from '../models/user.model.js'

export async function createUser({username, email, password}) {
    try {
        const user = await User.create({username, email, password})
        if(!user){
            return null
        }else{
            return user
        }
    }catch(error){
        return error.message
    }
}

export async function findUserByEmail(email){
    try {
        const user = await User.findOne({email})
        if(!user){
            return null
        }else{
            return user
        }
    }catch(error){
        return error.message
    }
}

