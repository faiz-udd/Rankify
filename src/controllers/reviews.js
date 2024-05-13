const { reviewService } = require('../services/index');
const {v4:uuid} = require('uuid');


const createReview = async(req,res) => {
    try {
        // req.body.review has review_text, TeacherEmail, UserEmail
        const review = req.body.review;
        review.id = uuid();
        const newReview = await reviewService.createReview(review);
        if(newReview.error) {
            return res.status(newReview.error.code).json(newReview.error.message);
        }
        return {review}
    } catch(err) {
        console.log(err);
        return res.json({"message":"something went wrong in review controller create review"})
    }
}

const getAllReviewsOfTeacher = async(req,res) => {
    try {
        const teacherEmail = req.params.id;
       const reviews = await reviewService.getAllReviewsbyTeacher(teacherEmail);
       if(reviews.error) {
         return res.status(reviews.error.code).json(reviews.error.message);
       }
       return {reviews};
    }catch(err) {
        console.log(err);
        return res.json({"message":"something went wrong in review controller getAllReviewsbyTeacher review"})
    }
}

module.exports = {
    createReview,
    getAllReviewsOfTeacher
}
