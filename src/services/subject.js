const { Subject } = require('../models/index');


const getSubject = async(SubjectName) => {
    try {
        const subject = await Subject.findOne({where:{name:SubjectName}});
        return {subject:subject};
      } catch(err) {
          console.log(err);
          return {error:{message:"something went wrong in getSubject",code:500}}
      }
}


const createSubject = async(subject) => {
    try {
       const newSubject = await Subject.create(Subject);
       return {subject:newSubject};
    } catch(err) {
       console.log(err);
       return {error:{message:"something went wrong in createSubject",code:500}};
    }
}

const deleteSubject = async(id) => {
  try {
    const subject = await Subject.destroy({where: {id:id}});
    return {subject:subject};
 } catch(err) {
    console.log(err);
    return {error:{message:"something went wrong in deleteSubject",code:500}};
} 
}

const updateSubject = async(updates) => {
  try {
    const newSubject = await Subject.update(updates,{where:{id:updates.id}});
    return {updatedSubject: newSubject[1]}; 
  } catch(err) {
    console.log(err);
    return {error:{message:"something went wrong in deleteSubject",code:500}};
  }

}

const getSubjectsByDepartment = async(departmentId) => {
   try {
       const subjects = await Subject.findAll({where:{ DepartmentId:departmentId}});
       return {subjects}
   } catch(err) {
    console.log(err);
    return {error:{message:"something went wrong in getSubjectByDept",code:500}};
  
   }
}

module.exports = {
  getSubject,
  createSubject,
  deleteSubject,
  updateSubject,
  getSubjectsByDepartment
}

