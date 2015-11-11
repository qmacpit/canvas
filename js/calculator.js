(function(){

  var POINT_STRATEGY = [
    [0, 1, 2],
    [0, 2, 1],
    [1, 2, 0],
    [1, 0, 2],
    [2, 0, 1],
    [2, 1, 0]
  ];

  App.Calculator = function(canvasWidth, canvasHeight) {
    
    var _canvasWidth = canvasWidth,
        _canvasHeight = canvasHeight,
        _strategyIndex = 0;

    function _calculateRemainingPoint(points) {
      var distanceX_21 = points[1].x - points[0].x,
          distanceY_21 = points[1].y - points[0].y,
          rPoint;

      rPoint = {
        x: points[2].x + distanceX_21,
        y: points[2].y + distanceY_21
      }
      return rPoint;      
    }

    function fitsCanvas(point) {
      // console.log(point.x + "<=" + _canvasWidth )
      // console.log(point.y + "<=" + _canvasHeight )
      // if (point.x < 0 || point.y < 0)
      //   return;
      return (point.x > 0 && point.y > 0)
              && point.x <= _canvasWidth 
              && point.y <= _canvasHeight;
    }

    function pickPointsForStrategy(pointPositions) {
      var currentStrategy = POINT_STRATEGY[_strategyIndex];
      if (!currentStrategy) {
        var i = 0;
        i++;
      }
      return [
        pointPositions[currentStrategy[0]],
        pointPositions[currentStrategy[1]],
        pointPositions[currentStrategy[2]]
      ];
    }

    return {
      calculateRemainingPoint: function(pointPositions){
        var rPoint = _calculateRemainingPoint(pickPointsForStrategy(pointPositions));
        if (fitsCanvas(rPoint))
          return rPoint;        
        for (_strategyIndex = 0; _strategyIndex < POINT_STRATEGY.length; _strategyIndex++) {
          rPoint = _calculateRemainingPoint(pickPointsForStrategy(pointPositions));
          if (fitsCanvas(rPoint))
            return rPoint;
        }        
        _strategyIndex = 0;
      }
    };    
  };

})();