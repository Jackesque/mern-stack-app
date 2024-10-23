import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import { CLIENT_URL } from "./constants/index.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors({
  origin: CLIENT_URL,
}));
app.use(express.json());
app.use("/record", records);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
