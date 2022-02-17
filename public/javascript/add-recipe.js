var client = filestack.init("AWnIKds6OSDycXnY6OkAGz");

var imageHandle = "";

function openPhotoPicker() {
	client
		.pick({
			accept: "image/*",
			maxFiles: 1,
		})
		.then(function (result) {
			console.log(JSON.stringify(result));
			imageHandle = result.filesUploaded[0].handle;
			console.log(imageHandle);
		});
}

async function newFormHandler(event) {
	event.preventDefault();

	const title = document.querySelector('input[name="recipe-title"]').value;
	const recipe_text = document.querySelector(
		'textarea[name="recipe-text"]'
	).value;
	const recipe_url = "https://cdn.filestackcontent.com/" + imageHandle;

	const response = await fetch(`/api/recipes`, {
		method: "POST",
		body: JSON.stringify({
			title,
			recipe_text,
			recipe_url,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		document.location.reload();
	} else {
		alert(response.statusText);
	}
}

document
	.querySelector(".new-recipe-form")
	.addEventListener("submit", newFormHandler);
