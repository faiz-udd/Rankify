// this file is specific for api calls

// Fetch top 10 teachers by their overall ranking and display them on the front page
async function fetchTop10Teachers(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data from API:', error);
        return null; // Return null if API call fails
    }
}

// Function to fetch faculties from the API and populate the faculty select element
async function fetchFaculties(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data from API:', error);
        return null; // Return null if API call fails
    }
}

async function fetchDepartments(url) { 
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data from API:', error);
        return null; // Return null if API call fails
    }
}



/**
 * Sends a request with JWT token to the specified URL.
 * @param {string} url - The URL to which the request is sent.
 * @param {object} data - The data object to be sent in the request body.
 * @param {string} method - The HTTP method to use (e.g., 'GET', 'POST', 'PUT', 'DELETE').
 * @returns {Promise<object>} - The response data.
 */
async function sendRequestWithToken(url, data = {}, method = 'POST') {
    // Get the JWT token from local storage
    const token = localStorage.getItem('jwt_token');
    
    // Check if the token exists
    if (!token) {
        throw new Error('No JWT token found in local storage');
    }

    // Set up the fetch options
    const fetchOptions = {
        method: method, // The HTTP method to use
        headers: {
            'Content-Type': 'application/json', // The content type of the request body
            'Authorization': `Bearer ${token}` // The JWT token for authorization
        },
        body: method !== 'GET' ? JSON.stringify(data) : null // The request body, if the method is not GET
    };

    // Send the request and handle the response
    try {
        const response = await fetch(url, fetchOptions);

        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
            alert("something went wrong, try again")
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the response JSON
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error sending request:', error);
        throw error;
    }
}
