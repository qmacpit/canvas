(function(){
  
  var NO_OF_POINTS = 3;

  var CanvasController = function(canvasElement) {
    this._canvasElement = canvasElement;
    this._points = [];
    this._canvasElement.addEventListener('click', this.onCanvasClicked.bind(this));
  };

  CanvasController.prototype.onCanvasClicked = function(event) {
    if (this._points.length < NO_OF_POINTS) {
      var point  = new App.Point(event.pageX, event.pageY);
      point.draw(this._canvasElement.getContext('2d'));
      this._points.push(point);
    }
  }

  CanvasController.prototype.evaluatePoint = function() {

  };

  App.CanvasController = CanvasController;

})();

