const express = require("express");
const path = require("path")
const routes = require("./routes/routes");
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin');
const bookingRoute = require("./routes/booking");
const app = express();
const apiErrorHandler = require("./error/api-error-handler");
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));
app.use("/api", routes);
app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api/booking", bookingRoute);
app.use(apiErrorHandler);
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(PORT, () => {
    console.log("server running on port " + PORT);
});