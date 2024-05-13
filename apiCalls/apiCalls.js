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



