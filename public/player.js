(function() {

	var sounds = {
		"nooo": "nooo.mp3",
		"monsterkill": "monsterkill.mp3",
		"assbag": "assbag.mp3",
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

		var s = sounds[sound];
		if (s) {
			s.pause();
			s.currentTime = 0;
			s.play();
		}
	});

})();