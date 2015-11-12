(function(){
  
  var NO_OF_POINTS = 3;

  var CanvasController = function(canvasElement) {
    this._points = [];
    this._lines = [];
    this._pointPositions = [];
    this._calculator = new App.Calculator(canvasElement.width, canvasElement.height);
    this._legendController = new App.LegendController();
    
    this._preapreStage(canvasElement);
  };  

  function _buildPointData(x, y) {
    return "(" + x + "," + y + ")";
  }

  CanvasController.prototype._preapreStage = function(canvasElement) {
    this._stage = new createjs.Stage(canvasElement);    
    this.background = new createjs.Shape();
    this.background
      .graphics
      .beginFill("#fff")
      .drawRoundRect(0, 0, canvasElement.width, canvasElement.height, 10);
    this._stage.stage.addChild(this.background);
    this.background.on("click", this.onCanvasClicked.bind(this), null, false, null, false);
    this._stage.update();
  };

  CanvasController.prototype._drawSingleLine = function(index, start, stop) {
    var line = this._lines[index];
    if (!line) {      
      line = new App.Line({
        start: start,
        end: stop,
        stage: this._stage
      });
      this._lines[index] = line;
      line.draw();
    } else {
      line.redraw(start, stop);
    }
  };

  CanvasController.prototype.onCanvasClicked = function(event) {    
    if (this._points.length < NO_OF_POINTS) {
      var point  = new App.Point({        
        x: event.stageX,
        y: event.stageY,
        stage: this._stage,
        onPointPositionChanged: function(index) {
          return function(x, y) {
            this.pointPositionChanged(index, x, y);
          }.bind(this);
        }.call(this, this._points.length)
      });
      point.draw(this._stage);
      this._legendController.report("p" + this._points.length, _buildPointData(event.stageX, event.stageY));
      this._points.push(point);
      this._pointPositions.push({
        x: event.stageX,
        y: event.stageY
      });
      if (this._pointPositions.length === NO_OF_POINTS) {
        this.evaluateRemainingPoint();        
      }
    }
  };

  CanvasController.prototype.pointPositionChanged = function(id, x, y) {    
    this._legendController.report(
        "p" + id, 
        _buildPointData(x, y)
      );
    this._pointPositions[id] = {
      x: x,
      y: y
    };
    if (this._pointPositions.length === NO_OF_POINTS) {
      this.evaluateRemainingPoint();   
    }
  };

  CanvasController.prototype.evaluateRemainingPoint = function() {
    var remainingPoint = this._calculator.calculateRemainingPoint(this._pointPositions);
    if (remainingPoint) {      
      this._legendController.report(
        "p3", 
        _buildPointData(remainingPoint.rPoint.x, remainingPoint.rPoint.y)
      );
      this._legendController.report(
        "rectArea", 
        remainingPoint.area
      ); 
      this.drawLines(remainingPoint); 
      this.drawCentreOfMass(remainingPoint);            
    }
  };  

  CanvasController.prototype.drawLines = function(remainingPoint) {
    if (remainingPoint) {
      var strategy = remainingPoint.strategy;      
      this._drawSingleLine(0, this._pointPositions[strategy[0]], this._pointPositions[strategy[1]]);      
      this._drawSingleLine(1, this._pointPositions[strategy[0]], this._pointPositions[strategy[2]]);
      this._drawSingleLine(2, remainingPoint.rPoint, this._pointPositions[strategy[1]]);      
      this._drawSingleLine(3, remainingPoint.rPoint, this._pointPositions[strategy[2]]);
    } else {      
      for (var i = 0, l = this._lines.length; i < l; i++)
        this._lines[0].remove();
    }    
  };

  CanvasController.prototype.drawCentreOfMass = function(remainingPoint) {
    var centerPoint = this._calculator.findCentreOfMass(this._pointPositions, remainingPoint),
        radius = this._calculator.getRadius(remainingPoint.area);

    if (this._circle) {
      this._circle.redraw(centerPoint, radius)
    } else {
      this._circle = new App.Circle({
        stage: this._stage,
        point: centerPoint,
        radius: radius
      });
      this._circle.draw();    
    }    
    this._legendController.report(
      "circleArea", 
      this._calculator.calculateCircleArea(radius)
    );
  };

  App.CanvasController = CanvasController;

})();

