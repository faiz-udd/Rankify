// Backend APIs and URLs
const top10url = 'http://127.0.0.1:3000/api/teachers/top10/';
const allTeachers = 'http://127.0.0.1:3000/api/teachers/department/';
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
            this.roleModelCount = this.rating - 1;
        }
    }

    let teachers = [
        new Teacher("Dr Qaiser Javeed", "Computing", "Software Engineering", "Assistant Professor", "Networks", "/Image/qaiser-javeed.jpg", "https://www.iiu.edu.pk/?page_id=1825#:~:text=DR.%20QAISAR%20JAVAID,Specialization%3A%20Networks", 5),
        new Teacher("Dr Syed Saqlain", "Computing", "Information Technology", "Associate Professor", "AI,ML", "/Image/syed-saqlain.jpg", "https://www.iiu.edu.pk/?page_id=1825#:~:text=DR.%20SYED%20MUHAMMAD,Diagnosis%2C%20Video%20Surveillance", 4),
        // Add more teachers as needed
    ];

    // Function to sort teachers based on their ranking
    async function sortTeachersByRating(limit) {
        let apiResponse = await fetchTop10Teachers(top10url);
        teachers.sort((a, b) => b.rating - a.rating);
        if (apiResponse) {
            // apiResponse[0].teachers.forEach(teacher => {
            //     teacher.rating = Math.round((teacher.rating -5));
            // });
        }
        console.log(apiResponse !== null ? apiResponse[0].teachers : teachers);
        
        return apiResponse !== null ? apiResponse[0].teachers : teachers;
    }

    // Function to display teachers based on selected category
    async function displayTeachers(faculty, department) {
        if (faculty === "all" && department === "all") {
            teachers = await sortTeachersByRating(10);
        }
        teacherList.innerHTML = ""; // Clear previous teacher list
        teachers.forEach(teacher => {
            if ((faculty === "all" || teacher.faculty === faculty) && (department === "all" || teacher.department === department)) {
                const teacherDiv = document.createElement("div");
                teacherDiv.classList.add("teacher");
                
                teacherDiv.innerHTML = `
                    <img src="${teacher.profile_picture}" alt="Profile picture" onerror="this.onerror=null;this.src='/Image/avator.png';">
                    <div class="teacher-details">
                        <h3>${teacher.name}</h3>
                        <p><strong>Faculty: ${teacher.faculty}</strong></p>
                        <p><strong>Department: ${teacher.department}</strong></p>
                        <p><strong>Designation: ${teacher.designation}</strong></p>
                        <p><strong>Specialization: ${teacher.specialization}</strong></p>
                        <span class="rating">
                            <p>Rating:</p> ${generateStarRating(teacher.rating)}
                        </span>
                        <a href="${teacher.original_profile}" target="_blank"><strong>Learn More</strong></a>
                        <br />
                        <button class="teacherFeedbackbtn" 
                            data-name="${teacher.name}" 
                            data-department="${teacher.department}" 
                            data-designation="${teacher.designation}" 
                            data-specialization="${teacher.specialization}" 
                            data-rating="${teacher.rating}" data-email="${teacher.email}" 
                            data-departmentId="${teacher.DepartmentId}" data-original_profile="${teacher.original_profile}"
                            data-profile_picture="${teacher.profile_picture}">Give Feedback</button>
                            <br />
                        <button class="teacherShowFeedbackbtn"
                            data-name="${teacher.name}" 
                            data-department="${teacher.department}" 
                            data-designation="${teacher.designation}" 
                            data-specialization="${teacher.specialization}" 
                            data-rating="${teacher.rating}" data-email="${teacher.email}" 
                            data-departmentId="${teacher.DepartmentId}" data-original_profile="${teacher.original_profile}"
                            data-profile_picture="${teacher.profile_picture}">Show Feedback</button>
                            
                    </div>
                `;
                
                teacherList.appendChild(teacherDiv);
            }
        });

        // Re-attach the event listener after updating the DOM
        attachFeedbackButtonListener();
        attachShowFeedbackButtonListener();
    }

    // Function to generate star rating based on a numerical rating
    function generateStarRating(rating) {
        let stars = '';
        for (let i = 0; i < 5; i++) {
            stars += (rating > i) ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
        }
        return stars;
    }

    // Populate departments for each faculty
    let facultiesData = [];
    let departmentsData = [];

    async function fetchFacultiesData() {
        const faculties = await fetchFaculties(getFacultiesUrl);
        return faculties !== null ? faculties.faculties : [];
    }

    facultiesData = await fetchFacultiesData();

    // Load departments data
    async function fetchDepartmentsData(facultyId) {
        const departments = await fetchDepartments(`${getDepartmentsUrl}${facultyId}`);
        return departments !== null ? departments.departments : [];
    }

    // Populate faculties
    facultySelect.innerHTML = '<option value="" disabled selected>Select Faculty</option>';
    facultiesData.forEach(faculty => {
        facultySelect.innerHTML += `<option value="${faculty.name}">${faculty.name}</option>`;
    });

    // Event listener to display the selected faculty and department
    facultySelect.addEventListener("change", async function() {
        const selectedFaculty = this.value;
        await populateDepartments(selectedFaculty);
    });

    // Function to populate data against each Faculty
    async function populateDepartments(facultyName) {
        let faculty = facultiesData.find(faculty => faculty.name === facultyName);
        let facultyId = faculty.id;
        departmentSelect.innerHTML = ""; // Clear previous departments
        const departments = await fetchDepartmentsData(facultyId);
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

    // Function to attach event listener to feedback buttons
    function attachFeedbackButtonListener() {
        const feedbackButtons = document.querySelectorAll(".teacherFeedbackbtn");
        feedbackButtons.forEach(button => {
            button.addEventListener("click", function(event) {
                console.log("Button clicked!"); // Check if the event listener is firing
                const teacherData = {
                    name: this.dataset.name,
                    email: this.dataset.email,
                    department: this.dataset.department,
                    designation: this.dataset.designation,
                    specialization: this.dataset.specialization,
                    rating: this.dataset.rating,
                    profile_picture: this.dataset.profile_picture,
                    original_profile: this.dataset.original_profile
                };

               // console.log(teacherData); // Check if data attributes are correctly fetched

                // Serialize the teacher data into query parameters
                const queryParams = new URLSearchParams(teacherData).toString();
                
                // Redirect to the feedback page with the serialized teacher data
                window.location.href = `./feedback.html?${queryParams}`;
            });
        });
    }

    // showfeedback button listner
    function attachShowFeedbackButtonListener() {
        const feedbackButtons = document.querySelectorAll(".teacherShowFeedbackbtn");
        feedbackButtons.forEach(button => {
            button.addEventListener("click", function(event) {
                console.log("Button clicked!"); // Check if the event listener is firing
                const teacherData = {
                    name: this.dataset.name,
                    email: this.dataset.email,
                    department: this.dataset.department,
                    designation: this.dataset.designation,
                    specialization: this.dataset.specialization,
                    rating: this.dataset.rating,
                    profile_picture: this.dataset.profile_picture,
                    original_profile: this.dataset.original_profile
                };

                console.log(teacherData); // Check if data attributes are correctly fetched

                // Serialize the teacher data into query parameters
                const queryParams = new URLSearchParams(teacherData).toString();
                
                // Redirect to the feedback page with the serialized teacher data
                window.location.href = `./showFeedback.html.html?${queryParams}`;
            });
        });
    }

    // Attach event listener initially
    attachFeedbackButtonListener();
    attachShowFeedbackButtonListener();
});
