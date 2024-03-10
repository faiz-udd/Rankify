// script.js
document.addEventListener("DOMContentLoaded", function() {
    const subjectStars = document.getElementById("subjectStars").querySelectorAll(".star");
    const teachingMethodStars = document.getElementById("teachingMethodStars").querySelectorAll(".star");
    const puntualityStars =document.getElementById("puntualityStars").querySelectorAll(".star");
    const helpingAttitudeStars = document.getElementById("helpingAttitudeStars").querySelectorAll(".star");
    const labworkStars =document.getElementById("labworkStars").querySelectorAll(".star");
    // Add more star rating categories as needed
  
    const commentInput = document.getElementById("comment");
    const isRoleModelCheckbox = document.getElementById("isRoleModel");
    const submitButton = document.getElementById("submitFeedback");
  
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
      // Store feedback data in arrays for each teacher
      // For example:
      // teacherFeedbackData.push(feedbackData);
      console.log("Feedback submitted:", feedbackData);
      // Reset form after submission
      resetStars(subjectStars);
      resetStars(teachingMethodStars);
      resetStars(puntualityStars);
      resetStars(helpingAttitudeStars);
      resetStars(labworkStars)
      // Reset more rating categories as needed
      commentInput.value = "";
      isRoleModelCheckbox.checked = false;
      // Show confirmation message or redirect to another page
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
  