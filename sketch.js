class gameObject {
  
  constructor(x, y){
    this.x = x;
    this.y = y;
    
    this.movement = false;
  }
  
  canMove() { return this.movement }
}

class playerObject extends gameObject {
  constructor(x, y){
    super(x, y);
    this.direction = 38;
  }
  
  getDirection() { return this.direction }
}

class sprite extends gameObject {
  constructor(x, y, width, height, sx, sy, sWidth, sHeight) {
    super(x, y);

    this.width = width;
    this.height = height;
    this.sx = sx;
    this.sy = sy;
    this.sWidth = sWidth;
    this.sHeight = sHeight;
  }
}

//**********************************//
/* DEFINE ALL GLOBAL VARIABLES HERE */
//**********************************//
let tilesX = 16;
let tilesY = 12;

/* Defining the canvas and game state */
var gameBoard = {
  "canvasX": tilesX * 16,
  "canvasY": tilesY * 16,
  "gameX": (tilesX - 2) * 16,
  "gameY": (tilesY - 3) * 16,
  "boundTop": -31,
  "boundBot": -(tilesY * 16) + 16,
  "boundLeft": 15,
  "boundRight": tilesX * 16 - 16,

  /* Defining the gamestate */
  "paused": true
};

/* Defining sprites */
var gameSprites = {
  "fireF1":     new sprite(0, 0, 16, 16, 0, 0, 16, 16),
  "fireF2":     new sprite(16, 0, 16, 16, 16, 0, 16, 16),
  "fireF3":     new sprite(32, 0, 16, 16, 32, 0, 16, 16),
  "fireF4":     new sprite(48, 0, 16, 16, 48, 0, 16, 16),
  "sand":       new sprite(64, 0, 16, 16, 64, 0, 16, 16),
  "brick":      new sprite(80, 0, 16, 16, 80, 0, 16, 16),
  "chickenF1":  new sprite(96, 0, 16, 16, 96, 0, 16, 16),
  "chickenF2":  new sprite(112, 0, 16, 16, 112, 0, 16, 16),
  /* @TODO: Fix this 
  "gameOver":   new sprite(0, 16, 3, 64, 32, 16, 16),
  "dinoF1F3":   new sprite(64, 16, 16, 32)*/
};

// @TODO: Decide on a starting location
var player = new playerObject(
  gameBoard.canvasX / 2, 
  gameBoard.canvasY / 2, 10);


//**********************************//
/*    DEFINE ALL FUNCTIONS HERE     */
//**********************************//
// This will handle all the player movement
function playerMovement() {
  if(player.canMove())
    switch(player.getDirection()){
      case 38:
        player.y -= 5;
      break;

      case 40:
        player.y += 5;
      break;

      case 37:
        player.x -= 5;
      break;

      case 39:
        player.x += 5;
      break;
    }
}


//**********************************//
/*       DEFINE ALL PS5.js HERE     */
//**********************************//
function keyPressed() {
  // Space -> Paused Movement
  if(keyCode === 32) {
    gameBoard.paused = !gameBoard.paused;
    
    // Flip all movement
    player.movement = !gameBoard.paused;
  }
  
  if(!gameBoard.paused)
    switch(keyCode){
      case 38:
        player.direction = 38;
      break;

      case 40:
        player.direction = 40;
      break;

      case 37:
        player.direction = 37;
      break;

      case 39:
        player.direction = 39;
      break;
    }
}

function setup() {
  createCanvas(gameBoard.canvasX, gameBoard.canvasY);

  tileset = loadImage('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAABQCAYAAADRAH3kAAAACXBIWXMAAAsTAAALEwEAmpwYAAAJvGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDYgNzkuMTY0NzUzLCAyMDIxLzAyLzE1LTExOjUyOjEzICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjMgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMS0wMy0yM1QyMjo0NjowNi0wNzowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0wMy0yM1QyMjo0NzozNy0wNzowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjEtMDMtMjNUMjI6NDc6MzctMDc6MDAiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTZmN2Y1OTgtMjQzYy0xYTQxLThmMDQtZDVlOGMxNTJlOWY1IiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MGNmMmE3YmQtNGUwNC01YjRiLTkyNGUtYjUzMjFkNjhmOTRlIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6M2Y0NzM1YjEtNDY4Zi00OTQwLWFiOTItOTgwNTI4MWEyNmUzIj4gPHBob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4gPHJkZjpCYWc+IDxyZGY6bGk+eG1wLmRpZDozYWZiNjhmNi1lOWU4LTc0NDUtYTU2NC0yN2JhZWEzNmFkMzE8L3JkZjpsaT4gPHJkZjpsaT54bXAuZGlkOmQ3NzE0NTBiLTY4NDYtMzE0My1iYjRkLTAzNzQyNjYwMzBjZTwvcmRmOmxpPiA8cmRmOmxpPnhtcC5kaWQ6ZTg2ODUzOTUtYTY1My1iNDRkLTg1NGMtNzYwNzlhYjY5NzhlPC9yZGY6bGk+IDwvcmRmOkJhZz4gPC9waG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6M2Y0NzM1YjEtNDY4Zi00OTQwLWFiOTItOTgwNTI4MWEyNmUzIiBzdEV2dDp3aGVuPSIyMDIxLTAzLTIzVDIyOjQ2OjA2LTA3OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjIuMyAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmJjNjRjNjhlLTdhNzYtYWE0MC05NDlhLWM1MmU4OTk2NzBmMiIgc3RFdnQ6d2hlbj0iMjAyMS0wMy0yM1QyMjo0NzozNy0wNzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjMgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImRlcml2ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImNvbnZlcnRlZCBmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo5NmY3ZjU5OC0yNDNjLTFhNDEtOGYwNC1kNWU4YzE1MmU5ZjUiIHN0RXZ0OndoZW49IjIwMjEtMDMtMjNUMjI6NDc6MzctMDc6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMi4zIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YmM2NGM2OGUtN2E3Ni1hYTQwLTk0OWEtYzUyZTg5OTY3MGYyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjNmNDczNWIxLTQ2OGYtNDk0MC1hYjkyLTk4MDUyODFhMjZlMyIgc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjNmNDczNWIxLTQ2OGYtNDk0MC1hYjkyLTk4MDUyODFhMjZlMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsLhzsMAAAuCSURBVHic7V29bxzHFf+NPo4hIUBgDBKCC6cx7VYqfIA7p4sASYVOKVQRUGH/C/RfQAJG+kiFAFUqolMh0uB1SdpzYaYkxcbNIbEBEzIUMjpbmhQ7s/tmdj7e7NzxTuT+gIOWs/ObN5r35s2bj90VUkqcZ3z71+u1Bri2cgX//uk1i//in//Nkv/w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');
}

function draw() {
  clear();
  background(220);
  
  playerMovement();
  
  for(const [key, value] of Object.entries(gameSprites)) {
    image(tileset, value.x, value.y, value.width, value.height,
      value.sx, value.sy, value.sWidth, value.sHeight);
  }

  image(tileset, 16, 32, gameSprites["sand"].width, gameSprites["sand"].height,
  gameSprites["sand"].sx, gameSprites["sand"].sy, gameSprites["sand"].sWidth, gameSprites["sand"].sHeight);

  circle(player.x, player.y, 16);
}
