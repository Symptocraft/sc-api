import mongoose from "mongoose";
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017";

const dbconnection = async () => {
    mongoose
      .connect(MONGO_URL)
      .then(() => console.log("Database connected"))
      .catch((err) => console.error(err));
  };
  
export default dbconnection;