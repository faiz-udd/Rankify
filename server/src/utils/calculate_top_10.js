// get all teachers of faculty and calculate top 10

// returns array of top 10
function getTop10Teachers(teachers) {
    // Sort the teachers array based on the rating in descending order
    teachers.sort((a, b) => b.rating - a.rating);
  
    // Return the top 10 teachers
    return teachers.slice(0, 10);
}

module.exports = {
    getTop10Teachers
}






