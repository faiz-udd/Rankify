 const verifyURL = 'http://127.0.0.1:3000/api/user/verify';


 document.addEventListener('DOMContentLoaded', function() {
     const form = document.getElementById("verifyForm");
     form.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById("email").value.trim();
        const tokenInput = document.getElementById("token").value.trim();
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid IIUI email address (example@iiu.edu.pk)');
        } else {
            // Perform login action
            const token = {
                email: email,
                token: tokenInput
            }
          // send this to back end and verify
          verify(verifyURL,token);
        } 
     })

     function isValidEmail(email) {
        const regex = /^[a-z0-9._%+-]+@iiu\.edu\.pk$/;
        return regex.test(email);
    }
 });

 function verify(url,token) {
    // Create the request body as JSON
    const requestBody = JSON.stringify(token);

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
           // token verification success. redirect back to login
            alert("Verification Successfull. Now Login In");
            window.location.href = './login.html'
        } else if (response.status === 404) {
            // token not found. go to resend token page
            // redirect it to token resend page
            alert('Token Not Found. Go to resend token page');
        }  else {
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

