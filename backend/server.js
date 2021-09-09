// const express = require("express");
// const dotenv = require("dotenv");
// const products = require("./data/products");
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();


// enable reciving json data in body
app.use(express.json());

// create route
app.get("/", (req, res) => {
    res.send("API is running...")
})

// mount product routes
app.use("/api/products", productRoutes);
// mount user routes
app.use("/api/users", userRoutes);



// custom error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));