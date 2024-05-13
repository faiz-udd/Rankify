const axios = require('axios');

const baseUrl = 'http://127.0.0.1:3000/api/';


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

console.log(dummyUsers);

const createUsers = async() => {
    try {
       for(let user of dummyUsers) {
        user.password = '1234567890';
        user.DepartmentId = "6b10b0aa-b099-4507-8299-79f41e85ba31";
          await axios.post(`${baseUrl}user`,{user});
       }
       console.log("users added");

    } catch(err) {
        console.log("something went wrong");
        console.log(err);
    }
}


createUsers();
