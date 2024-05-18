const {facultyService } = require('../services/index');
const { v4: uuidv4 } = require('uuid');

const getAllFaculties = async(req,res) => {
    try {
        const faculties = await facultyService.getAllFaculties();
        if(faculties.error) {
            return res.status(faculties.error.code).send({"message":faculties.error.message});
        }
        return res.send(faculties);
    } catch(err) {
        console.log(err);
        return res.status(500).send({"message":"something went wrong in facultiesController getAllFaculties"});
    }
}


const createFacultyIfNotExists = async(facultyName) => {
    try {
         // check if it exists already
    const faculty = await facultyService.getFaculty(facultyName);
    if(faculty.faculty) {
        return {faculty: faculty.faculty.dataValues.id};
    }
    // if faculty exists return faculty id

    const facultyId = uuidv4();
   const newFaculty = await facultyService.createFaculty({id:facultyId,name:facultyName});

   if(newFaculty.error) {
    return {error:{message:"something went wrong in createFacultyIfNotExists",code:500}};
}
    return {faculty: newFaculty.faculty.dataValues.id};
}
    catch(err) {
      console.log(err);
      return {error: "Error creating Faculty"};
    }
    
}
module.exports = {
    getAllFaculties,
    createFacultyIfNotExists
}


