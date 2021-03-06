// var connection = require("./connection.js");


// var orm = {
//     selectAll: function (tableInput, cb) {
//       var queryString = "SELECT * FROM ??;";
//       connection.query(queryString, [tableInput], function (err, result) {
//         if (err) throw err;
//         console.log(result);
//         cb(result);
//       });
//     },
    
  
//     insertOne: function (table, col, value) {
//       var queryString = "INSERT INTO ?? (";
//       for (var i = 0; col.length; i++) {
//         if (i == col.length - 1) {
//           queryString += "? )";
//         } else {
//           queryString += "?, ";
//         }
//       }
  
//       queryString += " VALUES (";
//       // todo: add question marks for every value instead of column
//       for (var i = 0; value.length; i++) {
//         if (i == value.length - 1) {
//           queryString += "? )";
//         } else {
//           queryString += "?, ";
//         }
//       }
  
//       queryString += ";";
  
//       console.log(queryString);
//       connection.query(queryString, [table, col, value], function (err, result) {
//         if (err) throw err;
//         console.log(result);
//       });
//     },
    
//     updateOne: function (table, objColVal, condition) {
//       var queryString = "UPDATE ?? SET ";
  
//       // adding the column and value to the query
//       for (var col in objColVal) {
//         var value = objColVal[col];
//         queryString += col + "=" + value;
//       }
  
//       // adding the condition (ex: 'id=1')
//       queryString += " WHERE " + condition + ";";
  
//       console.log(queryString);
  
//       connection.query(queryString, [table], function (err, result) {
//         if (err) throw err;
//         console.log(result);
//       });
//     },
// };
  
// module.exports = orm;
// Import MySQL connection.
var connection = require("../config/connection.js");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
  selectAll: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  insertOne: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  // An example of objColVals would be {name: panther, sleepy: true}
  updateOne: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};

// Export the orm object for the model (cat.js).
module.exports = orm;
