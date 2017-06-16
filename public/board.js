(function () {

	var boardId = document.querySelector(".board-id-text").innerText;
	var sounds = document.getElementById("sound-buttons");
	var socket = io();
	
	socket.on("connect", function(){
		console.log("connected");
	});

	sounds.addEventListener("click", function (e) {
		var sound = e.target.getAttribute("data-sound");
		var stfu = e.target.getAttribute("data-stfu") === "true";
		console.log("sending sound " + sound);
		socket.emit("play", boardId, {sound, stfu});
	});

})();