// generate dummy ratings

const dummyUsers = [
    { name: 'John Doe', email: 'john.doe@iiu.edu.pk' },
    { name: 'Jane Smith', email: 'jane.smith@iiu.edu.pk' },
    { name: 'Michael Johnson', email: 'michael.johnson@iiu.edu.pk' },
    { name: 'Emily Davis', email: 'emily.davis@iiu.edu.pk' },
    { name: 'Daniel Brown', email: 'daniel.brown@iiu.edu.pk' },
    { name: 'Sarah Wilson', email: 'sarah.wilson@iiu.edu.pk' },
    { name: 'Matthew Taylor', email: 'matthew.taylor@iiu.edu.pk' },
    { name: 'Olivia Martinez', email: 'olivia.martinez@iiu.edu.pk' },
    { name: 'William Anderson', email: 'william.anderson@iiu.edu.pk' },
    { name: 'Emma Thomas', email: 'emma.thomas@iiu.edu.pk' },
    { name: 'Christopher Garcia', email: 'christopher.garcia@iiu.edu.pk' },
    { name: 'Ava Lopez', email: 'ava.lopez@iiu.edu.pk' },
    { name: 'Alexander Rodriguez', email: 'alexander.rodriguez@iiu.edu.pk' },
    { name: 'Samantha Perez', email: 'samantha.perez@iiu.edu.pk' },
    { name: 'David Lee', email: 'david.lee@iiu.edu.pk' },
    { name: 'Sophia Gonzales', email: 'sophia.gonzales@iiu.edu.pk' },
    { name: 'James Hernandez', email: 'james.hernandez@iiu.edu.pk' },
    { name: 'Isabella Wilson', email: 'isabella.wilson@iiu.edu.pk' },
    { name: 'Benjamin Wright', email: 'benjamin.wright@iiu.edu.pk' },
    { name: 'Mia Young', email: 'mia.young@iiu.edu.pk' }
];



const axios = require('axios');

const baseUrl = 'http://127.0.0.1:3000/api/';


// get all departments
const getAllDepartments = async() => {
    try {
        let departments;
        const result = await axios.get(`${baseUrl}departments`);
        departments = result.data.departments.map(department => department.id);
        return {departments};
    } catch(err) {
        console.log(err);
        return {err}
    }
  
}   

// get all teachers in every department 
const getAllTeachers = async() => {
    try {
        const departments =  await getAllDepartments();
        if(departments.err) {
            console.log("department fetch err");
            return ; // something went wrong cant procced further
        }
        let allTeachers = [];
        for(const departmentId of departments.departments) {
            const url = `${baseUrl}teachers/department/${departmentId}`;
            console.log(url);
            const result = await axios.get(url);
            const teachers = result.data.teachers.teachers
            if(teachers.length > 0) {
                allTeachers.push(teachers);
            }
        }
       return allTeachers[0];
    } catch(err) {
        console.log(err);
        return {err};
    }
    
}

const getAllSubjects = async () => {
    try {
         const url = "http://127.0.0.1:3000/api/subjects/e89c6f93-5cab-45b9-bd5a-ca24a35ea75a";
         const result = await axios.get(url);
         const subjects = result.data.subjects;
         return {subjects};

    } catch(err) {
        console.log(err);
        return {err};
    }
}


// req.body should have rating, user,teacher,subject
// create rating..now

const createRating = async() => {
    try {
        const departments = await getAllDepartments() // getting ids
        const teachers = await getAllTeachers(); // getting array teachers objs
        const subjects = await getAllSubjects();
        const users = dummyUsers;
         
        for(let user of users) {
             let i = 0;
            for(let teacher of teachers) {
                const rating = generateRating();
                const body = {
                    user:user,
                    teacher: teacher,
                    subject: subjects.subjects[i],
                    rating:rating 
                }
                await axios.post(`${baseUrl}rating`,body);
                i++;
            }
        }
    
       console.log("successfully added ratings");
    } catch(err) {
        console.log("something went wrong");
        console.log(err);
    }
 
}

createRating();














function generateRating() {
    const getRandomValue = () => Math.floor(Math.random() * 6); // Generates random value between 0 and 5
    const getRandomBoolean = () => Math.random() < 0.5; // Generates random true/false value
  
    return {
      punctuality: getRandomValue(),
      subject_command: getRandomValue(),
      teaching_method: getRandomValue(),
      helping_attitude: getRandomValue(),
      lab_interaction: getRandomValue(),
      is_role_model: getRandomBoolean()
    };
  }
  
//   // Example usage:
//   const rating = generateRating();
//   console.log(rating);
  