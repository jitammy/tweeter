$(document).ready(function() {
    $("textarea").on('input', function() {
        var charCounter = $(this).val().length;
        $(".counter").text(140 - charCounter);
        if (charCounter > 140){
            $("span").addClass("notValid");
          } else {
            $("span").removeClass("notValid")
          }
    })
});

