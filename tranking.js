// backend apis and calls section
const top10url = 'http://127.0.0.1:3000/api/teachers/top10/';
const allTeachers = 'http://127.0.0.1:3000/api/teachers/department/'
const getFacultiesUrl = 'http://127.0.0.1:3000/api/faculties/';
const getDepartmentsUrl = 'http://127.0.0.1:3000/api/departments/'; 


document.addEventListener("DOMContentLoaded", async function() {
  const facultySelect = document.getElementById("faculty");
  const departmentSelect = document.getElementById("department");
  const teacherList = document.getElementById("teacher-list");


  class Teacher {
      constructor(name, faculty, department, designation, specialization, profile_picture, original_profile, rating) {
          this.name = name;
          this.faculty = faculty;
          this.department = department;
          this.designation = designation;
          this.specialization = specialization;
          this.profile_picture = profile_picture;
          this.original_profile = original_profile;
          this.rating = rating;
          this.roleModelCount = this.rating -1;
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

  // Function to sort teachers based on their ranking
async function sortTeachersByRating(limit) {
    let apiResponse = await fetchTop10Teachers(`${top10url}?limit=${limit}`);
    
    // apiResponse = null;
    // If API response is not null, return the API data, otherwise return dummy data
    teachers.sort(function(a, b) {
        return b.rating - a.rating; // Sort in descending order
    });
    // console.log(apiResponse[0]?.teachers)
    if(apiResponse)
    apiResponse[0].teachers.forEach(teacher => {
        teacher.rating = Math.round((teacher.roleModelCount /15) *5);
    })
    return apiResponse !== null ? apiResponse[0].teachers : teachers;
}


  // Function to display teachers based on selected category
  async function displayTeachers(faculty, department) {
    console.log(faculty);
    console.log(department);
    if(faculty === "all" && department == "all") {
        teachers = await sortTeachersByRating(10); // initial loading 
    }
 
    teacherList.innerHTML = ""; // Clear previous teacher list
    teachers.forEach(teacher => {
        if ((faculty === "all" || teacher.faculty === faculty) && (department === "all" || teacher.department === department)) {
            const teacherDiv = document.createElement("div");
            teacherDiv.classList.add("teacher");
            teacherDiv.innerHTML = `
                <img src="${teacher.profile_picture}" onerror="this.onerror=null; this.src='/Image/avator.png';">
                <div class="teacher-details">
                    <h3>${teacher.name}</h3>
                    <p><strong>Faculty: ${teacher.department}</strong></p>
                    <p><strong>Department: ${teacher.department}</strong></p>
                    <p><strong>Designation: ${teacher.designation}</strong></p>
                    <p><strong>Specialization: ${teacher.specialization}</strong></p>
                    <span class="rating">
                        <p>Rating:</p> ${generateStarRating(teacher.rating)} 
                    </span>
                    <a href="${teacher.original_profile}" target="_blank"><strong>Learn More</strong></a>
                    <br><br>
                    <button class="teacherFeedbackbtn" data-name="${teacher.name}" data-department="${teacher.department}" data-designation="${teacher.designation}" data-specialization="${teacher.specialization}" data-rating="${teacher.rating}" data-image="${teacher.image}" target="_blank">Give Feedback</button>
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
  let departmentsData = []
  let facultiesData = []

  async function fetchFacultiess () {
     const faculties = await fetchFaculties(getFacultiesUrl);
     return faculties !== null ? faculties.faculties: [];
  }

 facultiesData = await fetchFacultiess();

 // load departments data
 async function fetchDepartmentss(facultyId) {
    
    const departments = await fetchDepartments(`${getDepartmentsUrl}${facultyId}`);
    return departments !== null ? departments.departments: [];
 }

 // populate faculties
 facultySelect.innerHTML = '<option value="" disabled selected>Select Faculty</option>';
            facultiesData.forEach(faculty => {
                facultySelect.innerHTML += `<option value="${faculty.name}">${faculty.name}</option>`;
            });
           
  //Event listener to display the select faculty and department
  facultySelect.addEventListener("change", async function() {
      const selectedFaculty = this.value;
      // here faculty have been selected , get department
    await populateDepartments(selectedFaculty);
      const selectedDepartment = departmentSelect.value;
     // displayTeachers(selectedFaculty, selectedDepartment);
  });

  //Function to populate data Against each Faculty
 async function populateDepartments(facultyName) {
    // get departments
    let faculty  = facultiesData.find(faculty => {
        return faculty.name = facultyName;
    });
   let facultyId = faculty.id;
    
      departmentSelect.innerHTML = ""; // Clear previous departments
      const departments = await fetchDepartmentss(facultyId);
      console.log(departments)
      console.log(departments.length);
      departmentSelect.innerHTML = '<option value="" disabled selected>Select Department</option>';
      departments.forEach(department => {
          const option = document.createElement('option');
          option.textContent = department.name;
          option.value = department.name;
          departmentSelect.appendChild(option);
      });
  }

  // Initial display of all teachers
  await displayTeachers("all", "all");
  await populateDepartments("all");

  // Event listener for department selection change
  departmentSelect.addEventListener("change", async function() {
      const selectedFaculty = facultySelect.value;
      const selectedDepartment = this.value;
     
      await displayTeachers(selectedFaculty, selectedDepartment);
  });

  // Event listener for feedback button click
  teacherList.addEventListener("click", function(event) {
      if (event.target.classList.contains("teacherFeedbackbtn")) {
          const teacherData = {
              name: event.target.dataset.name,
              department: event.target.dataset.department,
              designation: event.target.dataset.designation,
              specialization: event.target.dataset.specialization,
              rating: event.target.dataset.rating,
              profile_picture: event.target.dataset.profile_picture
          };
          //Needs to add a new page, where this data could be transfered
          const queryParams = new URLSearchParams(teacherData).toString();
          window.location.href = `/ShowProfileFeedback/index.html?${queryParams}`;
      }
  });
});