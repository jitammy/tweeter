$(document).ready(function() {

    $(".new-tweet").on('keyup', function(evt) {

        var charCounter = $(this).closest(".new-tweet").find("textarea").val().length;

        $(".counter").text(140 - charCounter);

        if (charCounter > 140){
            $("span").addClass("notValid");
          } else {
            $("span").removeClass("notValid")
          }
  });
});
  
  // This changes the character counter everytime a key is released.
  // The counter is given the class "notValid" when the character count is higher than 140.
  // The class "notValid" is removed when the character count goes back to below 140.

