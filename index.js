var express  = require("express"), 
	exphbs   = require("express-handlebars"),
	http     = require("http");

var app = express(), 
	server = http.createServer(app),
	io = require("socket.io").listen(server);

var boardIdChars = "BCDFGHJKLMNPQRSTVWXZ0123456789";
var boardIdLength = 6;
var idPattern = new RegExp("[" + boardIdChars + "]{" + boardIdLength + "}");

app.use(express.static('public'));

app.engine("handlebars", exphbs({defaultLayout:"layout"}));
app.set("view engine", "handlebars")

app.get("/", function (req, res) {
	var pattern = idPattern.toString();
	res.render("home", {
		idPattern: pattern.substr(1, pattern.length - 2)
	});
});

app.post("/", function (req, res) {
	var id = "/";
	for (var i = 0; i < 6; i++) {
		id += boardIdChars[Math.floor(Math.random()*boardIdChars.length)]
	}

	res.redirect(id + "/player");
});

app.get("/:board", function (req, res) {
	if (!isValidBoardId(req.params.board)) {
		res.send("Invalid board ID");
		return;
	}

	res.render("board", {board: req.params.board});
});

app.get("/:board/player", function (req, res) {
	if (!isValidBoardId(req.params.board)) {
		res.send("Invalid board ID");
		return;
	}

	res.render("player", {board: req.params.board});
});

var port = process.env.PORT || 3000;
server.listen(port, function() {
	console.log("Listening on port " + port)
});



io.on("connection", function (socket) {

	socket.on("player", function(id) {
		console.log("Socket " + socket.id + " registered as player for board " + id);
		socket.join(id);
	});
	socket.on("play", function(board, sound) {
		console.log("Socket " + socket.id + " sent sound " + sound + " for board " + board);
		io.to(board).emit("play", sound);
	});

});

function isValidBoardId(id) {
	return idPattern.test(id);
}