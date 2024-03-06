document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const emailInput = document.getElementById('email');
        const email = emailInput.value.trim();
        if (!isValidEmail(email)) {
            alert('Please enter a valid IIUI email address (example@iiu.edu.pk)');
        } else {
            // Perform login action
            // For demonstration purposes, alerting the email
            alert('Logged in with email: ' + email);
            // You can replace this with your actual login logic
        }
    });

    function isValidEmail(email) {
        const regex = /^[a-z0-9._%+-]+@iiu\.edu\.pk$/;
        return regex.test(email);
    }
});
 