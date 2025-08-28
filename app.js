import express from "express";
import dotenv from "dotenv"

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs'); // Add this line to set the view engine

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get("/",(req,res)=>{
    res.render("index.ejs");
})