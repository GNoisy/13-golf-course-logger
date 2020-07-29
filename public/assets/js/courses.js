// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {

    // will be the devour button
    // currenlty changing the sleepy status of the cat
    $(".go-play").on("click", function(event) {
      //  
  
      var id = $(this).attr("id");
      console.log(id);
      // var playedState = $(this).data("newsleep");
  
      var newPlayedState = {
        played: "1"
      };
  
      // Send the PUT request.
      $.ajax("/api/golf_courses/" + id, {
        type: "PUT",
        data: newPlayedState
      }).then(
        function() {
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    // currently creating a cat
    // change to creating a burger instead
    $(".create-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      // var newBurger = {
      //   name: $("#burg").val().trim(),
      //   sleepy: $("[name=sleepy]:checked").val().trim()
      // };
      var newCourse = {
        courseName: $("#gCourse").val().trim(),
        played: "0"
        
      };
  
      // Send the POST request.
      $.ajax("/api/golf_courses", {
        type: "POST",
        data: newCourse
      }).then(
        function() {
          console.log("added new course");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  });
  