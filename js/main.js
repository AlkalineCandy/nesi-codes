function main() {}
$('.box10').hide();
  $(".box1").on("click", function(){
    $(".box10").toggle();
    $(this).toggleClass("active");
  });

$(document).ready(main);
