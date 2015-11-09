
(function(){

  var canvas = document.getElementById("canvas"),
      canvasController = new App.CanvasController(canvas);

  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;

})();