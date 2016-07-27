(function() {

	var sounds = {
		"sound1": "nooo.mp3"
	};

	for (var key in sounds) {
	    if (sounds.hasOwnProperty(key)) {
	        sounds[key] = new Audio("/sounds/" + sounds[key]);
	    }
	}

	var boardId = document.querySelector(".board-id-text").innerText;

	var socket = io();
	socket.on("connect", function() {
		console.log("connected");
		socket.emit("player", boardId);
	});

	socket.on("play", function (sound) {
		console.log("received sound " + sound);

		if (sounds[sound]) {
			sounds[sound].play();
		}
	});

})();