const loginURL = 'http://127.0.0.1:3000/api/user/login';

document.addEventListener('DOMContentLoaded', function() {
    // first check if the user is already logged in.
    // if it is then redirect to the home page
    const jwt_token = localStorage.getItem('jwt_token');
    if(!jwt_token) {
        localStorage.setItem('isLoggedIn', 'false');
    }

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if(isLoggedIn) {
        window.location.href = './index.html';
    }
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', function(event) {
        console.log("submit button clicked");
        event.preventDefault();
        const emailInput = document.getElementById('email');
        const email = emailInput.value.trim();
        const password = document.getElementById('password').value.trim();
        if (!isValidEmail(email)) {
            alert('Please enter a valid IIUI email address (example@iiu.edu.pk)');
        } else {
            // Perform login action
            const user = {
                email: email,
                password: password
            }
            login(loginURL,user);
        } 
    });

    function isValidEmail(email) {
        const regex = /^[a-z0-9._%+-]+@iiu\.edu\.pk$/;
        return regex.test(email);
    }
});

function login(url,user) {
        // Create the request body as JSON
        const requestBody = JSON.stringify(user);
    console.log("inside login method")
        // Make a POST request using fetch
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: requestBody
        })
        .then(response => {
            let token;
            console.log("fetch then ")
            response.json().then(data => {
                console.log(data);
                token = data.token;
                if (data && data.token) {
                    localStorage.setItem('jwt_token', token);
                    localStorage.setItem('isLoggedIn', "true");
                }
               
                console.log(data.token)
            }).catch(err => {
                console.log(err);
            })
            // Check the response status
            if (response.status === 201) {
               // if login successfull then save the jwt token in local storage
               
                alert('Login successful, Go to Home Page and Reload');
                window.location.href = './index.html'
            } else if (response.status === 404) {
                // If response code is 404, show "User doesnt exists" message
                alert('User Doesnt exists');
            } 
            else if(response.status === 403) {
                 alert("Account is not Verified, please check your email for verification code")
            } 
            else if (response.status === 401) {
                 alert("Incorrect Password");
            }
            else {
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
