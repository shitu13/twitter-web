import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";


import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import postRoutes from './src/routes/postRoutes.js';
import notificationRoutes from './src/routes/notificationRoutes.js';

import connectMongoDB from "./src/db/connectMongoDB.js";


dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const port = process.env.PORT || 5000;
const __dirname = path.resolve();


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/notifications', notificationRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}


// Write a test api endpoint
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectMongoDB();
});