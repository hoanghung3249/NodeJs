const express = require("express");
const app = express();
const router = express.Router();

const Course = require("../models/Course");

router.route("/add").post(function (req, res) {
   // Create Course model
   const course = new Course(req.body);
   console.log("Course Model: ", course);

   course.save().then(c => {
      res.status(200).json({"status": "Add new course success!"});
   }).catch(err => {
      res.status(400).json({"status": `Add new course fail ${err}`})
   });
});

//Get all Courses
router.route("/").get(function (req, res) {
   // Find all Course
   Course.find(function (err, courses) {
      if (err){
         res.status(400).json({"Message": `${err}`})
      } else {
         res.status(200).json(courses);
      }
   });
});

//Update course
router.route("/update/:id").post(function (req, res) {
   //Find Course by Id from the request
   Course.findById(req.params.id, function (err, course) {
      if (!course) {
         res.status(400).json({"Message": `Cannot update Course ${err}`})
      } else {
         course.name = req.body.name;
         course.price = req.body.price;
      }

      //Save new course to database
       course.save().then(c => {
          res.status(200).json({"status": "Update success"});
       }).catch(err => {
          res.status(400).json({"status": "Unable to update database"});
       })
   });
});

//Delete course
router.route("/delete/:id").post(function (req, res) {
   //Find Course from the request
   Course.findByIdAndRemove({_id: req.body.id}, function (err, course) {
       if (err) {
          res.status(400).json({"status": `Error when delete: ${err}`})
       } else {
          res.status(200).json({"status": `Delete success course: ${course.name}`});
       }
   });
});

module.exports = router;