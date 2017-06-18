(function() {

	var audioElements = document.querySelectorAll("audio");
	var sounds = {};

	for (var i = 0; i < audioElements.length; i++)
		sounds[audioElements[i].id] = audioElements[i];

	stfu();
	
	var boardId = document.querySelector(".board-id-text").innerText;

	var socket = io();
	socket.on("connect", function() {
		console.log("connected");
		socket.emit("player", boardId);
	});

	socket.on("play", function (message) {
		console.log("received sound " + message.sound);

		if (message.stfu) {
			stfu();
		}

		var s = sounds[message.sound];
		if (s) {
			s.pause();
			s.currentTime = 0;
			s.play();
		}
	});


	function stfu() {
		for (var key in sounds) {
			var s = sounds[key];
			s.pause();
			s.currentTime = 0;
		}
	}

})();
