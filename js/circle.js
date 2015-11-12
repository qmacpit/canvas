(function(){

  var Circle = function(config) {
    var _point = config.point, 
        _radius = config.radius, 
        _stage = config.stage,
        _circle;

    return {
      draw: function() {        
        _circle = new createjs.Shape();
        _circle
          .graphics
          .setStrokeStyle(5)
          .beginStroke("#f1c40f")
          .drawCircle(_point.x, _point.y, _radius);
        _stage.addChild(_circle);
        _stage.update();        
      },
      redraw: function(point, radius) {   
        _point = point; 
        _radius = radius; 
        this.remove();
        this.draw();      
      },
      remove() {
        _stage.removeChild(_circle);
        _stage.update();
      }
    };
  };

  App.Circle = Circle;

})();

