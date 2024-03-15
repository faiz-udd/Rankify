document.addEventListener("DOMContentLoaded", function() {
    // Sample data (for testing)
    const userData = [
        { name: "Alice", picture: "/Image/avator.png" },
        { name: "Bob", picture: "/Image/avator.png" },
        { name: "Charlie", picture: "/Image/avator.png" }
    ];

    const feedbackData = [
        { rating: 4, comment: "Great teacher! I", userIndex: 0 },
        { rating: 5, comment: "Excellent lectures!", userIndex: 1 },
        { rating: 3, comment: "Good teaching skills.", userIndex: 2 }
    ];

    // Display teacher profile data (already implemented)

    // Display student feedback
    displayStudentFeedback(userData, feedbackData);
});

// Function to display student feedback
function displayStudentFeedback(userData, feedbackData) {
    const feedbackList = document.getElementById("feedbackList");

    // Loop through feedback data and display each feedback item
    feedbackData.forEach(feedback => {
        const user = userData[feedback.userIndex];
        const feedbackItemHTML = `
            <div class="feedback-item">
                <img src="${user.picture}" alt="${user.name}" class="feedback-avatar">
                <div class="feedback-content">
                    <p class="feedback-author">${user.name}</p>
                    <p class="feedback-rating">${generateStarRating(feedback.rating)}</p>
                    <p class="feedback-comment">${feedback.comment}</p>
                </div>
            </div>
        `;
        feedbackList.innerHTML += feedbackItemHTML;
    });
}

// Function to generate star rating based on a numerical rating
function generateStarRating(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (rating > i) {
            stars += '<i class="fas fa-star filled"></i>';
        } else {
            stars += '<i class="fas fa-star"></i>';
        }
    }
    return stars;
}


document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const teacherName = params.get("name");
    const teacherDepartment = params.get("department");
    const teacherPosition = params.get("position");
    const teacherExpertise = params.get("expertise");
    const teacherRating = parseInt(params.get("rating")); // Parse rating as an integer
    const teacherImage = params.get("image");
    const teacherLink = params.get("link");

    document.getElementById("teacher-avatar").src = teacherImage;
    document.getElementById("teacher-name").textContent = teacherName;
    document.getElementById("teacher-department").textContent = "Department: " + teacherDepartment;
    document.getElementById("teacher-position").textContent = "Position: " + teacherPosition;
    document.getElementById("teacher-expertise").textContent = "Expertise: " + teacherExpertise;

    // Generate star icons for rating
    const ratingContainer = document.getElementById("teacher-rating");
    const ratingPara = document.getElementById("ratingPara")
    ratingPara.innerText ="Rating: "
    for (let i = 0; i < 5; i++) {
        const starIcon = document.createElement("i");
        starIcon.classList.add("fas", "fa-star");
        if (i < teacherRating) {
            starIcon.classList.add("filled");
        }
        ratingContainer.appendChild(starIcon);
    }

    document.getElementById("teacher-link").href = teacherLink;
});

