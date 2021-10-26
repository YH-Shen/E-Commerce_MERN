// const express = require("express");
// const dotenv = require("dotenv");
// const products = require("./data/products");
// using es modules instead of commonJS module because nodejs 14 supports
import path from "path";
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
// HTTP request logger middleware for node.js
import morgan from "morgan";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

// loades environment vaiables from .env
dotenv.config();

connectDB();

const app = express();

// only run http req logger in dev mode
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

// data parsing
// enable reciving json data in body
app.use(express.json());

// create route
// app.get("/", (req, res) => {
// 	res.send("API is running...");
// });

// mount product routes
app.use("/api/products", productRoutes);
// mount user routes
app.use("/api/users", userRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/build")));

	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
	);
} else {
	app.get("/", (req, res) => {
		res.send("API is running...");
	});
}

// custom error handling middleware
// pass in middleware funcs into app.use()
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
			.bold
	)
);
