// window.addEventListener("DOMContentLoaded", function () {
// 	const apikey = "AWnIKds6OSDycXnY6OkAGz";
// 	const client = filestack.init(apikey);

// 	const onProgress = (evt) => {
// 		document.getElementById("progress").innerHTML = `${evt.totalPercent}%`;
// 	};

// 	document.querySelector("input").addEventListener("change", (event) => {
// 		const files = event.target.files[0];
// 		const token = {};
// 		const cancel = document.getElementById("cancel");
// 		const pause = document.getElementById("pause");
// 		const resume = document.getElementById("resume");

// 		[cancel, resume, pause].forEach((btn) => {
// 			const id = btn.id;
// 			btn.addEventListener("click", () => {
// 				token[id]();
// 			});
// 		});

		client
			.upload(files, { onProgress }, {}, token)
			.then((res) => {
				console.log("success: ", res);
			})
			.catch((err) => {
				console.log(err);
			});
	});
});

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
		document.location.reload();
	} else {
		alert(response.statusText);
	}
}

document
	.querySelector(".new-recipe-form")
	.addEventListener("submit", newFormHandler);
