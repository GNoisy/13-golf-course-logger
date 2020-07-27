var express = require("express");

var router = express.Router();

var course = require("../models/course.js");

// // Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    course.selectAll(function(data) {
      var hbsObject = {
        golf_courses: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
});
  
router.post("/api/golf_courses", function(req, res) { 
    course.insertOne([
      "courseName", "played"
    ], [
      req.body.courseName, req.body.played
    ], function(result) {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
      console.log(result);
    });
    
});
  
router.put("/api/golf_courses/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    console.log("condition", condition);
  
    course.updateOne({
      course: req.body.played
    }, condition, function(result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
});




module.exports = router;