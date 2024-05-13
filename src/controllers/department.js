const {departmentService } = require('../services/index');

const getAllDepartments = async(req,res) => {
    try {
        const facultyId = req.params.id; // faculty id can be null
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

module.exports = {
    getAllDepartments
}


