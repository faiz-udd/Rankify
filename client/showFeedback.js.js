// get ratings of particular teacher by teacher email
const ratingURL = 'http://127.0.0.1:3000/api/ratings/'
const reviewURL = 'http://127.0.0.1:3000/api/reviews/'


document.addEventListener("DOMContentLoaded", async function() {
   
    const giveFeedbackBtn = document.getElementById('giveFeedbackBtn');

    giveFeedbackBtn.addEventListener('click', (event) => {
        event.preventDefault();  // Prevent the default link click behavior

        const teacherData = getTeacherDataFromUrlParams();
        const queryParams = new URLSearchParams(teacherData).toString();

        // Redirect to feedback page with teacher data as URL params
        window.location.href = `feedback.html?${queryParams}`;
    });

   // dummy data
    let feedbackData = []
   
    const teacherData = getTeacherDataFromUrlParams();
    const teacherRatingAndReview  = await getRatingAndReview(`${ratingURL}${teacherData.email}`,`${reviewURL}${teacherData.email}`)
    console.log("apiResponse",teacherRatingAndReview);
    const teacherRatings = teacherRatingAndReview[0].subject_ratings.teacher_ratings.map(rating => {
        return rating.rating
    })
   
    const teacherReviews = teacherRatingAndReview[1].reviews.reviews.map(review => review.review_text);
    for(let i = 0; i < teacherRatings.length; i++) {
        feedbackData.push({ 
            rating: teacherRatings[i],
            comment: teacherReviews[i] ? teacherReviews[i] : " No Comment  "
        })
    }
        // Display student feedback
        displayStudentFeedback(feedbackData);
    console.log(teacherRatings);
    console.log(teacherReviews);

    if(!teacherRatingAndReview) {
        alert("Something went wrong, please try again")
    }

    document.getElementById("teacher-avatar").src = teacherData.profile_picture;
    document.getElementById("teacher-name").textContent = teacherData.name;
    document.getElementById("teacher-department").textContent = "Department: " + teacherData.department;
    document.getElementById("teacher-position").textContent = "Position: " + teacherData.designation;
    document.getElementById("teacher-expertise").textContent = "Expertise: " + teacherData.specialization;
    // select give feedback link


    // Generate star icons for rating
    const ratingContainer = document.getElementById("teacher-rating");
    const ratingPara = document.getElementById("ratingPara")
    ratingPara.innerText ="Rating: "
    for (let i = 0; i < 5; i++) {
        const starIcon = document.createElement("i");
        starIcon.classList.add("fas", "fa-star");
        if (i < teacherData.rating) {
            starIcon.classList.add("filled");
        }
        ratingContainer.appendChild(starIcon);
    }
    
    console.log("teacher dta", teacherData);
    document.getElementById("teacher-link").href = teacherData.original_profile;


function getTeacherDataFromUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);

  const teacherData = {
    name: urlParams.get('name'),
    email: urlParams.get('email'),
    department: urlParams.get('department'),
    designation: urlParams.get('designation'),
    specialization: urlParams.get('specialization'),
    rating: urlParams.get('rating'),
    profile_picture: urlParams.get('profile_picture'),
    original_profile: urlParams.get('original_profile'),
  };

  // Now you can use the `teacherData` object to populate your feedback form or display teacher info
  console.log(teacherData);
  return teacherData;
}

});

/**
 * Gets rating and review data from their respective URLs.
 * @returns {Promise<string>} - Success message if both requests are successful.
 */
async function getRatingAndReview(ratingURL,reviewURL) {
    const ratingUrl = ratingURL;
    const reviewUrl = reviewURL;
  
    try {
       // get rating data about given teacher
       const teacher_rating = await getTeacherData(ratingUrl);
       const teacher_review = await getTeacherData(reviewUrl);
       if(!teacher_rating || !teacher_review ) {
        return null;
       }
      return [teacher_rating, teacher_review]
    } catch (error) {
        console.error('Error getting rating or review:', error);
      
        throw error; // Re-throw error after logging it
    }
  }
 
async function getTeacherData(url) {
    try {
        const response = await fetch(url);
        console.log("code ",response.status)
        if(response.status === 500) {
            alert('something went wrong')
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data from API:', error);
        return null; // Return null if API call fails
    }
}

// Function to display student feedback
function displayStudentFeedback(feedbackData) {
    const feedbackList = document.getElementById("feedbackList");

    // Loop through feedback data and display each feedback item
    feedbackData.forEach(feedback => {
        const feedbackItemHTML = `
            <div class="feedback-item">
                <img src="/Image/avator.png" alt="Anonymous" class="feedback-avatar">
                <div class="feedback-content">
                    <p class="feedback-author">Anonymous</p>
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

