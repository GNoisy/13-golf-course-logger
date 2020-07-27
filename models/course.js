var orm = require("../config/orm.js");


var course = {

    selectAll: function(cb) {
      orm.selectAll("golf_courses", function(res) {
        cb(res);
      });
    },
    
    insertOne: function(cols, vals, cb) { 
      orm.insertOne("golf_courses", cols, vals, function(res) {
        cb(res);
      });
    },
  
    updateOne: function(objColVals, condition, cb) {
      orm.updateOne("golf_courses", objColVals, condition, function(res) {
        cb(res);
      });
    }
};


module.exports = course;