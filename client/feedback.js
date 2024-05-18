// script.js
const ratingURL = 'http://127.0.0.1:3000/api/rating';
const reviewURL = 'http://127.0.0.1:3000/api/review';
const subjectURL = 'http://127.0.0.1:3000/api/subjects/department/'; //add deptID in the end

// global variables
let selectedSubjectId = '';

document.addEventListener("DOMContentLoaded", async function() {

  // let get teacher data from params
  const teacherData = getTeacherDataFromUrlParams();


  // lets fetch subjects
  await fetchAndPopulateSubjects(subjectURL);

    const subjectStars = document.getElementById("subjectStars").querySelectorAll(".star");
    const teachingMethodStars = document.getElementById("teachingMethodStars").querySelectorAll(".star");
    const puntualityStars =document.getElementById("puntualityStars").querySelectorAll(".star");
    const helpingAttitudeStars = document.getElementById("helpingAttitudeStars").querySelectorAll(".star");
    const labworkStars =document.getElementById("labworkStars").querySelectorAll(".star");
    // Add more star rating categories as needed
  
    const commentInput = document.getElementById("comment");
    const isRoleModelCheckbox = document.getElementById("isRoleModel");
    const submitButton = document.getElementById("submitFeedback");
    // check if user is logged in. if not disable the button'
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    console.log(isLoggedIn)
    if(!isLoggedIn) {
      submitButton.disabled = true;
      submitButton.title = "Login to submit feedback";
    }
    else {
      // User is logged in, remove the inactive class
      submitButton.classList.remove("inactive");
  }

    // Add event listeners to rating stars
    subjectStars.forEach((star, index) => {
      star.addEventListener("click", () => {
        setRating(subjectStars, index + 1);
        updateFeedbackData();
      });
    });
  
    let feedbackData = {
      subjectRating: 0,
      teachingMethodRating: 0,
      puntualityRating:0,
      helpingAttitudeRating:0,
      labworkRating:0,
      // Add more rating categories as needed
      comment: "",
      isRoleModel: false
    };
  
    function resetStars(stars) {
      stars.forEach(star => {
        star.classList.remove("active");
      });
    }
  
    function setRating(stars, value) {
      resetStars(stars);
      stars.forEach((star, index) => {
        if (index < value) {
          star.classList.add("active");
        }
      });
    }
  
    function updateFeedbackData() {
      feedbackData.subjectRating = getRatingValue(subjectStars);
      feedbackData.teachingMethodRating = getRatingValue(teachingMethodStars);
      feedbackData.puntualityRating =getRatingValue(puntualityStars);
      feedbackData.helpingAttitudeRating = getRatingValue(helpingAttitudeStars);
      feedbackData.labworkRating = getRatingValue(labworkStars);
      // Update more rating categories as needed
      feedbackData.comment = commentInput.value;
      feedbackData.isRoleModel = isRoleModelCheckbox.checked;
    }
  
    function getRatingValue(stars) {
      let value = 0;
      stars.forEach((star, index) => {
        if (star.classList.contains("active")) {
          value = index + 1;
        }
      });
      return value;
    }
  
    function submitFeedback() {
      updateFeedbackData();
      // if form is empty then don't submit
      for (let key in feedbackData) {
         if(key == 'isRoleModel' ) {
          continue;
         } if(key == 'comment' && feedbackData[key].trim() == '') {
          alert("Please fill in the feedback");
          return;
         }
         if(!selectedSubjectId || feedbackData[key] == '0'  ) {
          alert("Please fill in the feedback");
          return;
         }
         
      }

      feedbackData = {
        rating : {
          ...feedbackData,
          SubjectId: selectedSubjectId,
          TeacherEmail: teacherData.email  
        },
        review: {
          review_text: feedbackData.comment,
          TeacherEmail: teacherData.email
        }
      }  

      console.log("Feedback submitted:", feedbackData);
       sendRatingAndReview(feedbackData)
      .then(message => {
        console.log(message);
        alert(message);
        // redirect to show feedback page
        const queryParams = new URLSearchParams(teacherData).toString();
                
        // Redirect to the feedback page with the serialized teacher data
        window.location.href = `./showFeedback.html.html?${queryParams}`;
      } )
      .catch(error =>  {
        console.error(error);
        alert("Something went wrong, try again")
      });
      
      // Create a message element
      const messageElement = document.createElement("div");
      messageElement.classList.add("submission-message");
      messageElement.textContent = "Submission successful!";
      
      // Append the message element to the body
      document.body.appendChild(messageElement);
    }

    subjectStars.forEach(star => {
      star.addEventListener("click", function() {
        const value = parseInt(this.getAttribute("data-value"));
        setRating(subjectStars, value);
      });
    });
  
    teachingMethodStars.forEach(star => {
      star.addEventListener("click", function() {
        const value = parseInt(this.getAttribute("data-value"));
        setRating(teachingMethodStars, value);
      });
    });

    puntualityStars.forEach(star => {
        star.addEventListener("click", function() {
          const value = parseInt(this.getAttribute("data-value"));
          setRating(puntualityStars, value);
        });
      });
    helpingAttitudeStars.forEach(star => {
        star.addEventListener("click", function() {
          const value = parseInt(this.getAttribute("data-value"));
          setRating(helpingAttitudeStars, value);
        });
      });
      labworkStars.forEach(star => {
        star.addEventListener("click", function() {
          const value = parseInt(this.getAttribute("data-value"));
          setRating(labworkStars, value);
        });
      });
    // Add event listeners for more star rating categories as needed
  
    submitButton.addEventListener("click", submitFeedback);
  });
  

  async function fetchAndPopulateSubjects(url) {
    const subjectSelect = document.getElementById("subject");
    // dum dept id for now
    const departmentId = '6b10b0aa-b099-4507-8299-79f41e85ba31'
    try {
        // Fetch subject data from the specified URL
        const response = await fetch(`${url}${departmentId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const subjects = await response.json();
        console.log(subjects);
        // Clear existing options in the subject select element
        subjectSelect.innerHTML = '<option value="" disabled selected>Which Subject You Studied</option>';

        // Populate the select element with fetched subjects
        subjects.subjects.forEach(subject => {
            const option = document.createElement('option');
            option.textContent = subject.name; // Assuming each subject object has a 'name' property
            option.value = subject.id; // Assuming each subject object has an 'id' property (optional)
            subjectSelect.appendChild(option);
        });

    } catch (error) {
        console.error('Error fetching subjects:', error);  // TeacherEmail: req.body.TeacherEmail,
        // SubjectId: req.body.SubjectId,
        // Optionally, display an error message to the user
        // For example: subjectSelect.innerHTML = '<option value="" disabled selected>Error fetching subjects</option>';
    }

    // Function to handle the selection change
    function handleSubjectChange(event) {
      const SubjectId = event.target.value; // Get the selected subject ID
      const SubjectName = event.target.options[event.target.selectedIndex].text; // Get the selected subject name
      selectedSubjectId = SubjectId
      console.log(`Selected Subject ID: ${SubjectId}`);
      console.log(`Selected Subject Name: ${SubjectName}`);
  }

  // Add event listener to the select element
  subjectSelect.addEventListener('change', handleSubjectChange);
}

// get data of teacher from url params

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
  console.log("t" ,teacherData);
  return teacherData;
}

/**
 * Sends rating and review data to their respective URLs.
 * @param {object} data - The data object containing rating and review.
 * @returns {Promise<string>} - Success message if both requests are successful.
 */
async function sendRatingAndReview(data) {
  const ratingUrl = ratingURL;
  const reviewUrl = reviewURL;

  try {
      // Send rating data
      await sendRequestWithToken(ratingUrl,  data.rating );

      // Send review data
      await sendRequestWithToken(reviewUrl, data.review );

      return 'Both rating and review were successfully sent!';
  } catch (error) {
      console.error('Error sending rating or review:', error);
      throw error; // Re-throw error after logging it
  }
}

