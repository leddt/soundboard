(function() {

	var sounds = {
		"nooo": "nooo.mp3",
		"monsterkill": "monsterkill.mp3",
		"assbag": "assbag.mp3",
		"trololo": "trololo.mp3",
		"merovingian": "merovingian.mp3",
		"rimshot": "rimshot.mp3",
		"combobreaker": "combobreaker.mp3",
		"ursofucked": "ursofucked.mp3",
		"fart": "fart.mp3",
		"mgsalert": "mgsalert.mp3",
		"airhorn": "airhorn.mp3",
		"shallnotpass": "shallnotpass.mp3",
		"denied": "denied.mp3",
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