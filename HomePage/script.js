
let SignUpBtn = document.querySelector("#singUpBtn");
let loginBtn = document.querySelector("#loginBtn");
let viewallTeacherBtn = document.querySelector("#ViewallTeachersBtn");
let viewTeachers=document.querySelector("#GiveFeedbackSlideBtn")
let homeNavigation = document.querySelector("#homeNav");
let teacherListNavigation = document.querySelector("#teacherRankingNav");

  // Define Teacher class
function Teacher(name,faculty, department, position, specialization, imageSrc, profileLink, rating) {
    this.name = name;
    this.faculty= faculty;
    this.department = department;
    this.position = position;
    this.specialization = specialization;
    this.imageSrc = imageSrc;
    this.profileLink = profileLink;
    this.rating = rating;
}
// Array of teachers
let teachers = [
    new Teacher("Dr Qaiser Javeed", "Computing", "Computer Science", "Professor", "Artificial Intelligence", "/Image/qaiser-javeed.jpg", "https://www.example.com/qaiser-javeed", 3),
    new Teacher("Dr Syed Saqlain", "Computing", "Software Enginnering", "Associate Professor", "Algebra", "/Image/syed-saqlain.jpg", "https://www.example.com/syed-saqlain", 4),
    new Teacher("Mr Idrees Ahmad", "Computing", "Computer Science", "Lecturer", "Automated-Software Testing", "/Image/idrees-ahmad.jpg", "https://www.example.com/idrees-ahmad", 4),
    new Teacher("Dr Tehmina Amjad", "Computing", "Information Technology", "Associate Professor", "Algebra", "/Image/tehmina-amjad.jpg", "https://www.example.com/tehmina-amjad", 4),
    new Teacher("Dr Tabassum Kanwal","Computing",  "Computer Science", "Associate Professor", "Algebra", "/Image/tabassum-kanwal.png", "https://www.example.com/tabassum-kanwal", 5),
    
];

// Function to sort teachers based on their ranking
function sortTeachersByRating() {
    teachers.sort(function(a, b) {
        return b.rating - a.rating; // Sort in descending order
    });
}


// Function to create HTML elements for each teacher and append them to the document
function createTeacherCards() {
    sortTeachersByRating(); // Sort teachers based on their ranking

    let rankingFrame = document.getElementById("rankingFrame");
    rankingFrame.innerHTML = ''; // Clear previous content

    teachers.forEach(function(teacher) {
        let card = document.createElement("div");
        card.classList.add("card");

        let img = document.createElement("img");
        img.src = teacher.imageSrc;
        img.alt = teacher.name;

        let name = document.createElement("h3");
        name.textContent = teacher.name;

        let rating = document.createElement("h4");
        rating.textContent=`Rating: `;
        rating.classList.add("rating");
        for (let i = 0; i < 5; i++) {
            let starIcon = document.createElement("i");
            starIcon.classList.add("fas", "fa-star");
            if (teacher.rating > i) {
                starIcon.classList.add("filled");
            }
            rating.appendChild(starIcon);
        }

        let faculty = document.createElement("p");
        faculty.textContent = `Faculty: ${teacher.faculty}`;

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
        card.appendChild(name);
        card.appendChild(rating);
        card.appendChild(faculty);
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
viewallTeacherBtn.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default behavior of the link
    window.open("tRanking.html", "_blank"); // Open the login page in a new tab
});
viewTeachers.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default behavior of the link
    window.open("tRanking.html", "_blank"); // Open the login page in a new tab
});
homeNavigation.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default behavior of the link
    window.open("index.html", "_blank"); // Open the login page in a new tab
});
teacherListNavigation.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default behavior of the link
    window.open("tRanking.html", "_blank"); // Open the login page in a new tab
});



