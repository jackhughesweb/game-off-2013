(function(){

  // Setup requestAnimationFrame
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;

})();

// Global game object containing resources
var game = {
  objects: [ 
    {
      name: "player"
    }
  ],
  levels: [
  ],
  level: {
    number: 0
  },
  images: []
};

var skiptoend = false;

// Array containing pressed keys
var keys = [];

// Load levels from JSON files
function loadLevels(){
  $.getJSON('level1.json', function(data){
    game.levels[1] = data;
    // Preload images and store in images object
    for(var i = 0; i <= game.levels[1].buildings.length - 1; i++){
      if(game.levels[1].buildings[i].type == "image"){
        game.images[game.levels[1].buildings[i].name] = document.createElement("img"); 
        game.images[game.levels[1].buildings[i].name].src = game.levels[1].buildings[i].src;
      }
    };
    $.getJSON('level2.json', function(data){
      game.levels[2] = data;
      // Preload images and store in images object
      for(var i = 0; i <= game.levels[2].buildings.length - 1; i++){
        if(game.levels[2].buildings[i].type == "image"){
          game.images[game.levels[2].buildings[i].name] = document.createElement("img"); 
          game.images[game.levels[2].buildings[i].name].src = game.levels[2].buildings[i].src;
        }
      };
      $.getJSON('level3.json', function(data){
        game.levels[3] = data;
        // Preload images and store in images object
        for(var i = 0; i <= game.levels[3].buildings.length - 1; i++){
          if(game.levels[3].buildings[i].type == "image"){
            game.images[game.levels[3].buildings[i].name] = document.createElement("img"); 
            game.images[game.levels[3].buildings[i].name].src = game.levels[3].buildings[i].src;
          }
        };
        $.getJSON('level4.json', function(data){
          game.levels[4] = data;
          // Preload images and store in images object
          for(var i = 0; i <= game.levels[4].buildings.length - 1; i++){
            if(game.levels[4].buildings[i].type == "image"){
              game.images[game.levels[4].buildings[i].name] = document.createElement("img"); 
              game.images[game.levels[4].buildings[i].name].src = game.levels[4].buildings[i].src;
            }
          };
          $.getJSON('level5.json', function(data){
            game.levels[5] = data;
            // Preload images and store in images object
            for(var i = 0; i <= game.levels[5].buildings.length - 1; i++){
              if(game.levels[5].buildings[i].type == "image"){
                game.images[game.levels[5].buildings[i].name] = document.createElement("img"); 
                game.images[game.levels[5].buildings[i].name].src = game.levels[5].buildings[i].src;
              }
            };
            // Start the game!
            init();
          });
        });
      });
    });
  });
}

function init(){

  // Self explanatory
  var canvas = document.getElementById('canvas');

  if(canvas.getContext){

    var ctx = canvas.getContext('2d');

    // Canvas click, run clickObj
    canvas.addEventListener('click', function(e){
      var canvas = document.getElementById('canvas');
      var x;
      var y;
      x = e.x - canvas.offsetLeft;
      y = e.y - canvas.offsetTop;
      clickObj(x, y);
    }, false);

    // Key press
    document.body.addEventListener("keydown", function(e) {
      keys[e.keyCode] = true;
    });
     
    document.body.addEventListener("keyup", function(e) {
      keys[e.keyCode] = false;
    });

    // Main screen - play button
    var playButton = {
      name: "playButton",
      x: 100, 
      y: 175, 
      width: 400, 
      height: 50,
      color: "rgba(200, 0, 0, 1)",
      type: "rect",
      click: play
    };
    // Add to main screen
    game.objects.push(playButton);

    // Main screen - play button text
    var playButtonText = {
      name: "playButtonText",
      x: 100, 
      y: 175, 
      width: 400, 
      height: 50,
      color: "rgba(255, 255, 255, 1)",
      type: "text",
      content: "Play",
      font: "bold 30px sans-serif",
      textAlign: "center",
      textBaseline: "middle"
    };
    // Add to main screen
    game.objects.push(playButtonText);

    // Main screen - title
    var titleText = {
      name: "titleText",
      x: 100, 
      y: 105, 
      width: 400, 
      height: 50,
      color: "rgba(0, 0, 0, 1)",
      type: "text",
      content: "Travel Money",
      font: "bold 40px sans-serif",
      textAlign: "center",
      textBaseline: "middle"
    };
    // Add to main screen
    game.objects.push(titleText);

    // Start update loop using requestAnimationFrame
    window.requestAnimationFrame(update);

    // Timer for game clock
    setInterval(function(){
      if(skiptoend){
        endGame();
      }
      // Check a level is in progress
      if(game.playing){
        // Increment time
        if(game.level.number != 5){
          game.time += 1;
        }else{
          game.time += 3;
        }
        // Stop clock after 20:00
        if(game.time > 1200){
          game.time = 1200;
          game.playing = false;
          if(game.level.number < 5){
            // Main screen - play button
            var nextLevelButton = {
              name: "nextLevelButton",
              x: 100, 
              y: 175, 
              width: 400, 
              height: 50,
              color: "rgba(200, 0, 0, 1)",
              type: "rect",
              click: playNext
            };
            // Add to main screen
            game.objects.push(nextLevelButton);
            // Main screen - play button text
            var nextLevelButtonText = {
              name: "nextLevelButtonText",
              x: 100, 
              y: 175, 
              width: 400, 
              height: 50,
              color: "rgba(255, 255, 255, 1)",
              type: "text",
              content: "Play Next Level",
              font: "bold 30px sans-serif",
              textAlign: "center",
              textBaseline: "middle"
            };
            // Add to main screen
            game.objects.push(nextLevelButtonText);
          }else{
            // Main screen - play button
            var convertMoneyButton = {
              name: "convertMoneyButton",
              x: 100, 
              y: 175, 
              width: 400, 
              height: 50,
              color: "rgba(200, 0, 0, 1)",
              type: "rect",
              click: endGame
            };
            // Add to main screen
            game.objects.push(convertMoneyButton);
            // Main screen - play button text
            var convertMoneyButton = {
              name: "convertMoneyButton",
              x: 100, 
              y: 175, 
              width: 400, 
              height: 50,
              color: "rgba(255, 255, 255, 1)",
              type: "text",
              content: "Convert my money!",
              font: "bold 30px sans-serif",
              textAlign: "center",
              textBaseline: "middle"
            };
            // Add to main screen
            game.objects.push(convertMoneyButton);
          }
        }
      }
    }, 50);

  }

  function update(){

    if(game.level.number != 5){
      // Clear canvas
      ctx.fillStyle = "rgb(216, 216, 216)";
      ctx.fillRect(0, 0, 600, 400);
    }else{
      ctx.fillStyle = "rgb(230, 184, 92)";
      ctx.fillRect(0, 0, 600, 400);
    }

    var canvas = document.getElementById("canvas");

    // Update scorebar and check for player collisions
    for(var i = 0; i <= game.objects.length - 1; i++){
      updateContent(i);
    };

    // Draw level buildings
    if(game.level.number > 0){
      for(var i = 0; i <= game.levels[game.level.number].buildings.length - 1; i++){
        if(game.levels[game.level.number].buildings[i].type == "image"){
          // Draw images
          ctx.drawImage(game.images[game.levels[game.level.number].buildings[i].name], game.levels[game.level.number].buildings[i].x, game.levels[game.level.number].buildings[i].y);
        }else{
          // Draw rectangles
          ctx.fillStyle = game.levels[game.level.number].buildings[i].color;
          ctx.fillRect(game.levels[game.level.number].buildings[i].x, game.levels[game.level.number].buildings[i].y, game.levels[game.level.number].buildings[i].width, game.levels[game.level.number].buildings[i].height);
        }
      };
      if(game.playing){
        // Draw coin
        ctx.beginPath();
        ctx.arc(game.levels[game.level.number].coins[game.levels[game.level.number].coin.number].x, game.levels[game.level.number].coins[game.levels[game.level.number].coin.number].y, 10, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'yellow';
        ctx.fill();
        ctx.stroke();
      }
    }

    // Draw objects (non level-specific, eg. player and scorebar)
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

    // Loop update
    window.requestAnimationFrame(update);
  }

  function updateContent(i){
    // Update game clock
    if(game.objects[i].name == "time"){
      if(Math.floor(game.time / 60) < 10){
        game.objects[i].content = "0" + Math.floor(game.time / 60) + ":"
      }else{
        game.objects[i].content = Math.floor(game.time / 60) + ":"
      }
      
      if(game.time % 60 < 10){
        game.objects[i].content = game.objects[i].content + "0" + game.time % 60
      }else{
        game.objects[i].content = game.objects[i].content + game.time % 60
      }
    }
    // Update city name and number
    if(game.objects[i].name == "levelNumber"){
      game.objects[i].content = "City " + game.level.number;
    }
    if(game.objects[i].name == "levelName"){
      game.objects[i].content = game.level.name;
    }
    // Update score
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
    // Conversions
    var score = 0;
    if(game.objects[i].name == "usdScoreToGBP"){
      score = game.score.usd.toFixed(2) * 0.62;
      game.objects[i].content = "£" + score.toFixed(2);
    }
    if(game.objects[i].name == "brlScoreToGBP"){
      score = game.score.brl.toFixed(2) * 0.27;
      game.objects[i].content = "£" + score.toFixed(2);
    }
    if(game.objects[i].name == "audScoreToGBP"){
      score = game.score.aud.toFixed(2) * 0.57;
      game.objects[i].content = "£" + score.toFixed(2);
    }
    if(game.objects[i].name == "egpScoreToGBP"){
      score = game.score.egp.toFixed(2) * 0.09;
      game.objects[i].content = "£" + score.toFixed(2);
    }
    if(game.objects[i].name == "totalGBP"){
      var gbpscore = game.score.gbp.toFixed(2) * 1;
      var usdscore = game.score.usd.toFixed(2) * 0.62;
      var brlscore = game.score.brl.toFixed(2) * 0.27;
      var audscore = game.score.aud.toFixed(2) * 0.57;
      var egpscore = game.score.egp.toFixed(2) * 0.09;
      var finalscore = parseFloat(gbpscore.toFixed(2)) + parseFloat(usdscore.toFixed(2)) + parseFloat(brlscore.toFixed(2)) + parseFloat(audscore.toFixed(2)) + parseFloat(egpscore.toFixed(2));
      game.objects[i].content = "£" + finalscore.toFixed(2);
    }
    // Check for collisions and move player
    if(game.objects[i].name == "player"){
      var playerX, playerY, playerHeight, playerWidth, playerSpeed;

      playerX = game.objects[i].x;
      playerY = game.objects[i].y;
      
      playerSpeed = game.objects[i].speed;
      playerVelX = game.objects[i].velX;
      playerVelY = game.objects[i].velX;

      playerHeight = game.objects[i].height;
      playerWidth = game.objects[i].width;

      // Down arrow - move down
      if(keys[40] && playerVelY < playerSpeed && game.playing){
        game.objects[i].velY++;
      }
      // Up arrow - move up
      if(keys[38] && playerVelY > -playerSpeed && game.playing){
        game.objects[i].velY--;
      }
      // Right arrow - move right
      if(keys[39] && playerVelX < playerSpeed && game.playing){
        game.objects[i].velX++;    
      }    
      // Left arrow - move left     
      if(keys[37] && playerVelX > -playerSpeed && game.playing){                 
        game.objects[i].velX--;
      }

      if(game.level.number > 0 && game.playing){

        var coincollision = false;
        var previousrand = game.levels[game.level.number].coin.number;
        var nextrand = game.levels[game.level.number].coin.number; 
        var looprand = true;
        // Choose a random number which is not the same as the last for the coin
        while(looprand){
          nextrand = Math.floor(Math.random() * (game.levels[game.level.number].coins.length));
          if(nextrand != previousrand){
            looprand = false;
          }
        }

        // Coin collision detection
        if(game.levels[game.level.number].coins[game.levels[game.level.number].coin.number].x - 20 <= game.objects[i].x + game.objects[i].velX && game.levels[game.level.number].coins[game.levels[game.level.number].coin.number].x + 20 > game.objects[i].x + game.objects[i].velX){
          if(game.levels[game.level.number].coins[game.levels[game.level.number].coin.number].y - 20 <= game.objects[i].y + game.objects[i].velY && game.levels[game.level.number].coins[game.levels[game.level.number].coin.number].y + 20 > game.objects[i].y + game.objects[i].velY){
            coincollision = true;
          }
        }

        if(coincollision){
          // Increment score
          switch(game.level.number){
            case 1:
              game.score.gbp += 1;
              break;
            case 2:
              game.score.usd += 2;
              break;
            case 3:
              game.score.brl += 4;
              break;
            case 4:
              game.score.aud += 2;
              break;
            case 5:
              game.score.egp += 10;
              break;
          }
          // Change coin number
          game.levels[game.level.number].coin.number = nextrand;
        }
      }

      if(game.level.number > 0){
        var friction = 0.8;
        // Decrease the velocity
        game.objects[i].velX *= friction;
        game.objects[i].velY *= friction;
        // Init collision vars
        var collisionX = false;
        var collisionY = false;
        // Complex collision detection
        for(var y = 0; y <= game.levels[game.level.number].buildings.length - 1; y++){
          if(game.levels[game.level.number].buildings[y].x <= game.objects[i].x + game.objects[i].velX && game.levels[game.level.number].buildings[y].x + game.levels[game.level.number].buildings[y].width > game.objects[i].x + game.objects[i].velX && game.levels[game.level.number].buildings[y].collide){
            if(game.levels[game.level.number].buildings[y].y <= game.objects[i].y + game.objects[i].velY && game.levels[game.level.number].buildings[y].y + game.levels[game.level.number].buildings[y].height > game.objects[i].y + game.objects[i].velY){
              collisionY = true;
              collisionX = true;
              game.objects[i].velX = 0;
              game.objects[i].velY = 0;
            }
            if(game.levels[game.level.number].buildings[y].y < game.objects[i].y + game.objects[i].velY + game.objects[i].height && game.levels[game.level.number].buildings[y].y + game.levels[game.level.number].buildings[y].height > game.objects[i].y + game.objects[i].velY + game.objects[i].height){
              collisionY = true;
              collisionX = true;
              game.objects[i].velX = 0;
              game.objects[i].velY = 0;
            }
          }
          if(game.levels[game.level.number].buildings[y].x <= game.objects[i].x + game.objects[i].velX + game.objects[i].width && game.levels[game.level.number].buildings[y].x + game.levels[game.level.number].buildings[y].width > game.objects[i].x + game.objects[i].velX + game.objects[i].width && game.levels[game.level.number].buildings[y].collide){
            if(game.levels[game.level.number].buildings[y].y <= game.objects[i].y + game.objects[i].velY && game.levels[game.level.number].buildings[y].y + game.levels[game.level.number].buildings[y].height > game.objects[i].y + game.objects[i].velY){
              collisionY = true;
              collisionX = true;
              game.objects[i].velX = 0;
              game.objects[i].velY = 0;
            }
            if(game.levels[game.level.number].buildings[y].y <= game.objects[i].y + game.objects[i].velY + game.objects[i].height && game.levels[game.level.number].buildings[y].y + game.levels[game.level.number].buildings[y].height > game.objects[i].y + game.objects[i].velY + game.objects[i].height){
              collisionY = true;
              collisionX = true;
              game.objects[i].velX = 0;
              game.objects[i].velY = 0;
            }
          }

          if(game.levels[game.level.number].buildings[y].y <= game.objects[i].y + game.objects[i].velY && game.levels[game.level.number].buildings[y].y + game.levels[game.level.number].buildings[y].height > game.objects[i].y + game.objects[i].velY && game.levels[game.level.number].buildings[y].collide){
            if(game.levels[game.level.number].buildings[y].x <= game.objects[i].x + game.objects[i].velX && game.levels[game.level.number].buildings[y].x + game.levels[game.level.number].buildings[y].width > game.objects[i].x + game.objects[i].velX){
              collisionY = true;
              collisionX = true;
              game.objects[i].velX = 0;
              game.objects[i].velY = 0;
            } 
            if(game.levels[game.level.number].buildings[y].x <= game.objects[i].x + game.objects[i].velX + game.objects[i].width && game.levels[game.level.number].buildings[y].x + game.levels[game.level.number].buildings[y].width > game.objects[i].x + game.objects[i].velX + game.objects[i].width){
              collisionY = true;
              collisionX = true;
              game.objects[i].velX = 0;
              game.objects[i].velY = 0;
            }
          }
          if(game.levels[game.level.number].buildings[y].y <= game.objects[i].y + game.objects[i].velY + game.objects[i].height && game.levels[game.level.number].buildings[y].y + game.levels[game.level.number].buildings[y].height > game.objects[i].y + game.objects[i].velY + game.objects[i].height && game.levels[game.level.number].buildings[y].collide){
            if(game.levels[game.level.number].buildings[y].x <= game.objects[i].x + game.objects[i].velX && game.levels[game.level.number].buildings[y].x + game.levels[game.level.number].buildings[y].width > game.objects[i].x + game.objects[i].velX){
              collisionY = true;
              collisionX = true;
              game.objects[i].velX = 0;
              game.objects[i].velY = 0;
            } 
            if(game.levels[game.level.number].buildings[y].x <= game.objects[i].x + game.objects[i].velX + game.objects[i].width && game.levels[game.level.number].buildings[y].x + game.levels[game.level.number].buildings[y].width > game.objects[i].x + game.objects[i].velX + game.objects[i].width){
              collisionY = true;
              collisionX = true;
              game.objects[i].velX = 0;
              game.objects[i].velY = 0;
            }
          }
        };
        // Move in x direction if not collided
        if(!collisionX){
          
          game.objects[i].x += game.objects[i].velX;

          if(game.objects[i].x < 0 ){
            game.objects[i].x = 0;
          }else if(game.objects[i].x > (canvas.width - playerWidth) ){
            game.objects[i].x = canvas.width - playerWidth;
          }
        }
        // Move in y direction if not collided
        if(!collisionY){
      
          game.objects[i].y += game.objects[i].velY;

          if(game.objects[i].y <= 0 ){
            game.objects[i].y = 0;
          }else if(game.objects[i].y >= (canvas.height - playerHeight) ){
            game.objects[i].y = canvas.height - playerHeight;
          }
        }
      }
    }
  }
  // Canvas click, detect object and run object's click function
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
  // Canvas remove object based upon name
  function removeObj(name){
    for(var i = 0; i <= game.objects.length - 1; i++){
      if(game.objects[i].name == name){
        game.objects.splice(i, 1);
      }
    };
  }
  // Play button pressed
  function play(i){
    // Init player
    for(var i = 0; i <= game.objects.length - 1; i++){
      if(game.objects[i].name == "player"){
      
        var canvas = document.getElementById("canvas");

        var playerWidth = 10;
        var playerHeight = 10;

        game.objects[i].x = (canvas.width / 2) - (playerWidth / 2);
        game.objects[i].y = 327;
        game.objects[i].velX = 0;
        game.objects[i].velY = 0;
        game.objects[i].speed = 10;
        game.objects[i].width = playerWidth;
        game.objects[i].height = playerHeight;
        game.objects[i].color = "rgba(0, 0, 0, 0.5)";
        game.objects[i].type = "rect";
        
      }
    };
    // Create scorebar
    initScorebar();
    // Remove objects from main screen
    removeObj("playButton");
    removeObj("playButtonText");
    removeObj("titleText");
  }

  function initScorebar(){
    // Left side of scorebar with time and location
    var lightBar = {
      name: "lightBar",
      x: 0, 
      y: 350, 
      width: 160, 
      height: 50,
      color: "rgba(0, 0, 0, 0.5)",
      type: "rect"
    };
    // Right side of scorebar with scores
    var darkBar = {
      name: "darkBar",
      x: 160, 
      y: 350, 
      width: 440, 
      height: 50,
      color: "rgba(0, 0, 0, 0.8)",
      type: "rect"
    };
    // Add to canvas
    game.objects.push(lightBar);
    game.objects.push(darkBar);
    // Time label
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
    // Level Number label
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
    // Level Name label
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
    // Score, Time, Playing and Level vars init
    game.score = {
      gbp: 0.00,
      usd: 0.00,
      brl: 0.00,
      aud: 0.00,
      egp: 0.00
    };
    game.time = 420;
    game.playing = true;
    game.level = {
      number: 1,
      name: "London"
    };
    // Score labels
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
    // Add scores and score labels to canvas
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

  function playNext(){
    if(game.level.number < 5){
      removeObj("nextLevelButton");
      removeObj("nextLevelButtonText");
      game.level.number += 1;
      for(var i = 0; i <= game.objects.length - 1; i++){
        if(game.objects[i].name == "player"){

          game.objects[i].x = game.levels[game.level.number].startingpos.x;
          game.objects[i].y = game.levels[game.level.number].startingpos.y;
          game.objects[i].velX = 0;
          game.objects[i].velY = 0;
          
        }
      };
      game.time = 420;
      game.playing = true;
      game.level = {
        number: game.level.number,
        name: game.levels[game.level.number].name
      };
    }
  }

  function endGame(){
    game.level.number = 0;
    game.playing = false;
    game.objects = [];

    var gbpScore = {
      name: "gbpScore",
      x: 50, 
      y: 50, 
      width: 200, 
      height: 22,
      color: "rgba(0, 0, 0, 1)",
      type: "text",
      content: "",
      font: "20px sans-serif",
      textAlign: "center",
      textBaseline: "middle"
    };
    game.objects.push(gbpScore);
    var gbpScoreLabel = {
      name: "gbpScoreLabel",
      x: 50, 
      y: 72, 
      width: 200, 
      height: 12,
      color: "rgba(0, 0, 0, 1)",
      type: "text",
      content: "GBP",
      font: "10px sans-serif",
      textAlign: "center",
      textBaseline: "middle"
    };
    game.objects.push(gbpScoreLabel);

    var usdScore = {
      name: "usdScore",
      x: 50, 
      y: 106, 
      width: 200, 
      height: 22,
      color: "rgba(0, 0, 0, 1)",
      type: "text",
      content: "",
      font: "20px sans-serif",
      textAlign: "center",
      textBaseline: "middle"
    };
    game.objects.push(usdScore);
    var usdScoreLabel = {
      name: "usdScoreLabel",
      x: 50, 
      y: 130, 
      width: 200, 
      height: 12,
      color: "rgba(0, 0, 0, 1)",
      type: "text",
      content: "USD",
      font: "10px sans-serif",
      textAlign: "center",
      textBaseline: "middle"
    };
    game.objects.push(usdScoreLabel);

    var brlScore = {
      name: "brlScore",
      x: 50, 
      y: 164, 
      width: 200, 
      height: 22,
      color: "rgba(0, 0, 0, 1)",
      type: "text",
      content: "",
      font: "20px sans-serif",
      textAlign: "center",
      textBaseline: "middle"
    };
    game.objects.push(brlScore);
    var brlScoreLabel = {
      name: "brlScoreLabel",
      x: 50, 
      y: 188, 
      width: 200, 
      height: 12,
      color: "rgba(0, 0, 0, 1)",
      type: "text",
      content: "BRL",
      font: "10px sans-serif",
      textAlign: "center",
      textBaseline: "middle"
    };
    game.objects.push(brlScoreLabel);

    var audScore = {
      name: "audScore",
      x: 50, 
      y: 222, 
      width: 200, 
      height: 22,
      color: "rgba(0, 0, 0, 1)",
      type: "text",
      content: "",
      font: "20px sans-serif",
      textAlign: "center",
      textBaseline: "middle"
    };
    game.objects.push(audScore);
    var audScoreLabel = {
      name: "audScoreLabel",
      x: 50, 
      y: 246, 
      width: 200, 
      height: 12,
      color: "rgba(0, 0, 0, 1)",
      type: "text",
      content: "AUD",
      font: "10px sans-serif",
      textAlign: "center",
      textBaseline: "middle"
    };
    game.objects.push(audScoreLabel);

    var egpScore = {
      name: "egpScore",
      x: 50, 
      y: 280, 
      width: 200, 
      height: 22,
      color: "rgba(0, 0, 0, 1)",
      type: "text",
      content: "",
      font: "20px sans-serif",
      textAlign: "center",
      textBaseline: "middle"
    };
    game.objects.push(egpScore);
    var egpScoreLabel = {
      name: "egpScoreLabel",
      x: 50, 
      y: 304, 
      width: 200, 
      height: 12,
      color: "rgba(0, 0, 0, 1)",
      type: "text",
      content: "EGP",
      font: "10px sans-serif",
      textAlign: "center",
      textBaseline: "middle"
    };
    game.objects.push(egpScoreLabel);

    var equals1Label = {
      name: "equals1Label",
      x: 200, 
      y: 48, 
      width: 200, 
      height: 22,
      color: "rgba(0, 0, 0, 1)",
      type: "text",
      content: "=",
      font: "20px sans-serif",
      textAlign: "center",
      textBaseline: "middle"
    };
    game.objects.push(equals1Label);

    var equals2Label = {
      name: "equals2Label",
      x: 200, 
      y: 106, 
      width: 200, 
      height: 22,
      color: "rgba(0, 0, 0, 1)",
      type: "text",
      content: "=",
      font: "20px sans-serif",
      textAlign: "center",
      textBaseline: "middle"
    };
    game.objects.push(equals2Label);

    var equals3Label = {
      name: "equals3Label",
      x: 200, 
      y: 164, 
      width: 200, 
      height: 22,
      color: "rgba(0, 0, 0, 1)",
      type: "text",
      content: "=",
      font: "20px sans-serif",
      textAlign: "center",
      textBaseline: "middle"
    };
    game.objects.push(equals3Label);
    
    var equals4Label = {
      name: "equals4Label",
      x: 200, 
      y: 222, 
      width: 200, 
      height: 22,
      color: "rgba(0, 0, 0, 1)",
      type: "text",
      content: "=",
      font: "20px sans-serif",
      textAlign: "center",
      textBaseline: "middle"
    };
    game.objects.push(equals4Label);

    var equals5Label = {
      name: "equals5Label",
      x: 200, 
      y: 280, 
      width: 200, 
      height: 22,
      color: "rgba(0, 0, 0, 1)",
      type: "text",
      content: "=",
      font: "20px sans-serif",
      textAlign: "center",
      textBaseline: "middle"
    };
    game.objects.push(equals5Label);

    var gbpScore = {
      name: "gbpScore",
      x: 350, 
      y: 50, 
      width: 200, 
      height: 22,
      color: "rgba(0, 0, 0, 1)",
      type: "text",
      content: "",
      font: "20px sans-serif",
      textAlign: "center",
      textBaseline: "middle"
    };
    game.objects.push(gbpScore);
    var gbpScoreLabel = {
      name: "gbpScoreLabel",
      x: 350, 
      y: 72, 
      width: 200, 
      height: 12,
      color: "rgba(0, 0, 0, 1)",
      type: "text",
      content: "GBP",
      font: "10px sans-serif",
      textAlign: "center",
      textBaseline: "middle"
    };
    game.objects.push(gbpScoreLabel);

    var usdScoreToGBP = {
      name: "usdScoreToGBP",
      x: 350, 
      y: 106, 
      width: 200, 
      height: 22,
      color: "rgba(0, 0, 0, 1)",
      type: "text",
      content: "",
      font: "20px sans-serif",
      textAlign: "center",
      textBaseline: "middle"
    };
    game.objects.push(usdScoreToGBP);
    var usdScoreToGBPLabel = {
      name: "usdScoreToGBPLabel",
      x: 350, 
      y: 130, 
      width: 200, 
      height: 12,
      color: "rgba(0, 0, 0, 1)",
      type: "text",
      content: "GBP",
      font: "10px sans-serif",
      textAlign: "center",
      textBaseline: "middle"
    };
    game.objects.push(usdScoreToGBPLabel);

    var brlScoreToGBP = {
      name: "brlScoreToGBP",
      x: 350, 
      y: 164, 
      width: 200, 
      height: 22,
      color: "rgba(0, 0, 0, 1)",
      type: "text",
      content: "",
      font: "20px sans-serif",
      textAlign: "center",
      textBaseline: "middle"
    };
    game.objects.push(brlScoreToGBP);
    var brlScoreToGBPLabel = {
      name: "brlScoreToGBPLabel",
      x: 350, 
      y: 188, 
      width: 200, 
      height: 12,
      color: "rgba(0, 0, 0, 1)",
      type: "text",
      content: "GBP",
      font: "10px sans-serif",
      textAlign: "center",
      textBaseline: "middle"
    };
    game.objects.push(brlScoreToGBPLabel);

    var audScoreToGBP = {
      name: "audScoreToGBP",
      x: 350, 
      y: 222, 
      width: 200, 
      height: 22,
      color: "rgba(0, 0, 0, 1)",
      type: "text",
      content: "",
      font: "20px sans-serif",
      textAlign: "center",
      textBaseline: "middle"
    };
    game.objects.push(audScoreToGBP);
    var audScoreToGBPLabel = {
      name: "audScoreLabelToGBP",
      x: 350, 
      y: 246, 
      width: 200, 
      height: 12,
      color: "rgba(0, 0, 0, 1)",
      type: "text",
      content: "GBP",
      font: "10px sans-serif",
      textAlign: "center",
      textBaseline: "middle"
    };
    game.objects.push(audScoreToGBPLabel);

    var egpScoreToGBP = {
      name: "egpScoreToGBP",
      x: 350, 
      y: 280, 
      width: 200, 
      height: 22,
      color: "rgba(0, 0, 0, 1)",
      type: "text",
      content: "",
      font: "20px sans-serif",
      textAlign: "center",
      textBaseline: "middle"
    };
    game.objects.push(egpScoreToGBP);
    var egpScoreToGBPLabel = {
      name: "egpScoreToGBPLabel",
      x: 350, 
      y: 304, 
      width: 200, 
      height: 12,
      color: "rgba(0, 0, 0, 1)",
      type: "text",
      content: "GBP",
      font: "10px sans-serif",
      textAlign: "center",
      textBaseline: "middle"
    };
    game.objects.push(egpScoreToGBPLabel);

    var totalGBP = {
      name: "totalGBP",
      x: 350, 
      y: 340, 
      width: 200, 
      height: 22,
      color: "rgba(0, 0, 0, 1)",
      type: "text",
      content: "",
      font: "20px sans-serif",
      textAlign: "center",
      textBaseline: "middle"
    };
    game.objects.push(totalGBP);
    var totalGBPCurrLabel = {
      name: "totalGBPCurrLabel",
      x: 350, 
      y: 364, 
      width: 200, 
      height: 12,
      color: "rgba(0, 0, 0, 1)",
      type: "text",
      content: "GBP",
      font: "10px sans-serif",
      textAlign: "center",
      textBaseline: "middle"
    };
    game.objects.push(totalGBPCurrLabel);

    var totalGBPCurrLabel = {
      name: "totalGBPCurrLabel",
      x: 200, 
      y: 340, 
      width: 200, 
      height: 36,
      color: "rgba(0, 0, 0, 1)",
      type: "text",
      content: "Total",
      font: "bold 20px sans-serif",
      textAlign: "left",
      textBaseline: "middle"
    };
    game.objects.push(totalGBPCurrLabel);
  }

}



