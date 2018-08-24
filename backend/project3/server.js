const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
require("./passport/local-config");
require("./passport/google-config");
require("./passport/serialize");
const request = require("request");

require("./db/db");

const whiteList = ["https://localhost:3000", "https://www.giantbomb.com/api/games/?api_key=522ac62d2f132ed936f4dfcb8bf9768084fea71c&format=json"]
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
session();

app.use(express.static("public"));
app.use(
    session({
      secret: "hamburger dinner theater",
      resave: false,
      saveUninitialized: false
    })
  );
app.use(passport.session());
app.get('/products/:id', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for a whitelisted domain.'})
  })
app.get("/getgamesapi", (req, res) => {
    const options = {
        url: "https://www.giantbomb.com/api/games/?api_key=522ac62d2f132ed936f4dfcb8bf9768084fea71c&format=json",
        headers: {
            "User-Agent": "request"
        }
    }
    request(options, (error, response, body) => {
        console.log(JSON.parse(body));
        res.json({
            status: 200,
            data: body

        })
    })
})


const authController = require("./controllers/authcontroller");
const commentController = require("./controllers/commentController");
const gamesController = require("./controllers/gamesController");
app.use("/auth", authController);
app.use("/comments", commentController);
app.use("/games", gamesController);
app.listen(9000, () => {
  console.log("howdy cowboy");
});