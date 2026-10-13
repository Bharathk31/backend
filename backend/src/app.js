import express from "express"; 

const app = express(); //create an express app

app.use(express.json()); //middleware to parse json data



// routes import
import userRoutes from "./routes/user.route.js";

// declaring routes
app.use("/api/v1/users", userRoutes);

// example route: http://localhost:4000/api/v1/users/register 

export default app;