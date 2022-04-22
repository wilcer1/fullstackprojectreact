const express = require("express");
const routes = require("./routes/routes");
const app = express();

app.use(express.json());
app.use(express.static("build"));
app.use("/api", routes);
app.listen(5000, () => {
    console.log("server running");

});