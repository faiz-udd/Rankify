
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { Faculty, Department, Subject,} = require('../src/models/index'); // Import your Sequelize models


async function populateDatabase(jsonFilePath,commonSubjectsFilePath) {
    try {
        const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
        const commonSubjects = JSON.parse(fs.readFileSync(commonSubjectsFilePath, 'utf-8'));
        
        // some faculties and departments are already there..

        for (const facultyData of jsonData.faculties) {
           
            const facultyId = uuidv4();
            await Faculty.create({ id: facultyId, name:facultyData.name });

            for (const departmentData of facultyData.departments) {
                
                const departmentId = uuidv4();
                await Department.create({ id: departmentId, FacultyId:facultyId, name:departmentData.name });

                for (const subjectData of departmentData.subjects) {
                    const subjectId = uuidv4();
                    await Subject.create({ id: subjectId, DepartmentId:departmentId, name:subjectData });
                }

                // lets create common subjects now.
                for(const subject of commonSubjects.subjects) {
                    const subjectId = uuidv4();
                    await Subject.create({ id: subjectId, DepartmentId:departmentId, name:subject });
                }
            }
        }

        console.log('Database populated successfully.');
    } catch (error) {
        console.error('Error populating database:', error);
    }
}

    // // Usage example: node populateDatabase.js data.json
    // const jsonFilePath = process.argv[2];
    // const commonSubjects = process.argv[3];
    // populateDatabase(jsonFilePath,commonSubjects);

// populate teachers
const { Teacher } = require('../src/models/index');
// const jsonFilePath = process.argv[2];
async function populateTeachers(jsonFilePath) {
    try {

    const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

    for(const teacher of jsonData.teachers) {
        teacher.DepartmentId = "f767d174-1e76-4d2d-b112-4a1c91d760d4";
        await Teacher.create(teacher);
    }
    console.log("teacers populated successfully");
}   catch(err) {
    console.log(err)
} 
}  

module.exports = {
    populateDatabase,
    populateTeachers,
}