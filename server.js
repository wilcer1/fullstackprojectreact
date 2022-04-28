const express = require("express");
const routes = require("./routes/routes");
const authRoute = require('./routes/auth');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static("build"));
app.use("/api", routes);
app.use("/api/auth", authRoute);
app.listen(PORT, () => {
    console.log("server running on port " + PORT);
});