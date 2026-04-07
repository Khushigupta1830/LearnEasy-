// 🌙 Toggle Dark / Light Mode
function toggleTheme() {
    document.body.classList.toggle("light");
}


// 📂 Open PDF / File
function openFile(fileName) {
    if (!fileName) {
        alert("File not found!");
        return;
    }
    window.open(fileName, "_blank");
}


// ➕ Add Note (Admin Page)
function addNote() {
    let title = document.getElementById("title").value;
    let file = document.getElementById("file").value;

    if (title === "" || file === "") {
        alert("Please fill all fields!");
        return;
    }

    let container = document.getElementById("notesContainer");

    let card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
        <h3>${title}</h3>
        <p>Uploaded file: ${file}</p>
        <button onclick="openFile('${file}')">Open</button>
    `;

    container.appendChild(card);

    // Clear input fields
    document.getElementById("title").value = "";
    document.getElementById("file").value = "";
}


// 🚀 Go to Library Page
function goToLibrary() {
    window.location.href = "library.html";
}