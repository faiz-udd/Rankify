document.addEventListener("DOMContentLoaded", function() {
  const facultySelect = document.getElementById("faculty");
  const departmentSelect = document.getElementById("department");
  const teacherList = document.getElementById("teacher-list");


  class Teacher {
      constructor(name, faculty, department, position, expertise, image, link, rating) {
          this.name = name;
          this.faculty = faculty;
          this.department = department;
          this.position = position;
          this.expertise = expertise;
          this.image = image;
          this.link = link;
          this.rating = rating;
      }
  }

  let teachers = [
      new Teacher("Dr Qaiser Javeed", "Computing", "Software Engineering", "Assistant Professor", "Networks", "/Image/qaiser-javeed.jpg", "https://www.iiu.edu.pk/?page_id=1825#:~:text=DR.%20QAISAR%20JAVAID,Specialization%3A%20Networks", 5),
      new Teacher("Dr Syed Saqlain", "Computing", "Information Technology","Associate Professor", "AI,ML", "/Image/syed-saqlain.jpg", "https://www.iiu.edu.pk/?page_id=1825#:~:text=DR.%20SYED%20MUHAMMAD,Diagnosis%2C%20Video%20Surveillance", 4),
      new Teacher("Mr Idrees Ahmad", "Computing", "Computer Science", "Lecturer", "Automated-Software Testing", "/Image/idrees-ahmad.jpg", "https://www.example.com/idrees-ahmad", 5),
      new Teacher("Dr Imran Khan", "Computing", "Computer Science", "Assistant Professor", "Data Mining, ML, NLP", "https://www.iiu.edu.pk/wp-content/uploads/images/faculties/fbas/cs-se/imran-khan.jpg", "https://www.iiu.edu.pk/?page_id=1825#:~:text=DR.%20IMRAN%20KHAN,iiu.edu.pk",3),
      new Teacher("Dr Qamar Abbas", "Computing", "Software Engineering", "Associate Professor", "AI, Soft Computing", "https://www.iiu.edu.pk/wp-content/uploads/2023/02/qamar-abbas.jpg", "https://www.iiu.edu.pk/?page_id=1825#:~:text=DR.%20QAMAR%20ABBAS,iiu.edu.pk", 5),
      new Teacher("Dr Tehmina Amjad", "Computing", "Information Technology", "Associate Professor", "Information Retrieval", "https://www.iiu.edu.pk/wp-content/uploads/images/faculties/fbas/tehmina-amjad.jpg", "https://www.iiu.edu.pk/?page_id=1825#:~:text=DR.%20TEHMINA%20AMJAD,Phone%3A%20051%2D9019821", 4),
      new Teacher("Dr Tabassum Kanwal","Computing",  "Computer Science", "Lecturer", "Computer Networks, Deep Learning", "https://www.iiu.edu.pk/wp-content/uploads/2024/02/tabassum-kanwal.png", "https://www.iiu.edu.pk/?page_id=1825#:~:text=MS.%20TABASSUM%20KANWAL,Phone%3A", 5),
      new Teacher("Ms Fatima Ali", "Computing", "Information Technology", "Lecturer", "Web Development", "/Image/fatima-ali.jpg", "https://www.example.com/fatima-ali", 5),
        new Teacher("Dr Mohammad Khan", "Computing", "Computer Science", "Professor", "Artificial Intelligence", "/Image/mohammad-khan.jpg", "https://www.example.com/mohammad-khan", 4),
        new Teacher("Dr Sara Ahmed", "Computing", "Software Engineering", "Associate Professor", "Data Science", "/Image/sara-ahmed.jpg", "https://www.example.com/sara-ahmed", 2),
        new Teacher("Mr Bilal Raza", "Computing", "Information Technology", "Lecturer", "Database Management", "/Image/bilal-raza.jpg", "https://www.example.com/bilal-raza", 3),
        new Teacher("Dr Ali Rizwan", "Computing", "Computer Science", "Professor", "Network Security", "/Image/ali-rizwan.jpg", "https://www.example.com/ali-rizwan", 1),
        new Teacher("Dr Samina Bibi", "Computing", "Software Engineering", "Associate Professor", "Cloud Computing", "/Image/samina-bibi.jpg", "https://www.example.com/samina-bibi", 5),
        new Teacher("Ms Zainab Abbas", "Computing", "Information Technology", "Lecturer", "Cybersecurity", "/Image/zainab-abbas.jpg", "https://www.example.com/zainab-abbas", 4),
        new Teacher("Dr Usman Ali", "Computing", "Computer Science", "Professor", "Mobile App Development", "/Image/usman-ali.jpg", "https://www.example.com/usman-ali", 3)

      // Add more teachers as needed
  ];

  // Sort teachers by rating
  teachers.sort((a, b) => b.rating - a.rating);

  // Function to display teachers based on selected category
  function displayTeachers(faculty, department) {
    teacherList.innerHTML = ""; // Clear previous teacher list
    teachers.forEach(teacher => {
        if ((faculty === "all" || teacher.faculty === faculty) && (department === "all" || teacher.department === department)) {
            const teacherDiv = document.createElement("div");
            teacherDiv.classList.add("teacher");
            teacherDiv.innerHTML = `
                <img src="${teacher.image}" onerror="this.onerror=null; this.src='/Image/avator.png';">
                <div class="teacher-details">
                    <h3>${teacher.name}</h3>
                    <p><strong>Faculty: ${teacher.department}</strong></p>
                    <p><strong>Department: ${teacher.department}</strong></p>
                    <p><strong>Position: ${teacher.position}</strong></p>
                    <p><strong>Expertise: ${teacher.expertise}</strong></p>
                    <span class="rating">
                        <p>Rating:</p> ${generateStarRating(teacher.rating)} 
                    </span>
                    <a href="${teacher.link}" target="_blank"><strong>Learn More</strong></a>
                    <br><br>
                    <button class="teacherFeedbackbtn" data-name="${teacher.name}" data-department="${teacher.department}" data-position="${teacher.position}" data-expertise="${teacher.expertise}" data-rating="${teacher.rating}" data-image="${teacher.image}" target="_blank">Give Feedback</button>
                </div>
            `;
            teacherList.appendChild(teacherDiv);
        }
    });
}

// Function to generate star rating based on a numerical rating
function generateStarRating(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (rating > i) {
            stars += '<i class="fas fa-star"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}


  // Populate departments for each faculty
  const departmentsData = {
      'Computing': ['Computer Science', 'Software Engineering', 'Information Technology'],
      'all': ['All Departments']
      // Add more departments as needed
  };
  //Event listener to display the select faculty and department
  facultySelect.addEventListener("change", function() {
      const selectedFaculty = this.value;
      populateDepartments(selectedFaculty);
      const selectedDepartment = departmentSelect.value;
      displayTeachers(selectedFaculty, selectedDepartment);
  });

  //Function to populate data Against each Faculty
  function populateDepartments(faculty) {
      departmentSelect.innerHTML = ""; // Clear previous departments
      const departments = departmentsData[faculty];
      departments.forEach(department => {
          const option = document.createElement('option');
          option.textContent = department;
          option.value = department;
          departmentSelect.appendChild(option);
      });
  }

  // Initial display of all teachers
  displayTeachers("all", "all");
  populateDepartments("all");

  // Event listener for department selection change
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
              rating: event.target.dataset.rating,
              image: event.target.dataset.image
          };
          //Needs to add a new page, where this data could be transfered
          const queryParams = new URLSearchParams(teacherData).toString();
          window.location.href = `/ShowProfileFeedback/index.html?${queryParams}`;
      }
  });
});