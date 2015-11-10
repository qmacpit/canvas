(function(){

  var Point = function(config) {
    var _x = config.x, 
        _y = config.y,
        _stage = config.stage,
        _onPointPositionChanged = config.onPointPositionChanged,
        _circle;

    function _bindEvents() {
      // _circle.on("mousedown", function (event) {
      //   event.stopPropagation();
      //   event.preventDefault();
      //   console.log("mouse down")
      //   // this.parent.addChild(this);
      //   // this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
      // });
      if (_onPointPositionChanged) {
        _circle.on("pressmove", function (event) {
          console.log("pressmove")        
          _circle.x = event.stageX;
          _circle.y = event.stageY;        
          _stage.update();
          _onPointPositionChanged(_circle.x, _circle.y);
          // this.y = evt.stageY + this.offset.y;
          // // indicate that the stage should be updated on the next tick:
          // update = true;
        });
      }      
    }

    return {
      draw: function() {        
        _circle = new createjs.Shape();
        _circle.graphics.beginFill("red").drawCircle(0, 0, 11);        
        _circle.x = _x;
        _circle.y = _y;        
        _stage.addChild(_circle);        
        _bindEvents();
        _stage.update();
      },
      remove() {
        _stage.removeChild(_circle);
      }
    };
  };

  App.Point = Point;

})();

