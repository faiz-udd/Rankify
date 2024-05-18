const { reviewService } = require('../services/index');
const {v4:uuid} = require('uuid');


const createReview = async(req,res) => {
    try {
        // req.body has review_text, TeacherEmail, UserEmail
        const review = {
            review_text: req.body.review_text,
            TeacherEmail: req.body.TeacherEmail,
            id: uuid(),
            UserEmail: req.user.email
        };
        console.log(req.body)
        const newReview = await reviewService.createReview(review);
        if(newReview.error) {
            return res.status(newReview.error.code).json(newReview.error.message);
        }
        return res.status(201).send({"rating":newReview, "message":"review created successfully"});
    } catch(err) {
        console.log(err);
        return res.json({"message":"something went wrong in review controller create review"})
    }
}

const getAllReviewsOfTeacher = async(req,res) => {
    try {
        const teacherEmail = req.params.teacherId;
       const reviews = await reviewService.getAllReviewsbyTeacher(teacherEmail);
       if(reviews.error) {
         return res.status(reviews.error.code).json(reviews.error.message);
       }
       return res.status(200).json({reviews});
    }catch(err) {
        console.log(err);
        return res.json({"message":"something went wrong in review controller getAllReviewsbyTeacher review"})
    }
}

module.exports = {
    createReview,
    getAllReviewsOfTeacher
}
