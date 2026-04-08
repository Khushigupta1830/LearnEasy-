// script.js

// Your web app's Firebase configuration
// 🔥 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCVOdA2AQNZr8GUcNPvlqGxLSI3qfX_-Dg",
  authDomain: "learneasy-4b0b0.firebaseapp.com",
  projectId: "learneasy-4b0b0",
  storageBucket: "learneasy-4b0b0.firebasestorage.app",
  messagingSenderId: "1015592555177",
  appId: "1:1015592555177:web:d46efc08dc831ee0f30fb8",
  measurementId: "G-CFZZV05P6N"
};

// 🔥 Initialize Firebase (COMPAT MODE)
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

console.log("✅ Firebase Connected Successfully!");


// 🌙 Toggle Theme
function toggleTheme() {
    document.body.classList.toggle("light");
}
window.toggleTheme = toggleTheme;


// 📂 Open File (Google Drive link)
function openFile(fileUrl) {
    if (!fileUrl) {
        alert("File URL not found!");
        return;
    }
    window.open(fileUrl, "_blank");
}
window.openFile = openFile;


// 🚀 Go to Library
function goToLibrary() {
    window.location.href = "library.html";
}
window.goToLibrary = goToLibrary;


// ➕ ADD NOTE TO FIRESTORE
async function addNote() {
    const title = document.getElementById("title")?.value;
    const googleDriveLink = document.getElementById("file")?.value;

    if (!title || !googleDriveLink) {
        alert("Please fill all fields!");
        return;
    }

    try {
        const docRef = await db.collection("materials").add({
            title: title,
            googleDriveLink: googleDriveLink,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        console.log("✅ Added with ID:", docRef.id);
        alert("Material added successfully!");

        // Clear inputs
        document.getElementById("title").value = "";
        document.getElementById("file").value = "";

        // Refresh list
        getFirestoreDataAndDisplay();

    } catch (error) {
        console.error("❌ Error:", error);
        alert("Error adding material!");
    }
}
window.addNote = addNote;


// 📥 GET DATA FROM FIRESTORE
async function getFirestoreDataAndDisplay() {
    const container = document.getElementById("notesContainer");
    if (!container) return;

    container.innerHTML = "<p>Loading...</p>";

    try {
        const snapshot = await db
            .collection("materials")
            .orderBy("createdAt", "desc")
            .get();

        container.innerHTML = "";

        if (snapshot.empty) {
            container.innerHTML = "<p>No materials found.</p>";
            return;
        }

        snapshot.forEach(doc => {
            const data = doc.data();

            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <h3>${data.title}</h3>
                <p>
                  <a href="${data.googleDriveLink}" target="_blank">
                    Open Google Drive
                  </a>
                </p>
                <button onclick="openFile('${data.googleDriveLink}')">
                    Open
                </button>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error("❌ Fetch Error:", error);
        container.innerHTML = "<p>Error loading data</p>";
    }
}


// 🚀 AUTO LOAD DATA ON PAGE
window.addEventListener("DOMContentLoaded", () => {
    getFirestoreDataAndDisplay();
});



