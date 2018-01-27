// Select color input
// Select size input

// When size is submitted by the user, call makeGrid()

// Nesi's work starts from here:

$(document).ready(function() {
  $("#submit_button").on("click", function(event) {
    // clicking the button performs the called functions below
    event.preventDefault(); // prevents refresh
    $(".row").remove(); // removes leftovers if the button is clicked again, thus prevents the grid from growing forever if you keep clicking
    makeGrid();
    colorPicker();
    colorDrag();
    return false; // false blocks the default action. if makeGrid returned truthy, it would allow the button to cause a form submit, so we sidestep that
  });
});

// 1. Let's make the grid
function makeGrid() {
  let gridHeight = $("#input_height").val(); // first, we get the value of the height/width data, respectively
  let gridWidth = $("#input_width").val();

  for (let i = 1; i <= gridHeight; i++) {
// This loop adds rows to the DOM
    let row = $("<tr class='row'> </tr>");
    $("table").prepend(row);
  }

  for (let j = 1; j <= gridWidth; j++) {
// This loop adds cells to the rows
    let cell = $('<td class="cell">  </td>');
    $(".row").append(cell);
  }
}

// 2. Let's pick a color
function colorPicker() {
  $("#colorPicker").change();

  $(".cell").on("click", function() {
    $(this).css("background", $("#colorPicker").val());


// This double clicking function reverts the cell back to white
    $(this).dblclick(function(){
       $(this).css('background', '');
    });
  });

}

// Let's drag the mouse for easier coloring

function colorDrag() {
    let down = false;   // tracks status of mouse button
  $(document).mousedown(function() {
    down = true;      // true when mouse is down
  })
  .mouseup(function() {
    down = false;    // true when mouse is up
  });
  $(".cell").mouseover(function(){
    if(down) {        // CSS changes if mouse is down
    $(this).css("background", $("#colorPicker").val());
    }
  });
}
