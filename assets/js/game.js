var snake = ["1_4", "1_3", "1_2"];
var snake_direction = 4;
var gameSpeed = 150;
var foodCell = "";
var score = 0;


/*
 Function, which creates field of game
 You can adjust field of game in params a and b
 where:
 a = rows;
 b = columns;
 */
function createGameBoard(a, b) {

  var $tbl = $('<table>');

  for (var i = 0; i < a; i++) {
    var $row = $('<tr>');
    var $column;
    $tbl.append($row);
    for (var j = 0; j < b; j++) {
      $column = $('<td id=game-cell_' + i + '_' + j + '>');
      $column.addClass('cell');
      // $row.append($column.text("i:" + i + " j: " + j));
      $row.append($column);
    }
  }

  $('#app').append($tbl);


  $('#game-cell_1_2').addClass('snake-body');
  $('#game-cell_1_3').addClass('snake-body');
  $('#game-cell_1_4').addClass('snake-body');

  createFoodCell(a, b);
  setTimeout(function () {
    updateGame()
  }, gameSpeed);


}

createGameBoard(15, 15);

/*
 Function, that creates food element,
 based on your adjustment of game field

 Function creates food using random calculation via Math.random()
 whereas:

 var food_row describes random row of cell from adjusted "a" variable from game board
 vra food_column describes random column of cell from adjusted "b" variable from game board as well

 */

function createFoodCell(a, b) {
  var food_row = Math.floor(Math.random() * (a - 1));
  var foor_column = Math.floor(Math.random() * (b - 1));
  $('#game-cell_' + food_row + '_' + foor_column).addClass('food');
  foodCell = '' + food_row + '_' + foor_column;
}

/*
 Function, that updates the game
 */



function updateGame() {
  var snake_tail = snake.pop();
  $('#game-cell_' + snake_tail).removeClass('snake-body');

  var snake_head = snake[0];
  var rc = snake_head.split("_");
  var snake_row_dir = parseInt(rc[0]);
  var snake_col_dir = parseInt(rc[1]);

  switch (snake_direction) {
    case 1:
      snake_row_dir = snake_row_dir + 1;
      break; // Bottom
    case 2:
      snake_col_dir = snake_col_dir - 1;
      break; // Left
    case 3:
      snake_row_dir = snake_row_dir - 1;
      break; // Top
    case 4:
      snake_col_dir = snake_col_dir + 1;
      break;  // Right
  }

  var snake_eat = "" + snake_row_dir + "_" + snake_col_dir;
  console.log("snake head on pos " +  snake_eat);
  console.log("food cell on pos" + foodCell);
  if (snake_eat == foodCell) {
      snake.push(snake_tail);
      $("#game-cell_"+snake_tail).addClass('snake-body');
      $("#game-cell_"+foodCell).removeClass('food');
      score += 1;
      createFoodCell(15,15);
  }

  snake.unshift(snake_eat);


  $('#game-cell_'+ snake_eat).hasClass('snake-body');
  if (snake_col_dir<0 || snake_row_dir<0 || snake_col_dir>15 || snake_row_dir>15 ||  $('#game-cell_'+snake_eat).hasClass('snake-body') ){
    alert('You lost with score: ' + score);
    return;
  }
  $('#game-cell_'+ snake_eat).addClass('snake-body');
  setTimeout(function(){updateGame()}, gameSpeed);

}

$(document).keydown(function(e) {
  if (e.keyCode == 37) {
    snake_direction = 2;
  } else if (e.keyCode == 38) {
    snake_direction = 3;
  } else if (e.keyCode == 39) {
    snake_direction = 4;
  } else if (e.keyCode == 40) {
    snake_direction = 1;
  }

});


