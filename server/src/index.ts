import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "../src/routes/user";
import { productRouter } from "../src/routes/product";
import { profileRouter } from "../src/routes/userprofile";
import * as dotenv from "dotenv";
dotenv.config();

const MONGODB_CONNECT = process.env.MONGO_DB_CONNECT_KEY;
const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(
  `${MONGODB_CONNECT}`
);
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/", profileRouter);

app.listen(port, () => {
  console.log("Server started on port 3001");
});
