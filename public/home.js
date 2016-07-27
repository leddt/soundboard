(function() {

	var joinForm = document.querySelector("#join");
	var input = joinForm.querySelector("input");

	var regex = new RegExp(input.getAttribute("data-pattern"));

	input.addEventListener("blur", function() {
		var id = input.value.toUpperCase();

		if (!regex.test(id)) {
			input.parentElement.classList.add("has-error");
		} else {
			input.parentElement.classList.remove("has-error");
		}
	});

	joinForm.addEventListener("submit", function (ev) {
		ev.preventDefault();

		var id = input.value.toUpperCase();

		if (!regex.test(id)) {
			input.parentElement.classList.add("has-error");
			input.select();
			return;
		}

		location.href = "/" + id.toUpperCase();
	});

})();