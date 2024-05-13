const { Review } = require('../models/index');

const getReview = async (reviewId) => {
    try {
        const review = await Review.findByPk(reviewId);
        return { review: review };
    } catch (err) {
        console.log(err);
        return { error: { message: "something went wrong in getReview", code: 500 } };
    }
}

const createReview = async (newReview) => {
    try {
        const createdReview = await Review.create(newReview);
        return { review: createdReview };
    } catch (err) {
        console.log(err);
        return { error: { message: "something went wrong in createReview", code: 500 } };
    }
}

const deleteReview = async (reviewId) => {
    try {
        const deletedRows = await Review.destroy({ where: { id: reviewId } });
        return { rowsAffected: deletedRows };
    } catch (err) {
        console.log(err);
        return { error: { message: "something went wrong in deleteReview", code: 500 } };
    }
}

const updateReview = async (updatedReview) => {
    try {
        const [updatedRowsCount, updatedRows] = await Review.update(updatedReview, { where: { id: updatedReview.id }, returning: true });
        return { updatedReview: updatedRows[0] };
    } catch (err) {
        console.log(err);
        return { error: { message: "something went wrong in updateReview", code: 500 } };
    }
}

const getAllReviewsbyTeacher = async(teacherEmail) => {
    try {
         const reviews = await Review.findAll({where:{TeacherEmail:teacherEmail}});
         return {reviews};
    } catch (err) {
        console.log(err);
        return { error: { message: "something went wrong in getAllReviewbyteacher", code: 500 } };
    }
}

module.exports = {
    getReview,
    createReview,
    deleteReview,
    updateReview,
    getAllReviewsbyTeacher
}
