
(function(){

  var canvas = document.getElementById("canvas"),
      canvasController;

  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  canvasController = new App.CanvasController(canvas);

})();