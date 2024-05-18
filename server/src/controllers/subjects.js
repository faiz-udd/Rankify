const { v4:uuid } = require('uuid');
const { subjectService } = require('../services/index');

const createSubject = async(req,res) => {
    try {   // req.body will have subject obj and anything else
        const subject = {...req.body.subject, id:uuid()};
        const newSubject = await subjectService.createSubject(subject);
        if(newSubject.error) {
            return res.status(newSubject.error.code).send(newSubject.error.message);
        }        
        return res.status(201).send({"subject":newSubject, "message":"subject added successfully"});
       
    } catch(err) {
        console.log(err);
        return res.status(500).send({"message":"something went wrong in subjectController create subject"});
    
    }
}

const getAllSubjectsByDept = async(req,res) => {
    // all subjects of particular department
    try {   
       const departmentId = req.params.id;
       const subjects = await subjectService.getSubjectsByDepartment(departmentId);
       if(subjects.error) {
        return res.status(subjects.error.code).json(subjects.error.message);
       }
       return res.status(200).send(subjects);
    } catch(err) {
        console.log(err);
        return res.status(500).send({"message":"something went wr ong in subjectController create subject"});
    
    }
}

module.exports = {
    createSubject,
    getAllSubjectsByDept
}