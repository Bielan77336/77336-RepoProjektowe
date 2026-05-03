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

// Pobieranie danych z pliku JSON
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

// WALIDACJA FORMULARZA
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