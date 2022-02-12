async function newFormHandler(event) {
	event.preventDefault();

	const title = document.querySelector('input[name="recipe-title"]').value;

	const recipe_text = document.querySelector('input[name="recipe-text"]').value;

	const response = await fetch(`/api/recipes`, {
		method: "POST",
		body: JSON.stringify({
			title,
			recipe_text,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		document.location.replace("/");
	} else {
		alert(response.statusText);
	}
}

document
	.querySelector(".new-recipe-form")
	.addEventListener("submit", newFormHandler);
