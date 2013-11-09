(function(){

  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;

})();

var game = {
  objects: [ 
    {
      name: "player"
    }
  ]
};

var keys = [];

function init(){

  var canvas = document.getElementById('canvas');

  if(canvas.getContext){

    var ctx = canvas.getContext('2d');

    canvas.addEventListener('click', function(e){
      clickObj(e.x, e.y);
    }, false);

    document.body.addEventListener("keydown", function(e) {
      keys[e.keyCode] = true;
    });
     
    document.body.addEventListener("keyup", function(e) {
      keys[e.keyCode] = false;
    });

    var playButton = {
      name: "playButton",
      x: 200, 
      y: 175, 
      width: 200, 
      height: 50,
      color: "rgba(200, 0, 0, 0.5)",
      type: "rect",
      click: play,
      hover: function(){
        console.log("hover");
      }
    };
    game.objects.push(playButton);

    var playButtonText = {
      name: "playButtonText",
      x: 200, 
      y: 175, 
      width: 200, 
      height: 50,
      color: "rgba(255, 255, 255, 1)",
      type: "text",
      content: "Play"
    };
    game.objects.push(playButtonText);

    window.requestAnimationFrame(update);

  }

  function update(){
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, 600, 400);

    var canvas = document.getElementById("canvas");

    for(var i = 0; i <= game.objects.length - 1; i++){
      if(game.objects[i].name == "player"){
        var playerX, playerY, playerHeight, playerWidth, playerSpeed;

        playerX = game.objects[i].x;
        playerY = game.objects[i].y;
        
        playerSpeed = game.objects[i].speed;
        playerVelX = game.objects[i].velX;
        playerVelY = game.objects[i].velX;

        playerHeight = game.objects[i].height;
        playerWidth = game.objects[i].width;

        // Down arrow
        if(keys[40]){
          game.objects[i].velY++;
        }
        // Up arrow
        if(keys[38]){
          game.objects[i].velY--;
        }
        // Right arrow
        if(keys[39] && playerX < (canvas.width - playerWidth) && playerVelX < playerSpeed){
          game.objects[i].velX++;    
        }    
        // Left arrow      
        if(keys[37] && playerX > 0 && playerVelX > -playerSpeed){                 
          game.objects[i].velX--;
        }

        var friction = 0.8;

        game.objects[i].velX *= friction;
        game.objects[i].velY *= friction;

        game.objects[i].y += game.objects[i].velY;
        game.objects[i].x += game.objects[i].velX;

        if(game.objects[i].y <= 0 ){
          game.objects[i].y = 0;
        }else if(game.objects[i].y >= (canvas.height - playerHeight) ){
          game.objects[i].y = canvas.height - playerHeight;
        }

        if(game.objects[i].x < 0 ){
          game.objects[i].x = 0;
        }else if(game.objects[i].x > (canvas.width - playerWidth) ){
          game.objects[i].x = canvas.width - playerWidth;
        }
        
      }
    };
    

    for(var i = 0; i <= game.objects.length - 1; i++){
      ctx.fillStyle = game.objects[i].color;
      if(game.objects[i].type == "rect"){
        ctx.fillRect(game.objects[i].x, game.objects[i].y, game.objects[i].width, game.objects[i].height);
      }
      if(game.objects[i].type == "text"){
        ctx.font = "bold 40px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(game.objects[i].content, (game.objects[i].x + game.objects[i].width / 2), (game.objects[i].y + game.objects[i].height / 2));
      }
    };
    window.requestAnimationFrame(update);
  }

  function clickObj(clickX, clickY){
    for(var i = 0; i <= game.objects.length - 1; i++){
      if(game.objects[i].x <= clickX && game.objects[i].x + game.objects[i].width >= clickX){
        if(game.objects[i].y <= clickY && game.objects[i].y + game.objects[i].height >= clickY){
          if(game.objects[i].click){
            game.objects[i].click(i);
          }
        }
      }
    };
  }

  function removeObj(name){
    for(var i = 0; i <= game.objects.length - 1; i++){
      if(game.objects[i].name == name){
        game.objects.splice(i, 1);
      }
    };
  }

  function play(i){

    for(var i = 0; i <= game.objects.length - 1; i++){
      if(game.objects[i].name == "player"){
      
        var canvas = document.getElementById("canvas");

        var playerWidth = 50;
        var playerHeight = 50;

        game.objects[i].x = (canvas.width / 2) - (playerWidth / 2);
        game.objects[i].y = (canvas.height / 2) - (playerHeight / 2);
        game.objects[i].velX = 0;
        game.objects[i].velY = 0;
        game.objects[i].speed = 3;
        game.objects[i].width = playerWidth;
        game.objects[i].height = playerHeight;
        game.objects[i].color = "rgba(0, 0, 0, 0.5)";
        game.objects[i].type = "rect";
        
      }
    };

    var bar = {
      name: "bar",
      x: 0, 
      y: 350, 
      width: 600, 
      height: 50,
      color: "rgba(0, 0, 0, 0.5)",
      type: "rect"
    };
    game.objects.push(bar);

    removeObj("playButton");
    removeObj("playButtonText");
  }

}



