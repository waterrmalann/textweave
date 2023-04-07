// <textarea> where text is inputted by the user.
const e_inputText = document.getElementById("inputText");
// <pre> where text is outputted by the app.
const e_outputText = document.getElementById("outputText");
// <input> which decides whether the pattern should end how it started.
const e_checkboxReverseEnd = document.getElementById("checkboxReverseEnd");
// <select> dropdown which lets the user select which pattern to generate.
const e_options = document.getElementById("options");

// Listen to user input and update the patterns accordingly.
e_inputText.addEventListener("input", () => {
	if (e_inputText.value !== "") {
		syncGenerator();
	}
});

// Listen to changes on the checkbox and update the patterns accordingly.
e_checkboxReverseEnd.addEventListener("change", syncGenerator);

// Listen to changes on the pattern dropdown and update the patterns accordingly.
e_options.addEventListener("change", syncGenerator);

// Send generated pattern to user clipboard if they click on the output container.
e_outputText.addEventListener("click", () => {
	navigator.clipboard
		.writeText(e_outputText.innerText)
		.then(() => {
			alert("Copied.");
		})
		.catch((error) => {
			alert(`Copy failed! ${error}`);
		});
});

/**
 * Generate a pattern output based on the type of pattern selected by the user in the dropdown.
 */
function syncGenerator() {
	if (e_options.value === "pyramid") {
		e_outputText.innerText = triangulate(e_inputText.value);
	} else if (e_options.value === "spaced") {
		e_outputText.innerText = spaced(e_inputText.value);
	} else if (e_options.value === "pyramidRight") {
        e_outputText.innerText = triangulateRight(e_inputText.value);
    }
}

/**
 * **Pattern: Left Triangle**
 * 
 * Takes a text input and generates a left angled triangle pattern out of it.
 * @param  {String} text The input text.
 * @return {String} Generated pattern.
 */
function triangulate(text) {
	let _parts = [];
	let _constructed = "";
	for (const c of text) {
		_constructed += c;
		_parts.push(_constructed);
	}
	if (e_checkboxReverseEnd.checked) {
		let _reversed = _parts.slice().reverse();
        _reversed.shift();
		_parts.push(..._reversed);
	}
	return _parts.join("\n");
}

/**
 * **Pattern: Right Triangle**
 * 
 * Takes a text input and generates a right angled triangle pattern out of it.
 * @param  {String} text The input text.
 * @return {String} Generated pattern.
 */
function triangulateRight(text) {
    let _parts = [];
    let _constructed = text + ' ';

	for (let i = 0; i < text.length; i++) {
		_constructed = _constructed.substring(0, _constructed.length - 1);
		_parts.push(_constructed);
	}

/*
    for (let i = 0; i < text.length; i++) {
        for (let j = i; j < text.length; j++) {
           _constructed += text[j];
        }
        _parts.push(_constructed);
        _constructed = '';
    }*/

    if (e_checkboxReverseEnd.checked) {
		let _reversed = _parts.slice().reverse();
        _reversed.shift();
		_parts.push(..._reversed);
	}

    return _parts.join('\n'); 
}

/**
 * **Pattern: Spaced**
 * 
 * Takes a text input and generates a spaced text pattern out of it.
 * @param  {String} text The input text.
 * @return {String} Generated pattern.
 */
function spaced(text) {
	let _space = text.length;
	let _parts = [];
	let _constructed = text;
	for (let i = 0; i < _space; i++) {
		_constructed = " " + _constructed;
		_parts.push(_constructed);
	}
	if (e_checkboxReverseEnd.checked) {
		let _reversed = _parts.slice().reverse();
        _reversed.shift();
		_parts.push(..._reversed);
	}
	return _parts.join("\n");
}