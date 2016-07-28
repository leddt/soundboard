(function() {

	var audioElements = document.querySelectorAll("audio");
	var sounds = {};

	for (var i = 0; i < audioElements.length; i++)
		sounds[audioElements[i].id] = audioElements[i];

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