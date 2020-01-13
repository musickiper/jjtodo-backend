import dotenv from "dotenv";
import path from "path";

// Get environmental variables from '.env' config file
dotenv.config({ path: path.join(__dirname, "../.env") });
