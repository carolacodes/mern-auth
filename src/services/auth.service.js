import User from "../models/user.model.js";

export async function createUser({ username, email, password }) {
    return await User.create({ username, email, password });
}

export async function findUserByEmail(email) {
    return await User.findOne({ email });
}

export async function findUserById(id) {
    return await User.findById(id);
}
