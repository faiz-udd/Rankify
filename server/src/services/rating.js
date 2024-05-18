const { Rating } = require('../models/index');

const getRating = async (ratingId) => {
    try {
        const rating = await Rating.findByPk(ratingId);
        return { rating: rating };
    } catch (err) {
        console.log(err);
        return { error: { message: "something went wrong in getRating", code: 500 } };
    }
}

const createRating = async (newRating) => {
    try {
        const createdRating = await Rating.create(newRating);
        return { rating: createdRating };
    } catch (err) {
        console.log(err);
        return { error: { message: "something went wrong in createRating", code: 500 } };
    }
}

const deleteRating = async (ratingId) => {
    try {
        const deletedRows = await Rating.destroy({ where: { id: ratingId } });
        return { rowsAffected: deletedRows };
    } catch (err) {
        console.log(err);
        return { error: { message: "something went wrong in deleteRating", code: 500 } };
    }
}

const updateRating = async (updatedRating) => {
    try {
        const [updatedRowsCount, updatedRows] = await Rating.update(updatedRating, { where: { id: updatedRating.id }, returning: true });
        return { updatedRating: updatedRows[0] };
    } catch (err) {
        console.log(err);
        return { error: { message: "something went wrong in updateRating", code: 500 } };
    }
}

const getAllRatingsOfTeacher = async(subjectRatingId) => {
    try {
       const ratings = await Rating.findAll({where:{SubjectRatingId: subjectRatingId}});
       return {ratings:ratings};

    } catch(err) {
        console.log(err);
        return { error: { message: "something went wrong in updateRating", code: 500 } };

    }
}

const roleModelCount = async(teacherEmail) => {
    try {
        return await Rating.count({
            where: {
              TeacherEmail: teacherEmail,
              is_role_model: true
            }
          });
    } catch(err) {
        console.log(err);
        return { error: { message: "something went wrong in updateRating", code: 500 } };
    }
}

module.exports = {
    getRating,
    createRating,
    deleteRating,
    updateRating,
    getAllRatingsOfTeacher,
    roleModelCount
}
