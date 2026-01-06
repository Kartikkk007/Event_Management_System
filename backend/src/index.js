import dotenv from "dotenv";
import app from "./App.js";
import User from "./models/User.js";
import Vendor from "./models/Vendor.js";

console.log("Models loaded:", User.modelName, Vendor.modelName);

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
