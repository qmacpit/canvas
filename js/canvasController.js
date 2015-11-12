(function(){
  
  var NO_OF_POINTS = 3;

  var CanvasController = function(canvasElement) {
    this._stage = new createjs.Stage("canvas");    
    this._points = [];
    this._lines = [];
    this._pointPositions = [];
    this._calculator = new App.Calculator(canvasElement.width, canvasElement.height);
    // canvasElement.addEventListener('click', this.onCanvasClicked.bind(this));
    // this._stage.on('click', this.onCanvasClicked.bind(this));
    console.log(this._stage.mouseChildren   )
    // this._stage.mouseChildren = false;

    this.background = new createjs.Shape();
    this.background.graphics.beginFill("white").drawRoundRect(0, 0, canvasElement.width, canvasElement.height, 10);
    this._stage.stage.addChild(this.background);
    this.background.on("click", this.onCanvasClicked.bind(this), null, false, null, false);
    // this.background.on("click", function(event){console.log("2a"); console.log(event)}, null, false, null, true);
    this._stage.update();
  };  

  CanvasController.prototype.onCanvasClicked = function(event) {
    //TODO: block this event
    console.log("canvas clicked")
    console.log(event.stageX)
    console.log(event.stageY)
    console.log(event)
    if (this._points.length < NO_OF_POINTS) {
      var point  = new App.Point({        
        x: event.stageX,
        y: event.stageY,
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
        x: event.stageX,
        y: event.stageY
      });
      if (this._pointPositions.length === NO_OF_POINTS) {
        this.evaluateRemainingPoint();        
      }
    }
  }

  CanvasController.prototype.pointPositionChanged = function(id, x, y) {    
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
      this.drawLines(remainingPoint); 
      this.drawCentreOfMass(remainingPoint);
    }
  };

  //TODO: move to prototype
  function _drawSingleLine(index, start, stop) {
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

  }

  CanvasController.prototype.drawLines = function(remainingPoint) {
    if (remainingPoint) {
      var strategy = remainingPoint.strategy;      
      _drawSingleLine.call(this, 0, this._pointPositions[strategy[0]], this._pointPositions[strategy[1]]);      
      _drawSingleLine.call(this, 1, this._pointPositions[strategy[0]], this._pointPositions[strategy[2]]);
      _drawSingleLine.call(this, 2, remainingPoint.rPoint, this._pointPositions[strategy[1]]);      
      _drawSingleLine.call(this, 3, remainingPoint.rPoint, this._pointPositions[strategy[2]]);
    } else {      
      for (var i = 0, l = this._lines.length; i < l; i++)
        this._lines[0].remove();
    }    
  };

  CanvasController.prototype.drawCentreOfMass = function(remainingPoint) {
    var centerPoint = this._calculator.findCentreOfMass(this._pointPositions, remainingPoint);
    if (this._centreOfMass)
      this._centreOfMass.remove();
    this._centreOfMass = new App.Point({        
      x: centerPoint.x,
      y: centerPoint.y,
      stage: this._stage,
      color: "#f1c40f"        
    });
    this._centreOfMass.draw();
  };

  App.CanvasController = CanvasController;

})();

