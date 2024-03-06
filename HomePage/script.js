
let SignUpBtn = document.querySelector("#singUpBtn");
let loginBtn = document.querySelector("#loginBtn");

// Define Teacher class
function Teacher(name, department, position, specialization, imageSrc, profileLink, rank) {
    this.name = name;
    this.department = department;
    this.position = position;
    this.specialization = specialization;
    this.imageSrc = imageSrc;
    this.profileLink = profileLink;
    this.rank = rank;
}

// Array of teachers
let teachers = [
    new Teacher("Dr Qaiser Javeed", "Computer Science", "Professor", "Artificial Intelligence", "/Image/qaiser-javeed.jpg", "https://www.example.com/qaiser-javeed", 5),
    new Teacher("Dr Syed Saqlain", "Mathematics", "Associate Professor", "Algebra", "/Image/syed-saqlain.jpg", "https://www.example.com/syed-saqlain", 2),
    new Teacher("Mr Idrees Ahmad", "Computing", "Lecturer", "Automated-Software Testing", "/Image/idrees-ahmad.jpg", "https://www.example.com/idrees-ahmad", 3),
    new Teacher("Dr Tehmina Amjad", "Mathematics", "Associate Professor", "Algebra", "/Image/tehmina-amjad.jpg", "https://www.example.com/tehmina-amjad", 4),
    new Teacher("Dr Tabassum Kanwal", "Mathematics", "Associate Professor", "Algebra", "/Image/tabassum-kanwal.png", "https://www.example.com/tabassum-kanwal", 1)
];

// Function to sort teachers based on their ranking
function sortTeachersByRank() {
    teachers.sort(function(a, b) {
        return a.rank - b.rank;
    });
}

// Function to create HTML elements for each teacher and append them to the document
function createTeacherCards() {
    sortTeachersByRank(); // Sort teachers based on their ranking

    let rankingFrame = document.getElementById("rankingFrame");
    rankingFrame.innerHTML = ''; // Clear previous content

    teachers.forEach(function(teacher) {
        let card = document.createElement("div");
        card.classList.add("card");

        let img = document.createElement("img");
        img.src = teacher.imageSrc;
        img.alt = teacher.name;

        let rank = document.createElement("h2");
        rank.textContent = `Ranked #${teacher.rank}`;

        let name = document.createElement("h3");
        name.textContent = teacher.name;

        let department = document.createElement("p");
        department.textContent = `Department: ${teacher.department}`;

        let designation = document.createElement("p");
        designation.textContent = `Designation: ${teacher.position}`;

        let specialization = document.createElement("p");
        specialization.textContent = `Specialization: ${teacher.specialization}`;

        let readMoreLink = document.createElement("a");
        readMoreLink.textContent = "Read More";
        readMoreLink.href = teacher.profileLink;
        readMoreLink.target = "_blank";

        card.appendChild(img);
        card.appendChild(rank);
        card.appendChild(name);
        card.appendChild(department);
        card.appendChild(designation);
        card.appendChild(specialization);
        card.appendChild(readMoreLink);

        rankingFrame.appendChild(card);
    });
}

// Call the function to create teacher cards when the page loads
window.onload = function() {
    createTeacherCards();
};

// Add event listener to sign-up button
SignUpBtn.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default behavior of the link
    window.open("signup.html", "_blank"); // Open the signup page in a new tab
});
loginBtn.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default behavior of the link
    window.open("login.html", "_blank"); // Open the login page in a new tab
});


