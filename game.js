(function(){

  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;

})();

var game = {
  objects: []
};

function init(){

  var canvas = document.getElementById('canvas');

  if(canvas.getContext){

    var ctx = canvas.getContext('2d');

    canvas.addEventListener('click', function(e){
      clickObj(ctx, e.x, e.y);
    }, false);

    newObj(200, 175, 200, 50, "rgba(200, 0, 0, 0.5)", "rect", "rect", play);
    newObj(200, 175, 200, 50, "rgba(255, 255, 255, 1)", "text", "Play");

    redrawObj(ctx);

  }
}

function newObj(objX, objY, objWidth, objHeight, objColor, objType, objContent, objFunc){
  var object = {
    x: objX, 
    y: objY, 
    width: objWidth, 
    height: objHeight,
    color: objColor,
    type: objType,
    content: objContent,
    func: objFunc
  };
  game.objects.push(object);
}

function redrawObj(ctx){
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.fillRect(0, 0, 600, 400);
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
}

function clickObj(ctx, clickX, clickY){
  for(var i = 0; i <= game.objects.length - 1; i++){
    if(game.objects[i].x <= clickX && game.objects[i].x + game.objects[i].width >= clickX){
      if(game.objects[i].y <= clickY && game.objects[i].y + game.objects[i].height >= clickY){
        if(game.objects[i].func){
          game.objects[i].func(ctx, i);
        }
      }
    }
  };
}

function play(ctx, i){
  console.log("play");
  game.objects.splice(i, 1);
  redrawObj(ctx);
}

