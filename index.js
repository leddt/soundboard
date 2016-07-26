var express = require("express"), 
	exphbs  = require("express-handlebars");

var app = express();

app.use(express.static('public'));

app.engine("handlebars", exphbs({defaultLayout:"layout"}));
app.set("view engine", "handlebars")

app.get("/", function (req, res) {
	res.render("home");
});

app.get("/:boardId", function (req, res) {
	res.render("board");
});

app.get("/:boardId/player", function (req, res) {
	res.render("player");
});

app.listen(3000, function() {
	console.log("Listening on port 3000")
});