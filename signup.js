// urls
const singupURL = 'http://127.0.0.1:3000/api/user/signup';

document.addEventListener('DOMContentLoaded', function() {
    const jwt_token = localStorage.getItem('jwt_token');
    if(!jwt_token) {
        localStorage.setItem('isLoggedIn', 'false');
    }
    
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if(isLoggedIn) {
        window.location.href = './index.html';
    }


let selectedFaculty;
document.getElementById("faculty").addEventListener("change", function() {
    let faculty = this.value;
    selectedFaculty = faculty;
    let departmentSelect = document.getElementById("department");
    
    // Clear existing options
    departmentSelect.innerHTML = '<option value="" disabled selected>Select Department</option>';

      // Add departments based on selected faculty
      switch (faculty) {
        case "Faculty of Usuluddin":
            departmentSelect.innerHTML += `
                <option value="Department of Islamic Studies">Department of Islamic Studies</option>
                <option value="Department of Seerah and Islamic Culture">Department of Seerah and Islamic Culture</option>
                <option value="Department of Quran and Tafseer">Department of Quran and Tafseer</option>
                <option value="Department of Hadith and Its Sciences">Department of Hadith and Its Sciences</option>
                <option value="Department of Comparative Religion and Islamic Culture">Department of Comparative Religion and Islamic Culture</option>
            `;
            break;
        case "Faculty of Arabic":
            departmentSelect.innerHTML += `
                <option value="Department of Arabic">Department of Arabic</option>
                <option value="Department of Translation and Interpretation">Department of Translation and Interpretation</option>
                <option value="Department of Islamic Art and Architecture">Department of Islamic Art and Architecture</option>
                <option value="Department of Persian">Department of Persian</option>
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
                <option value="Department of Education">Department of Education</option>
            `;
            break;
        case "Faculty of Economics and Management Sciences":
            departmentSelect.innerHTML += `
                <option value="Department of Economics">Department of Economics</option>
                <option value="Department of Business Administration">Department of Business Administration</option>
                <option value="Department of Technology Management">Department of Technology Management</option>
                <option value="Department of Statistics">Department of Statistics</option>
            `;
            break;
        case "Faculty of Engineering and Technology":
            departmentSelect.innerHTML += `
                <option value="Department of Computer Science">Department of Computer Science</option>
                <option value="Department of Software Engineering">Department of Software Engineering</option>
                <option value="Department of Electronics">Department of Electronics</option>
                <option value="Department of Telecommunication Engineering">Department of Telecommunication Engineering</option>
                <option value="Department of Mechanical Engineering">Department of Mechanical Engineering</option>
                <option value="Department of Electrical Engineering">Department of Electrical Engineering</option>
                <option value="Department of Civil Engineering">Department of Civil Engineering</option>
            `;
            break;
        case "Faculty of Basic and Applied Sciences":
            departmentSelect.innerHTML += `
                <option value="Department of Mathematics">Department of Mathematics</option>
                <option value="Department of Physics">Department of Physics</option>
                <option value="Department of Chemistry">Department of Chemistry</option>
                <option value="Department of Environmental Sciences">Department of Environmental Sciences</option>
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
        case "Faculty of Islamic Studies and Humanities":
            departmentSelect.innerHTML += `
                <option value="Department of Islamic Studies">Department of Islamic Studies</option>
                <option value="Department of Arabic">Department of Arabic</option>
                <option value="Department of Persian">Department of Persian</option>
                <option value="Department of Seerah and Islamic Culture">Department of Seerah and Islamic Culture</option>
                <option value="Department of Comparative Religion and Islamic Culture">Department of Comparative Religion and Islamic Culture</option>
            `;
            break;
        case "Faculty of Modern Sciences and Technologies":
            departmentSelect.innerHTML += `
                <option value="Department of Computer Science">Department of Computer Science</option>
                <option value="Department of Software Engineering">Department of Software Engineering</option>
                <option value="Department of Electronics">Department of Electronics</option>
                <option value="Department of Telecommunication Engineering">Department of Telecommunication Engineering</option>
                <option value="Department of Mechanical Engineering">Department of Mechanical Engineering</option>
                <option value="Department of Electrical Engineering">Department of Electrical Engineering</option>
                <option value="Department of Civil Engineering">Department of Civil Engineering</option>
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
        case "Faculty of Computer Science and Information Technology":
            departmentSelect.innerHTML += `
                <option value="Department of Computer Science">Department of Computer Science</option>
                <option value="Department of Software Engineering">Department of Software Engineering</option>
                <option value="Department of Electronics">Department of Electronics</option>
                <option value="Department of Telecommunication Engineering">Department of Telecommunication Engineering</option>
                <option value="Department of Information Technology">Department of Information Technology</option>
            `;
            break;
        case "Faculty of Distance Education":
            departmentSelect.innerHTML += `
                <option value="Department of Distance and Non-Formal Education">Department of Distance and Non-Formal Education</option>
                <option value="Department of Education">Department of Education</option>
            `;
            break;
        // Add cases for other faculties
    }
});

let selectedDepartment;
document.getElementById("department").addEventListener("change", function() {
     let department = this.value;
     selectedDepartment = department
})

document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    let nameInput = document.getElementById("name").value.trim();
    var emailInput = document.getElementById("email");
    var passwordInput = document.getElementById("password");
    var confirmPasswordInput = document.getElementById("confirmPassword");
    var emailError = document.getElementById("emailError");
    var passwordError = document.getElementById("passwordError");

    var email = emailInput.value.trim();
    var password = passwordInput.value;
    var confirmPassword = confirmPasswordInput.value;

    // Email validation regex
    var emailRegex = /^[a-zA-Z0-9._%+-]+@iiu\.edu\.pk$/;

    // Password strength regex (minimum 8 characters including at least one uppercase letter, one lowercase letter, one number, and one special character)
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;

    if (!emailRegex.test(email)) {
        emailError.textContent = "Invalid email format. Please enter a valid IIU email address.";
        return;
    }

    // Clear email error message if email is valid
    emailError.textContent = "";

    if (!passwordRegex.test(password)) {
        passwordError.textContent = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
        return;
    }

    if (password !== confirmPassword) {
        passwordError.textContent = "Passwords do not match.";
        return;
    }

    // Clear password error message if password is valid
    passwordError.textContent = "";

    // Proceed with signup logic here
    // lets make user object then send it to server
    let user = {
        name: nameInput,
        email: email,
        password: password,
        faculty: selectedFaculty,
        department: selectedDepartment,
    }
    console.log(user);
     signup(singupURL,user) 

    // alert("Sign up successful!"); // For demonstration purposes
});

function signup(url, user) {
    // Create the request body as JSON
    const requestBody = JSON.stringify(user);

    // Make a POST request using fetch
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: requestBody
    })
    .then(response => {
        // Check the response status
        if (response.status === 200) {
            // If response code is 200, show "OK" message
            alert('Verification Code sent successfully, please check your email address');
            window.location.href = './verifyCode.html'
        } else if (response.status === 403) {
            // If response code is 403, show "User exists" message
            alert('User already exists');
        } else {
            // For other response codes, show generic error message
            alert('Something went wrong. Please try again.');
        }
    })
    .catch(error => {
        // Handle fetch errors
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    });
}

})
