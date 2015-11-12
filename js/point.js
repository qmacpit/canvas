(function(){

  var Point = function(config) {
    var _x = config.x, 
        _y = config.y,
        _color = config.color ? config.color : "#e74c3c",
        _stage = config.stage,
        _onPointPositionChanged = config.onPointPositionChanged,
        _circle;

    function _bindEvents() {      
      if (_onPointPositionChanged) {
        // _circle.on("click", function(event){
        //   console.log("point click")
        //   event.stopPropagation();
        //   event.stopImmediatePropagation();
        //   event.bubbles = false;
        // });
        // _circle.on("mouseUp", function(event){
        //   event.stopPropagation();
        //   event.stopImmediatePropagation();
        // });
        _circle.on("pressmove", function (event) {
          console.log("pressmove")        
          _circle.x = event.stageX;
          _circle.y = event.stageY;        
          _stage.update();
          _onPointPositionChanged(_circle.x, _circle.y);          
        });
      }      
    }

    return {
      draw: function() {        
        _circle = new createjs.Shape();
        _circle
          .graphics
          .beginFill(_color)
          .drawCircle(0, 0, 11);        
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

