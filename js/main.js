/* Slider */

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    if (n > x.length) {slideIndex = 1}
    if (n < 1) {slideIndex = x.length} ;
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex-1].style.display = "block";
}

/* Flexbox */


function main() {}
$('.box10').hide();
  $(".box1").on("click", function(){
    $(".box10").toggle();
    $(this).toggleClass("active");
  });

$(document).ready(main);

function main() {}
$('.box20').hide();
  $(".box2").on("click", function(){
    $(".box20").toggle();
    $(this).toggleClass("active");
  });

$(document).ready(main);

function main() {}
$('.box30').hide();
  $(".box3").on("click", function(){
    $(".box30").toggle();
    $(this).toggleClass("active");
  });

$(document).ready(main);


function main() {}
$('.box40').hide();
  $(".box4").on("click", function(){
    $(".box40").toggle();
    $(this).toggleClass("active");
  });

$(document).ready(main);

function main() {}
$('.box50').hide();
  $(".box5").on("click", function(){
    $(".box50").toggle();
    $(this).toggleClass("active");
  });

$(document).ready(main);

function main() {}
$('.box60').hide();
  $(".box6").on("click", function(){
    $(".box60").toggle();
    $(this).toggleClass("active");
  });

$(document).ready(main);
