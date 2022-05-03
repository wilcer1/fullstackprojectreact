const express = require("express");
const routes = require("./routes/routes");
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static("build"));
app.use("/api", routes);
app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.listen(PORT, () => {
    console.log("server running on port " + PORT);
});