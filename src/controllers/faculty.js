const {facultyService } = require('../services/index');

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

module.exports = {
    getAllFaculties
}


