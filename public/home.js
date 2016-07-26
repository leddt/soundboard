(function() {

	var joinForm = document.querySelector("#join");

	joinForm.addEventListener("submit", function (ev) {
		ev.preventDefault();

		var input = joinForm.querySelector("input");
		var id = input.value;

		location.href = "/" + id;
	});

})();