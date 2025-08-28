import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Boilerplate to set up correct paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

// Tell Express where to find the 'views' folder
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// The ONLY route this server will handle
app.get("/", (req, res) => {
    res.render("index.ejs");
});

// Export the app for Vercel's serverless environment
export default app;