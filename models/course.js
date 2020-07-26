var orm = require("../config/orm.js");


var course = {

    all: function(cb) {
      orm.selectAll("golf_courses", function(res) {
        cb(res);
      });
    },
    
    insertOne: function(cols, vals, cb) { 
      orm.create("golf_courses", cols, vals, function(res) {
        cb(res);
      });
    },
  
    updateOne: function(objColVals, condition, cb) {
      orm.update("golf_courses", objColVals, condition, function(res) {
        cb(res);
      });
    }
};


module.exports = course;