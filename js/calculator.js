(function(){

  function _calculateRemainingPoint(point1, point2, point3) {
    var distanceX_21 = point2.x - point1.x;
    var distanceY_21 = point2.y - point1.y;

    return {
      x: point3.x + distanceX_21,
      y: point3.y + distanceY_21
    }
  }

  App.Calculator = {
    calculateRemainingPoint: function(pointPositions){
      return _calculateRemainingPoint(
        pointPositions[0],
        pointPositions[1],
        pointPositions[2]
      );
    }
  };

})();