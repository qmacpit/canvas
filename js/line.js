(function(){

  var Line = function(config) {
    var _start = config.start, 
        _end = config.end, 
        _stage = config.stage,        
        _line;   

    function _needsRedraw(start, end) {
      // return (start.x !== _start.x)
      //         || (end.y !== _end.y)      
      return true;              
    }

    return {
      draw: function() {        
        var width = _end.x - _start.x,
            height = _end.y - _start.y;
        _line = new createjs.Shape();        
        _line
          .graphics
          .setStrokeStyle(5, "round", "round")
          .beginStroke("#3498db")
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
        } else {
          console.log(start)
          console.log(_start)
          console.log(end)
          console.log(_end)
        }   

      },
      remove() {
        _stage.removeChild(_line);
      }
    };
  };

  App.Line = Line;

})();

