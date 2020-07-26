var connection = require("./connection.js");


var orm = {
    selectAll: function (tableInput, cb) {
      var queryString = "SELECT * FROM ??;";
      connection.query(queryString, [tableInput], function (err, result) {
        if (err) throw err;
        console.log(result);
        cb(result);
      });
    },
    
  
    insertOne: function (table, col, value) {
      var queryString = "INSERT INTO ?? (";
      for (var i = 0; col.length; i++) {
        if (i == col.length - 1) {
          queryString += "? )";
        } else {
          queryString += "?, ";
        }
      }
  
      queryString += " VALUES (";
      // todo: add question marks for every value instead of column
      for (var i = 0; value.length; i++) {
        if (i == value.length - 1) {
          queryString += "? )";
        } else {
          queryString += "?, ";
        }
      }
  
      queryString += ";";
  
      console.log(queryString);
      connection.query(queryString, [table, col, value], function (err, result) {
        if (err) throw err;
        console.log(result);
      });
    },
    
    updateOne: function (table, objColVal, condition) {
      var queryString = "UPDATE ?? SET ";
  
      // adding the column and value to the query
      for (var col in objColVal) {
        var value = objColVal[col];
        queryString += col + "=" + value;
      }
  
      // adding the condition (ex: 'id=1')
      queryString += " WHERE " + condition + ";";
  
      console.log(queryString);
  
      connection.query(queryString, [table], function (err, result) {
        if (err) throw err;
        console.log(result);
      });
    },
};
  
module.exports = orm;