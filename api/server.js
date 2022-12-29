const express = require("express");
const cors = require("cors");
const user = require("./routes/user.routes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", user);

app.get("/", (req, res) => {
  res.status(200).send("Engine Started, Ready to take off!");
});

app.listen(8080, () =>
  console.log("API is running on http://localhost:8080/login")
);
