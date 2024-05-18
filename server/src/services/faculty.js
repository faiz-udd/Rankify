const { Faculty } = require('../models/index');


const getFaculty = async(facultyName) => {
    try {
        const faculty = await Faculty.findOne({where:{name:facultyName}});
        if(!faculty || !faculty.dataValues) {
          throw new Error('Could not find faculty');
        }
        return {faculty:faculty};
      } catch(err) {
          console.log(err);
          return {error:{message:"something went wrong in getFaculty",code:500}}
      }
}

const getAllFaculties = async() => {
  try {
    const faculties = await Faculty.findAll();
    return {faculties:faculties}
  } catch(err) {
      console.log(err);
      return {error:{message:"something went wrong in getAllFaculties",code:500}}
  }
}

const createFaculty = async(faculty) => {
    try {
       const newFaculty = await Faculty.create(faculty);
       return {faculty:newFaculty};
    } catch(err) {
       console.log(err);
       return {error:{message:"something went wrong in createFaculty",code:500}};
    }
}

const deleteFaculty = async(id) => {
  try {
    const faculty = await Faculty.destroy({where: {id:id}});
    return {faculty:faculty};
 } catch(err) {
    console.log(err);
    return {error:{message:"something went wrong in deleteFaculty",code:500}};
} 
}

const updateFaculty = async(updates) => {
  try {
    const newFaculty = await Faculty.update(updates,{where:{id:updates.id}});
    return {updatedFaculty: newFaculty[1]}; 
  } catch(err) {
    console.log(err);
    return {error:{message:"something went wrong in deleteFaculty",code:500}};
  }

}



module.exports = {
  getFaculty,
  getAllFaculties,
  createFaculty,
  deleteFaculty,
  updateFaculty
}

