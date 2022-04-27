const express = require("express");
const routes = require("./routes/routes");
const authRoute = require('./routes/auth');
const app = express();

app.use(express.json());
app.use(express.static("build"));
app.use("/api", routes);
app.use("/api/auth", authRoute);
app.listen(5000, () => {
    console.log("server running");

});