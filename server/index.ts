import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB";
import { Request, Response } from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/user.route";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

//DEFAULT MIDDLWARES
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: `${process.env.FRONTEND_URL}`,
  credentials: true,
};
app.use(cors(corsOptions));


//SIMPLE ROUTE
app.get("/", (req: Request, res: Response) => {
    res.send("SERVER IS RUNNING🎉🎉");
  });

//API'S
app.use("/api/v1/user", userRoute);

//LISTENING THE SERVER
app.listen(port,()=>{
    console.log(`server started on ${port}`)
    connectDB();
})