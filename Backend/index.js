const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");

const app = express();
const PORT = process.env.PORT;
const dreamsRouter = require("./routes/dreams");
const userRouter = require("./routes/user");
const roleRouter = require("./routes/roles");
app.use(cors());
app.use(express.json());
app.use("/dreams", dreamsRouter)
app.use("/users", userRouter)
app.use("/roles", roleRouter)


app.use("*", (req, res) => res.status(404).json("NO content at this path"));
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
