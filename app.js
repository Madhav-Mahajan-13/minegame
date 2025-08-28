import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// --- Boilerplate to set up correct paths in ES Modules ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// ---------------------------------------------------------

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Tell Express exactly where to find the 'views' folder
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Tell Express exactly where to find the 'public' (static files) folder
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    // Now render will reliably find index.ejs
    res.render("index.ejs");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Export the app for Vercel
export default app;