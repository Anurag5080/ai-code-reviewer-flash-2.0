import app from "./src/app.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 0;

app.listen(PORT);
