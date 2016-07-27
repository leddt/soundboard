var express  = require("express"), 
	exphbs   = require("express-handlebars"),
	http     = require("http");

var app = express(), 
	server = http.createServer(app),
	io = require("socket.io").listen(server);

app.use(express.static('public'));

app.engine("handlebars", exphbs({defaultLayout:"layout"}));
app.set("view engine", "handlebars")

app.get("/", function (req, res) {
	res.render("home");
});

app.post("/", function (req, res) {
	var chars = "ABCDFGHJKLMNPQRSTVWXZ0123456789";
	var id = "/";
	for (var i = 0; i < 6; i++) {
		id += chars[Math.floor(Math.random()*chars.length)]
	}

	res.redirect(id + "/player");
});

app.get("/:boardId", function (req, res) {
	res.render("board", {board: req.params.boardId});
});

app.get("/:boardId/player", function (req, res) {
	res.render("player", {board: req.params.boardId});
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