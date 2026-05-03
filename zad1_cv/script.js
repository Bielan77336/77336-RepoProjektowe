const buttonTheme = document.getElementById("toggleTheme");
const themeStylesheet = document.getElementById("themeStylesheet");

buttonTheme.addEventListener("click", function () {
    if (themeStylesheet.getAttribute("href") === "green.css") {
        themeStylesheet.setAttribute("href", "red.css");
    } else {
        themeStylesheet.setAttribute("href", "green.css");
    }
});

const buttonProjects = document.getElementById("toggleProjects");
const projectsSection = document.getElementById("projectsSection");

buttonProjects.addEventListener("click", function () {
    if (projectsSection.style.display === "none") {
        projectsSection.style.display = "block";
        buttonProjects.textContent = "Ukryj projekty";
    } else {
        projectsSection.style.display = "none";
        buttonProjects.textContent = "Pokaż projekty";
    }
});

// pobieranie danych z pliku JSON
fetch("data.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        const skillsList = document.getElementById("skillsList");
        const projectsList = document.getElementById("projectsList");

        data.umiejetnosci.forEach(function (skill) {
            const li = document.createElement("li");
            li.textContent = skill;
            skillsList.appendChild(li);
        });

        data.projekty.forEach(function (project) {
            const li = document.createElement("li");
            li.textContent = project;
            projectsList.appendChild(li);
        });
    });

// walidacja formularza
const form = document.getElementById("contactForm");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const imie = document.getElementById("imie").value.trim();
    const nazwisko = document.getElementById("nazwisko").value.trim();
    const email = document.getElementById("email").value.trim();
    const wiadomosc = document.getElementById("wiadomosc").value.trim();

    document.getElementById("errorImie").textContent = "";
    document.getElementById("errorNazwisko").textContent = "";
    document.getElementById("errorEmail").textContent = "";
    document.getElementById("errorWiadomosc").textContent = "";

    let ok = true;

    if (imie === "" || /\d/.test(imie)) {
        document.getElementById("errorImie").textContent = "Niepoprawne imię";
        ok = false;
    }

    if (nazwisko === "" || /\d/.test(nazwisko)) {
        document.getElementById("errorNazwisko").textContent = "Niepoprawne nazwisko";
        ok = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById("errorEmail").textContent = "Niepoprawny email";
        ok = false;
    }

    if (wiadomosc === "") {
        document.getElementById("errorWiadomosc").textContent = "Wiadomość wymagana";
        ok = false;
    }

    if (ok) {
        alert("Formularz wysłany!");
        form.reset();
    }
});

// localStorage - notatki
const noteInput = document.getElementById("noteInput");
const addNote = document.getElementById("addNote");
const notesList = document.getElementById("notesList");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function showNotes() {
    notesList.innerHTML = "";

    notes.forEach(function (note, index) {
        const li = document.createElement("li");
        li.textContent = note;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Usuń";

        deleteButton.addEventListener("click", function () {
            notes.splice(index, 1);
            saveNotes();
            showNotes();
        });

        li.appendChild(deleteButton);
        notesList.appendChild(li);
    });
}

addNote.addEventListener("click", function () {
    const noteText = noteInput.value.trim();

    if (noteText === "") {
        alert("Wpisz treść notatki");
        return;
    }

    notes.push(noteText);
    saveNotes();

    noteInput.value = "";
    showNotes();
});

showNotes();