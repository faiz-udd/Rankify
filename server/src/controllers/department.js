const {departmentService } = require('../services/index');
const { v4: uuidv4 } = require('uuid');

const getAllDepartments = async(req,res) => {
    try {
        const facultyId = req.params.id; // facultyID id can be null
        if(!facultyId) {
            return res.status(500).send({"message":"Faculty ID is null"});
        }
        const departments = await departmentService.getAllDepartments(facultyId);
        if(departments.error) {
            return res.status(departments.error.code).send({"message":departments.error.message});
        }
        return res.send(departments);
    } catch(err) {
        console.log(err);
        return res.status(500).send({"message":"something went wrong in departmentController getAllDepartments"});
    }
}

const createDepartmentIfNotExists = async(departmentName,FacultyId) => {
    try {
        // check if it exists already
   const department = await departmentService.getDepartment(departmentName);
    // if dept exists return its id
   if(department.department) {
    return {department:department.department.dataValues.id};
   }
  
   const departmentId = uuidv4();
  const newDepartment = await departmentService.createDepartment({id:departmentId,FacultyId,name:departmentName});
  if(newDepartment.error) {
    return {error:{message:"something went wrong in createDepartmentIfNotExists",code:500}};
}
   return {department: newDepartment.department.dataValues.id};
}
   catch(err) {
     console.log(err);
     return {error: "Error creating Department"};
   }
}

module.exports = {
    getAllDepartments,
    createDepartmentIfNotExists
}


