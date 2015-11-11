(function(){

  var Line = function(config) {
    var _start = config.start, 
        _end = config.end, 
        _stage = config.stage,        
        _line;   

    function _needsRedraw(start, end) {
      return (start.x !== _start.x)
              || (end.y !== _end.y)
    }

    return {
      draw: function() {        
        var width = _end.x - _start.x,
            height = _end.y - _start.y;
        _line = new createjs.Shape();        
        _line
          .graphics
          .setStrokeStyle(3, "round", "round")
          .beginStroke("blue")
          .moveTo(_start.x, _start.y)
          .lineTo(_end.x, _end.y);        
        _stage.addChild(_line);                
        _stage.update();
      },
      redraw: function(start, end) {    
        if (_needsRedraw(start, end)) {
          _start = start;
          _end = end;
          this.remove();
          this.draw();
        }            
      },
      remove() {
        _stage.removeChild(_line);
      }
    };
  };

  App.Line = Line;

})();

