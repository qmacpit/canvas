(function(){
  
  var NO_OF_POINTS = 3;

  var CanvasController = function(canvasElement) {
    this._stage = new createjs.Stage(canvasElement);    
    this._points = [];
    this._pointPositions = [];
    canvasElement.addEventListener('click', this.onCanvasClicked.bind(this));
    // this._stage.on('mousedown', this.onCanvasClicked.bind(this));
  };  

  CanvasController.prototype.onCanvasClicked = function(event) {
    console.log("canvas clicked")
    if (this._points.length < NO_OF_POINTS) {
      var point  = new App.Point({        
        x: event.pageX,
        y: event.pageY,
        stage: this._stage,
        onPointPositionChanged: function(index) {
          return function(x, y) {
            this.pointPositionChanged(index, x, y);
          }.bind(this)
        }.call(this, this._points.length)
      });
      point.draw(this._stage);
      this._points.push(point);
      this._pointPositions.push({
        x: event.pageX,
        y: event.pageY
      });
      if (this._pointPositions.length === NO_OF_POINTS) {
        this.evaluateRemainingPoint();
        this.drawLines();     
      }
    }
  }

  CanvasController.prototype.pointPositionChanged = function(id, x, y) {    
    this._pointPositions[id] = {
      x: x,
      y: y
    };
    this.evaluateRemainingPoint();   
    this.drawLines(); 
  };

  CanvasController.prototype.evaluateRemainingPoint = function() {
    var remainingPoint = App.Calculator.calculateRemainingPoint(this._pointPositions);
    if (this._remainingPoint)
      this._remainingPoint.remove();
    this._remainingPoint  = new App.Point({        
      x: remainingPoint.x,
      y: remainingPoint.y,
      stage: this._stage,        
    });
    this._remainingPoint.draw(this._stage);
  };

  CanvasController.prototype.drawLines = function() {
    var line = new App.Line({
      start: this._pointPositions[0],
      end: this._pointPositions[1],
      stage: this._stage
    });
    line.draw();
  }

  App.CanvasController = CanvasController;

})();

