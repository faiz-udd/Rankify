const { teacherService,subjectRatingService,ratingService } = require('../services/index');
const { v4:uuid } = require('uuid');
const { Teacher, Subject, Subject_Rating,Department,Faculty} = require('../models/index');
const sequelize = require('sequelize');

// CRUD


const createTeacher = async(req,res) => {
    try {   // req.body will have teacher obj, faculty obj and dept obj and anything else
        const teacher = {...req.body.teacher};
         console.log(req.body)
         // validate email
         const emailRegex = /^[a-zA-Z0-9._%+-]+@iiu\.edu\.pk$/;
         if(!emailRegex.test(teacher.email)) {
             return res.status(400).send({"message":"Invalid IIUI Email from server"});
         }
         const fetchTeacher = await teacherService.getTeacher(teacher.email);
         if(fetchTeacher.error) { 
              return res.status(fetchTeacher.error.code).send(fetchTeacher.error.message);
         }
         if(fetchTeacher.teacher) {
          return res.status(409).send({"message":"Teacher already exists with this email"});
         }
    
          teacher.FacultyId = req.body.faculty.id;
          teacher.DepartmentId = req.body.department.id;
         
         const newTeacher = await teacherService.createTeacher(teacher);
         if(newTeacher.error) {
           return res.status(newTeacher.error.code).send(newTeacher.error.message);
         }
         // everything went good then return the teacher back
         return res.status(201).send({"teacher":newTeacher, "message":"teacher added successfully"});
      
    } catch(err) {
        console.log(err);
        return res.status(500).send({"message":"something went wrong in teacherController create teacher"});
    }
   
}

const getTeacherById = async(req,res) => {
    try {
      const teacher = await teacherService.getTeacher(req.params.email);
      if(!teacher) {
        return res.status(404).send({"teacher":teacher,"message":"teacher not found"});
      }
      if(teacher.error) {
         return res.status(teacher.error.code).send(teacher.error.message);
      }
      return res.send({"teacher":teacher,"message":"teacher found sucess"});
    } catch(err) {
        console.log(err);
        return res.status(500).send({"message":"something went wrong in teacherController findByID"});
    }
}

const getAllTeachers = async(req,res) => {
    try {
      const facultyId = req.params.facultyId;
      const teachers = await teacherService.getAllTeachers(facultyId);
      return res.status(200).send({"teachers":teachers,"message":"found all"});
    } catch(err) {
        console.log(err);
        return res.status(500).send({"message":"something went wrong in teacherController findByFaculty"});
    }
}
const getAllTeachersByDept = async(req,res) => {
    try {
      const departmentId = req.params.departmentId;
      const teachers = await teacherService.getAllTeachersByDept(departmentId);
      return res.status(200).send({"teachers":teachers,"message":"found all"});
    } catch(err) {
        console.log(err);
        return res.status(500).send({"message":"something went wrong in teacherController findBYDept"});
    }
}

const getTop10Teachers = async(req,res) => {
    try {
       
       const limit = parseInt(req.query.limit || 50);
       console.log(limit);
       console.log(req.query.limit);

       const {top_subject_ratings} = await subjectRatingService.getTopSubjectRatings(limit); // get top 10
       const teacherEmails = top_subject_ratings.map(rating => rating.TeacherEmail);
       const ratings = top_subject_ratings.map(ratings => ratings.dataValues.rating);
       // fetch all teachers
       const top_10_teachers = await Teacher.findAll({
           where: {
              email: teacherEmails
        },
        include: [
          {
            model: Department,
            attributes: ['name'],
            include: [
              {
                model: Faculty,
                attributes: ['name']
              }
            ]
          }
        ]
      });
       // fetch all subjects
       const subjectIds = top_subject_ratings.map(rating => rating.SubjectId);
       const subjects = await Subject.findAll({
           where: {
             id: subjectIds
           }
       });
       // check if a teacher is role model..
       for(const teacher of top_10_teachers) {
           const roleModelCount = await ratingService.roleModelCount(teacher.email);
           if(!roleModelCount.error) { // if no errors
             teacher.dataValues.roleModelCount = roleModelCount; // adding role model count on teacher object
           }
           // also set department and faculty names
           teacher.dataValues.faculty = teacher.dataValues.Department.Faculty.name;
           teacher.dataValues.department = teacher.dataValues.Department.name;
           delete teacher.dataValues.Department;
       }
       top_10_teachers.forEach((teacher, index) => {
         teacher.dataValues.rating = ratings[index];
       })

       const topTeachers = [];
       topTeachers.push({teachers: top_10_teachers});
       topTeachers.push({subjects: subjects});
       // return top teachers
       return res.json(topTeachers);
        
    } catch(err) {
            console.log(err);
            return res.status(500).send({"message":"something went wrong in teacherController top10"});
        
    }
}

// get best teacher of a subject based on ratings of that subject
const getBestTeacherOfSubject = async (req,res) => {
     try { 
      console.log(req.params.name);
      const subjectName = req.params.name; // by name
      const subject_ratings = await subjectRatingService.getSubjectRatingsByName(subjectName);
      if(subject_ratings.error) {
         return res.status(subject_ratings.error.code).json(subject_ratings.error.message);
      }
        // get top  5 best teachers of that subject
        const topTeachers = await getTopTeachers(subject_ratings.subjectRatings);
     } catch(err) {
       console.log(err);
       return res.status(500).send({"message":"something went wrong in teacherController getBestTeacher"});
     }
}


async function getTopTeachers(subjectRatings) {
  try {
      const topTeachers = await Subject_Rating.findAll({
          attributes: [
              'TeacherEmail',
              [sequelize.fn('COUNT', sequelize.col('rating')), 'ratingCount']
          ],
          where: {
              TeacherEmail: {
                  [sequelize.Op.in]: subjectRatings.map(rating => rating.TeacherEmail)
              }
          },
          group: ['teacherEmail'],
          order: sequelize.literal('ratingCount DESC'),
          limit: 5
      });
      return topTeachers;
  } catch (error) {
      console.error('Error fetching top teachers:', error);
      return null;
  }
}


module.exports = {
    createTeacher,
    getTeacherById,
    getAllTeachers,
    getAllTeachersByDept,
    getTop10Teachers,
    getBestTeacherOfSubject
}