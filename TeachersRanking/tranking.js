document.addEventListener("DOMContentLoaded", function() {
    const facultySelect = document.getElementById("faculty");
    const departmentSelect = document.getElementById("department");
    const teacherList = document.getElementById("teacher-list");
  
    class Teacher {
      constructor(name, department, position, expertise, image, link, rank) {
        this.name = name;
        this.department = department;
        this.position = position;
        this.expertise = expertise;
        this.image = image;
        this.link = link;
        this.rank = rank;
      }
    }
  
    let teachers = [
      new Teacher("Dr Qaiser Javeed", "Computer Science", "Professor", "Artificial Intelligence", "/Image/qaiser-javeed.jpg", "https://www.example.com/qaiser-javeed", 1),
      new Teacher("Dr Syed Saqlain", "Mathematics", "Associate Professor", "Algebra", "/Image/syed-saqlain.jpg", "https://www.example.com/syed-saqlain", 2),
      new Teacher("Mr Idrees Ahmad", "Computing", "Lecturer", "Automated-Software Testing", "/Image/idrees-ahmad.jpg", "https://www.example.com/idrees-ahmad", 3),
      // Add more teachers as needed
    ];
  
    // Sort teachers by rank
    teachers.sort((a, b) => a.rank - b.rank);
  
    // Function to display teachers based on selected category
    function displayTeachers(faculty, department) {
      teacherList.innerHTML = ""; // Clear previous teacher list
      teachers.forEach(teacher => {
        if ((faculty === "all" || teacher.department === faculty) && (department === "all" || teacher.department === department)) {
          const teacherDiv = document.createElement("div");
          teacherDiv.classList.add("teacher");
          teacherDiv.innerHTML = `
            <img src="${teacher.image}" alt="${teacher.name}">
            <div class="teacher-details">
              <h3>${teacher.name}</h3>
              <p>Department: ${teacher.department}</p>
              <p>Position: ${teacher.position}</p>
              <p>Expertise: ${teacher.expertise}</p>
              <p>Rank: ${teacher.rank}</p>
              <a href="${teacher.link}" target="_blank">Learn More</a>
              <button class="teacherFeedbackbtn" id="teacherFeedback" data-name="${teacher.name}" data-department="${teacher.department}" data-position="${teacher.position}" data-expertise="${teacher.expertise}" data-rank="${teacher.rank}" data-image="${teacher.image}">Give Feedback</button>
            </div>
          `;
          teacherList.appendChild(teacherDiv);
        }
      });
    }
  
    // Initial display of all teachers
    displayTeachers("all", "all");
  
    // Event listeners for category selection change
    facultySelect.addEventListener("change", function() {
      const selectedFaculty = this.value;
      const selectedDepartment = departmentSelect.value;
      displayTeachers(selectedFaculty, selectedDepartment);
    });
  
    departmentSelect.addEventListener("change", function() {
      const selectedFaculty = facultySelect.value;
      const selectedDepartment = this.value;
      displayTeachers(selectedFaculty, selectedDepartment);
    });
  
    // Event listener for feedback button click
    teacherList.addEventListener("click", function(event) {
      if (event.target.classList.contains("teacherFeedbackbtn")) {
        const teacherData = {
          name: event.target.dataset.name,
          department: event.target.dataset.department,
          position: event.target.dataset.position,
          expertise: event.target.dataset.expertise,
          rank: event.target.dataset.rank,
          image: event.target.dataset.image
        };
        const queryParams = new URLSearchParams(teacherData).toString();
        window.location.href = `/feedback-On-Teacher/feedback.html?${queryParams}`;
      }
    });
  });
  