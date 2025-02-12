document.addEventListener("DOMContentLoaded", function () {
    // Detect when the Enter key is pressed inside the original text box
    document.getElementById("original_text").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevents new line
            translateText(); // Automatically translates text
        }
    });
});

function swapLanguages() {
    let fromLang = document.getElementById("from_lang");
    let toLang = document.getElementById("to_lang");
    let tempValue = fromLang.value;
    fromLang.value = toLang.value;
    toLang.value = tempValue;
}

function translateText() {
    const originalText = document.getElementById('original_text').value;
    const fromLang = document.getElementById('from_lang').value;
    const toLang = document.getElementById('to_lang').value;

    if (originalText.trim() === "") {
        alert("Please enter text to translate.");
        return;
    }

    fetch('/translate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: originalText,
            from_lang: fromLang,
            to_lang: toLang
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert('Error: ' + data.error);
        } else {
            document.getElementById('translated_text').value = data.translated_text;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function clearText() {
    document.getElementById('original_text').value = "";
    document.getElementById('translated_text').value = "";
}
