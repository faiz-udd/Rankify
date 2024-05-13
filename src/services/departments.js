const { where } = require('sequelize');
const { Department } = require('../models/index');

const getDepartment = async(departmentName) => {
    try {
      const department = await Department.findOne({where:{name:departmentName}});
      return {department:department};
    } catch(err) {
        console.log(err);
        return {error:{message:"something went wrong in getDepartment",code:500}}
    }
}

const getAllDepartments = async(facultyId) => {
  try {
    let departments;
     if(facultyId) {
       departments = await Department.findAll({where:{FacultyId:facultyId}});
     }
     else {
      departments = await Department.findAll();
     }
    return {departments:departments};
  } catch(err) {
      console.log(err);
      return {error:{message:"something went wrong in getAllDepartments",code:500}}
  }
}


const createDepartment = async(dept) => {
    try {
       const department = await Department.create(dept);
       return {department:department};
    } catch(err) {
       console.log(err);
       return {error:{message:"something went wrong in createDepartment",code:500}};
    }
}

const deleteDepartment = async(id) => {
  try {
    const department = await Department.destroy({where: {id:id}});
    return {department:department};
 } catch(err) {
    console.log(err);
    return {error:{message:"something went wrong in deleteDepartment",code:500}};
} 
}

const updateDepartment = async(updates) => {
  try {
    const newDepartment = await Department.update(updates,{where:{id:updates.id}});
    return {updatedDepartment: newDepartment[1]}; 
  } catch(err) {
    console.log(err);
    return {error:{message:"something went wrong in deleteDepartment",code:500}};
  }

}

module.exports = {
  getDepartment,
  getAllDepartments,
  createDepartment,
  deleteDepartment,
  updateDepartment
}