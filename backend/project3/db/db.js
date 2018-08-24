const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/beerStuff");
mongoose.connection.on("connected", () => {
    console.log("Mongoose Connected");
});
mongoose.connection.on("error", (err) => {
    console.log(err, "Error");
});
mongoose.connection.on("disconnected", () => {
    console.log("Mongoose Disconnected")
});