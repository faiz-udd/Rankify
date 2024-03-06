
document.getElementById("faculty").addEventListener("change", function() {
    let faculty = this.value;
    let departmentSelect = document.getElementById("department");
    
    // Clear existing options
    departmentSelect.innerHTML = '<option value="" disabled selected>Select Department</option>';

      // Add departments based on selected faculty
      switch (faculty) {
        case "Faculty of Usuluddin":
            departmentSelect.innerHTML += `
                <option value="Department of Islamic Studies">Department of Islamic Studies</option>
                <option value="Department of Quran and Tafseer">Department of Quran and Tafseer</option>
                <option value="Department of Hadith and Its Sciences">Department of Hadith and Its Sciences</option>
                <option value="Department of Aqeedah and Comparative Religion">Department of Aqeedah and Comparative Religion</option>
            `;
            break;
        case "Faculty of Arabic":
            departmentSelect.innerHTML += `
                <option value="Department of Arabic">Department of Arabic</option>
                <option value="Department of Translation and Interpretation">Department of Translation and Interpretation</option>
                <option value="Department of Linguistics">Department of Linguistics</option>
            `;
            break;
        case "Faculty of Shariah and Law":
            departmentSelect.innerHTML += `
                <option value="Department of Law">Department of Law</option>
            `;
            break;
        case "Faculty of Social Sciences":
            departmentSelect.innerHTML += `
                <option value="Department of Economics">Department of Economics</option>
                <option value="Department of Political Science">Department of Political Science</option>
                <option value="Department of Sociology">Department of Sociology</option>
                <option value="Department of Psychology">Department of Psychology</option>
            `;
            break;
        case "Faculty of Economics and Management Sciences":
            departmentSelect.innerHTML += `
                <option value="Department of Economics">Department of Economics</option>
                <option value="Department of Business Administration">Department of Business Administration</option>
                <option value="Department of Statistics">Department of Statistics</option>
            `;
            break;
        case "Faculty of Engineering and Technology":
            departmentSelect.innerHTML += `
                <option value="Department of Mechanical Engineering">Department of Mechanical Engineering</option>
                <option value="Department of Electrical Engineering">Department of Electrical Engineering</option>
                <option value="Department of Civil Engineering">Department of Civil Engineering</option>
            `;
            break;
        case "Faculty of Basic and Applied Sciences":
            departmentSelect.innerHTML += `
                <option value="Department of Mathematics">Department of Mathematics</option>
                <option value="Department of Physics">Department of Physics</option>
                <option value="Department of Bioinformatics and Biotechnology">Department of Bioinformatics and Biotechnology</option>
            `;
            break;
        case "Faculty of Languages and Literature":
            departmentSelect.innerHTML += `
                <option value="Department of Urdu">Department of Urdu</option>
                <option value="Department of English">Department of English</option>
                <option value="Department of Persian">Department of Persian</option>
                <option value="Department of Translation and Interpretation">Department of Translation and Interpretation</option>
                <option value="Department of Arabic">Department of Arabic</option>
            `;
            break;
        case "Faculty of Education":
            departmentSelect.innerHTML += `
                <option value="Department of Education">Department of Education</option>
                <option value="Department of Distance and Non-Formal Education">Department of Distance and Non-Formal Education</option>
                <option value="Department of Library and Information Sciences">Department of Library and Information Sciences</option>
            `;
            break;
        case "Faculty of Management Sciences":
            departmentSelect.innerHTML += `
                <option value="Department of Business Administration">Department of Business Administration</option>
                <option value="Department of Technology Management">Department of Technology Management</option>
                <option value="Department of Economics">Department of Economics</option>
                <option value="Department of Statistics">Department of Statistics</option>
            `;
            break;
        case "Faculty of Computing and Information Technology":
            departmentSelect.innerHTML += `
                <option value="Department of Computer Science">Department of Computer Science</option>
                <option value="Department of Software Engineering">Department of Software Engineering</option>
                <option value="Department of Information Technology">Department of Information Technology</option>
            `;
            break;
        // Add cases for other faculties
    }
});




// Initialize an array to store teacher data
let teacherData = [];

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

    // Create an object to store the form data
    const teacher = {
        profileUrl: profileUrl,
        name: name,
        email: email,
        faculty: faculty,
        department: department,
        designation: designation,
        qualification: qualification,
        specialization: specialization
    };

    // Push the teacher object into the teacherData array
    teacherData.push(teacher);
    
    //alert
    alert("Teacher Added Sucessfully")

    // Optionally, you can clear the form fields after submission
    document.getElementById('addTeacherForm').reset();

    // Optionally, you can do further operations here, like sending data to a server using AJAX
});

// Example usage: Access the teacherData array elsewhere in your code
console.log(teacherData);

