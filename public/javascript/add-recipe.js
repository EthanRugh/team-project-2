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

// client
// 	.upload(files, { onProgress }, {}, token)
// 	.then((res) => {
// 		console.log("success: ", res);
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	});

var client = filestack.init("AWnIKds6OSDycXnY6OkAGz");
var watermarkHandle = "";
var imageHandle = "";
var transformURL = "https://cdn.filestackcontent.com/watermark=file:";

function openPicker() {
	console.log("open Water Picker");
	client
		.pick({
			accept: "image/*",
			maxFiles: 1,
		})
		.then(function (result) {
			console.log(JSON.stringify(result));
			watermarkHandle = result.filesUploaded[0].handle;
			console.log(watermarkHandle);
		});
}

function openPhotoPicker() {
	console.log("blah blah blah");
	console.log("open Photo Picker");
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

function buildURL() {
	transformURL += watermarkHandle;
	//Puts watermark in the center with a size 200
	transformURL += ",position:[middle,center],size:200/";
	transformURL += imageHandle;
	console.log(transformURL);
}

function storeWaterMarkedPhoto() {
	console.log("storeurl");
	client.storeURL(transformURL).then(function (result) {
		console.log("Store URL");
		console.log(JSON.stringify(result));
		document.getElementById("Download Picture").href = result.url;
	});
}

async function newFormHandler(event) {
	event.preventDefault();

	const title = document.querySelector('input[name="recipe-title"]').value;
	const recipe_text = document.querySelector('input[name="recipe-text"]').value;
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
