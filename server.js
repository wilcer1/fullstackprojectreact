const express = require("express");
const routes = require("./routes/routes");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static("build"));
app.use("/api", routes);
app.listen(PORT, () => {
    console.log("server running on port" + PORT);
});