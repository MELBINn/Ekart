import express from "express";//use of es6
import colors from "colors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
// import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from "./routes/cartRoute.js";
import cors from "cors";
import path from "path";

import { fileURLToPath } from 'url';


//configure env
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Conneted To Mongodb Databse ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.log(`Errro in Mongodb ${error}`.bgRed.white);
  }
};

//esmodule 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//databse config
connectDB();

//rest object
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000', 
  credentials: true,
};

app.use(cors(corsOptions));

//middelwares

app.use(express.json());
app.use(morgan("dev"));
const buildPath = '../frontend/build'; 
app.use(express.static(buildPath))

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/cart", cartRoutes)

//rest api
// app.get("/", (req, res) => {
//   res.send("<h1>Welcome to ecommerce app</h1>");
// });
app.use('*',function(req,res){
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
})

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
