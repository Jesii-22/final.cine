import mongoose from "mongoose";

const connection = {};
console.log("Intentando conectar a MongoDB...");

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }
  console.log("Intentando conectar a MongoDB 2222...");
  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    connection.isConnected = db.connections[0].readyState;
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
    throw new Error("Error conectando a la base de datos");
  }
}

export default dbConnect;
