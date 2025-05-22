import mongoose from "mongoose";
import colors from "colors";
import { exit } from "node:process";

export const connectDB = async () => {
  try {
    const conecction = await mongoose.connect(process.env.DATABASE_URL);
    const url = `${conecction.connection.host}:${conecction.connection.port}`;
    console.log(colors.magenta.bold(`MongoDB conectado en ${url}`));
  } catch (error) {
    // console.log(error.message);
    console.log(colors.red.bold("Error al conectar a MongoDB"));
    // 0 = el programa termino y todo estuvo bien
    // 1 = el programa falló y queremos terminarlo
    exit(1);
  }
};
