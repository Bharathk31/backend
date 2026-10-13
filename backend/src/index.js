import "dotenv/config";
import connectDB from "./config/database.js";
import app from "./app.js";

const startServer = async () => {
    try {
        await connectDB();

        app.on("error", (error) => {
            console.log("Error starting server", error);
            throw error;
        });

        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server started on port ${process.env.PORT || 8000}`);
        });

    } catch (error) {
        console.log("Error starting server", error);
        process.exit(1);
    }
};

startServer();