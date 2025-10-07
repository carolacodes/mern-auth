import User from '../models/user.model.js'

export async function getUserById(id){
    try{
        const user = await User.findById(id)
        if(!user) return null
        return user
    }catch(error){
        throw new Error('Error getting user');
    }
}

export async function updateUser({username, email, password, id}) {
    try {
        const userUpdated = await User.findByIdAndUpdate(id, { username, email, password }, { new: true });
        return userUpdated;
    } catch (error) {
        throw new Error('Error updating user');
    }
}

export async function deleteUser(id){
    try{
        const userDeleted = await User.findByIdAndDelete(id);
        return userDeleted;
    }catch(error){
        throw new Error('Error deleting user')
    }
}
