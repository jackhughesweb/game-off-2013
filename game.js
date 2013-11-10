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
      content: "Play",
      font: "bold 40px sans-serif",
      textAlign: "center",
      textBaseline: "middle"
    };
    game.objects.push(playButtonText);

    window.requestAnimationFrame(update);

  }

  function update(){
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, 600, 400);

    var canvas = document.getElementById("canvas");

    for(var i = 0; i <= game.objects.length - 1; i++){
      if(game.objects[i].name == "time"){
        game.objects[i].content = Math.floor(game.time / 60) + ":" + game.time % 60 ;
      }
      if(game.objects[i].name == "levelNumber"){
        game.objects[i].content = "City " + game.level.number;
      }
      if(game.objects[i].name == "levelName"){
        game.objects[i].content = game.level.name;
      }
      if(game.objects[i].name == "gbpScore"){
        game.objects[i].content = "£" + game.score.gbp.toFixed(2);
      }
      if(game.objects[i].name == "usdScore"){
        game.objects[i].content = "$" + game.score.usd.toFixed(2);
      }
      if(game.objects[i].name == "brlScore"){
        game.objects[i].content = "R$" + game.score.brl.toFixed(2);
      }
      if(game.objects[i].name == "audScore"){
        game.objects[i].content = "$" + game.score.aud.toFixed(2);
      }
      if(game.objects[i].name == "egpScore"){
        game.objects[i].content = "E£" + game.score.egp.toFixed(2);
      }
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
        ctx.font = game.objects[i].font;
        ctx.textAlign = game.objects[i].textAlign;
        ctx.textBaseline = game.objects[i].textBaseline;
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

    initScorebar();

    removeObj("playButton");
    removeObj("playButtonText");
  }

  function initScorebar(){
    var lightBar = {
      name: "lightBar",
      x: 0, 
      y: 350, 
      width: 160, 
      height: 50,
      color: "rgba(0, 0, 0, 0.5)",
      type: "rect"
    };
    var darkBar = {
      name: "darkBar",
      x: 160, 
      y: 350, 
      width: 440, 
      height: 50,
      color: "rgba(0, 0, 0, 0.8)",
      type: "rect"
    };
    game.objects.push(lightBar);
    game.objects.push(darkBar);

    var time = {
      name: "time",
      x: 0, 
      y: 350, 
      width: 80, 
      height: 50,
      color: "rgba(255, 255, 255, 1)",
      type: "text",
      font: "bold 20px sans-serif",
      textAlign: "center",
      textBaseline: "middle"
    };
    game.objects.push(time);

    var levelNumber = {
      name: "levelNumber",
      x: 40, 
      y: 355, 
      width: 80, 
      height: 25,
      color: "rgba(255, 255, 255, 1)",
      type: "text",
      font: "bold 15px sans-serif",
      textAlign: "left",
      textBaseline: "middle"
    };
    game.objects.push(levelNumber);

    var levelName = {
      name: "levelName",
      x: 40, 
      y: 370, 
      width: 80, 
      height: 25,
      color: "rgba(255, 255, 255, 1)",
      type: "text",
      font: "bold 15px sans-serif",
      textAlign: "left",
      textBaseline: "middle"
    };
    game.objects.push(levelName);

    game.score = {
      gbp: 0.00,
      usd: 0.00,
      brl: 0.00,
      aud: 0.00,
      egp: 0.00
    };
    game.time = 754;
    game.level = {
      number: 1,
      name: "London"
    };

    var gbpScore = {
      name: "gbpScore",
      x: 160, 
      y: 350, 
      width: 88, 
      height: 50,
      color: "rgba(255, 255, 255, 1)",
      type: "text",
      font: "bold 15px sans-serif",
      textAlign: "center",
      textBaseline: "middle"
    };
    var usdScore = {
      name: "usdScore",
      x: 248, 
      y: 350, 
      width: 88, 
      height: 50,
      color: "rgba(255, 255, 255, 1)",
      type: "text",
      font: "bold 15px sans-serif",
      textAlign: "center",
      textBaseline: "middle"
    };
    var brlScore = {
      name: "brlScore",
      x: 336, 
      y: 350, 
      width: 88, 
      height: 50,
      color: "rgba(255, 255, 255, 1)",
      type: "text",
      font: "bold 15px sans-serif",
      textAlign: "center",
      textBaseline: "middle"
    };
    var audScore = {
      name: "audScore",
      x: 424, 
      y: 350, 
      width: 88, 
      height: 50,
      color: "rgba(255, 255, 255, 1)",
      type: "text",
      font: "bold 15px sans-serif",
      textAlign: "center",
      textBaseline: "middle"
    };
    var egpScore = {
      name: "egpScore",
      x: 512, 
      y: 350, 
      width: 88, 
      height: 50,
      color: "rgba(255, 255, 255, 1)",
      type: "text",
      font: "bold 15px sans-serif",
      textAlign: "center",
      textBaseline: "middle"
    };
    var gbpScoreLabel = {
      name: "gbpScoreLabel",
      x: 160, 
      y: 380, 
      width: 88, 
      height: 20,
      color: "rgba(255, 255, 255, 1)",
      type: "text",
      font: "bold 10px sans-serif",
      textAlign: "center",
      textBaseline: "middle",
      content: "GBP"
    };
    var usdScoreLabel = {
      name: "usdScoreLabel",
      x: 248, 
      y: 380, 
      width: 88, 
      height: 20,
      color: "rgba(255, 255, 255, 1)",
      type: "text",
      font: "bold 10px sans-serif",
      textAlign: "center",
      textBaseline: "middle",
      content: "USD"
    };
    var brlScoreLabel = {
      name: "brlScoreLabel",
      x: 336, 
      y: 380, 
      width: 88, 
      height: 20,
      color: "rgba(255, 255, 255, 1)",
      type: "text",
      font: "bold 10px sans-serif",
      textAlign: "center",
      textBaseline: "middle",
      content: "BRL"
    };
    var audScoreLabel = {
      name: "audScoreLabel",
      x: 424, 
      y: 380, 
      width: 88, 
      height: 20,
      color: "rgba(255, 255, 255, 1)",
      type: "text",
      font: "bold 10px sans-serif",
      textAlign: "center",
      textBaseline: "middle",
      content: "AUD"
    };
    var egpScoreLabel = {
      name: "egpScoreLabel",
      x: 512, 
      y: 380, 
      width: 88, 
      height: 20,
      color: "rgba(255, 255, 255, 1)",
      type: "text",
      font: "bold 10px sans-serif",
      textAlign: "center",
      textBaseline: "middle",
      content: "EGP"
    };
    game.objects.push(gbpScore);
    game.objects.push(usdScore);
    game.objects.push(brlScore);
    game.objects.push(audScore);
    game.objects.push(egpScore);
    game.objects.push(gbpScoreLabel);
    game.objects.push(usdScoreLabel);
    game.objects.push(brlScoreLabel);
    game.objects.push(audScoreLabel);
    game.objects.push(egpScoreLabel);

  }

}



