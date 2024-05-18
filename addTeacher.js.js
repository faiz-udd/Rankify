// Define the URLs for API endpoints
const postTeacherUrl = 'http://127.0.0.1:3000/api/teacher';
const getFacultiesUrl = 'http://127.0.0.1:3000/api/faculties';
const getDepartmentsUrl = 'http://127.0.0.1:3000/api/departments/'; 

// Initialize an array to store teacher data
let teacherData = [];
let facultiesData = [];;

// Function to fetch faculties from the API and populate the faculty select element
function fetchFaculties() {
    fetch(getFacultiesUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data.faculties);

            const facultySelect = document.getElementById('faculty');
            facultySelect.innerHTML = '<option value="" disabled selected>Select Faculty</option>';
            data.faculties.forEach(faculty => {
                facultySelect.innerHTML += `<option value="${faculty.name}">${faculty.name}</option>`;
            });
         teacherData.push(data.faculties);
        })
        .catch(error => console.error('Error fetching faculties:', error));
}

// Function to fetch departments from the API based on selected faculty and populate the department select element
function localFetchDepartments(faculty) {
    console.log(faculty)
    fetch(`${getDepartmentsUrl}${faculty}`)
        .then(response => {
            console.log(response);
            console.log(response.status)
           if(response.status !== 200) {
            alert("Something went wrong, try again")
           }    
          return response.json()
        })
        .then(data => {
            const departmentSelect = document.getElementById('department');
            departmentSelect.innerHTML = '<option value="" disabled selected>Select Department</option>';
            data.departments.forEach(department => {
                departmentSelect.innerHTML += `<option value="${department.name}">${department.name}</option>`;
            });
            teacherData.push(data.departments);
            console.log(teacherData);
        })
        .catch(error => console.error('Error fetching departments:', error));
}

// Load faculties when the page loads
document.addEventListener('DOMContentLoaded', function() {
    fetchFaculties();
}); 

// Event listener for faculty select element
document.getElementById('faculty').addEventListener('change', function() {
    let selectedFaculty = this.value;
    console.log(selectedFaculty);
    console.log(teacherData)
    let faculty = teacherData[0].find(faculty => faculty.name === selectedFaculty);
    let facultyId = faculty ? faculty.id : null;  // Get the faculty id or set to null if not found

   console.log(facultyId);  // This should now correctly log the faculty id


    let departmentSelect = document.getElementById('department');
    departmentSelect.innerHTML = '<option value="" disabled selected>Select Department</option>';
    localFetchDepartments(facultyId);
});

// Event listener for addTeacherForm submission
document.getElementById('addTeacherForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Fetch form data
    const profileUrl = document.getElementById('profileUrl').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const faculty = document.getElementById('faculty').value;
    const department = document.getElementById('department').value;
    const designation = document.getElementById('designation').value;
    const qualification = document.getElementById('qualification').value;
    const specialization = document.getElementById('specialization').value;
    const profilePicture = document.getElementById('profilePicture').value;

    // validate email before doing anything else;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@iiu\.edu\.pk$/;
    if(!emailRegex.test(email)) {
        alert("Invalid IIUI Email");
        document.getElementById("email").focus();
        return;
    }
    console.log(teacherData);

    // Create an object to store the form data
    const selectedFaculty = teacherData[0].filter(facultyy => facultyy.name === faculty);
    const selectedDepartment = teacherData[1].filter(departmentt => departmentt.name === department);

    const teacher = {
        original_profile: profileUrl,
        name: name,
        email: email,
        designation: designation,
        qualification: qualification,
        specialization: specialization,
        profile_picture: profilePicture
    };
    teacherData[0] = selectedFaculty[0];
    teacherData[1] = selectedDepartment[0];
    teacherData[2] = teacher;
    console.log(teacherData);
    // Save the teacher data to the database
    createTeacher(teacherData);


    // Alert
    alert("Teacher Added Successfully");

    // Optionally, you can clear the form fields after submission
    document.getElementById('addTeacherForm').reset();
});

// Function to send a request to backend to actually save the teacher in the database
function createTeacher(teacherData) {
    // convert teacher data array to obj
    const obj = teacherData.reduce((acc, obj) => {
        // Get the key of the current object
        const key = Object.keys(obj)[0];
        // Assign the object's property to the accumulator object
        acc[key] = obj[key];
        return acc;
    }, {});
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Specify content type as JSON
        },
        body: JSON.stringify(obj), // Convert teacher object to JSON string
    };
    fetch(postTeacherUrl, requestOptions)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error creating teacher:', error));
}
