import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = process.env.DB_CONNECTION; // o MONGODB_URI (ver abajo)

    if (!uri) {
        throw new Error("DB_CONNECTION is missing in environment variables");
    }

    await mongoose.connect(uri);
    console.log(">>>>> DB connected <<<<<", mongoose.connection.name);
};
