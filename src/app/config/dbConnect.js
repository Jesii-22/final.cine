import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://jesi:Pdz71KpaRNOsQWXe@progra3.1b7gp.mongodb.net/leads"); 

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;