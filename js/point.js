(function(){

  var Point = function(x, y) {
    var _x = x, _y = y;

    return {
      draw: function(ctx) {
        ctx.beginPath();
        ctx.arc(x, y, 11, 0, 2 * Math.PI);
        ctx.stroke();
      }
    };
  };

  App.Point = Point;

})();

