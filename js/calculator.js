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

    function _calcRemainingPoint(points) {
      var distanceX_21 = points[1].x - points[0].x,
          distanceY_21 = points[1].y - points[0].y,
          rPoint;

      rPoint = {
        x: points[2].x + distanceX_21,
        y: points[2].y + distanceY_21
      }
      return rPoint;      
    }

    function _calcLength(start, end) {
      var x = end.x - start.x,
          y = end.y - start.y;
      return Math.sqrt(x*x + y*y);
    }

    function _getLineFunction(point1, point2) {
      var a, b;
      a = (point2.y - point1.y) / (point2.x - point1.x);
      b = point2.y - a * point2.x;
      return {
        a: a,
        b: b
      }
    }

    function _getCrossingPoint(func1, func2) {
      var x = (func1.b - func2.b) / (func2.a - func1.a);
      return {
        x: x,
        y: func1.a * x + func1.b
      }
    }

    function _getParallelFunciton(a, point) {
      var _a = (-1) * (1/a);
      return {
        a: _a,
        b: point.y - _a * point.x
      }; 
    }

    function _calculateArea(pointsForStrategy, rPoint) {
      var hPoint, bPoint, b, bFunc, hFunc, hCrossingPoint, h,
          length01 = _calcLength(pointsForStrategy[0], pointsForStrategy[1]),
          length02 = _calcLength(pointsForStrategy[0], pointsForStrategy[2]);

      if (length01 < length02) {
        hPoint = pointsForStrategy[1];
        bPoint = pointsForStrategy[2];
        b = length02;
      } else {
        hPoint = pointsForStrategy[2];
        bPoint = pointsForStrategy[1];
        b = length01;
      }

      bFunc = _getLineFunction(pointsForStrategy[0], bPoint);
      hFunc = _getParallelFunciton(bFunc.a, hPoint);
      hCrossingPoint = _getCrossingPoint(bFunc, hFunc);
      h = _calcLength(hCrossingPoint, hPoint);
      return h * b;
    }

    function _getRadius(area) {
      return Math.sqrt(area / Math.PI);
    }

    function _fitsCanvas(point) {
      return (point.x > 0 && point.y > 0)
              && point.x <= _canvasWidth 
              && point.y <= _canvasHeight;
    }

    function _pickPointsForStrategy(pointPositions) {
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

    function _calculateRemainingPoint(pointPositions) {
      var pointsForStrategy = _pickPointsForStrategy(pointPositions),
          rPoint = _calcRemainingPoint(pointsForStrategy);
      if (_fitsCanvas(rPoint))
        return {
          rPoint: rPoint,
          strategy: POINT_STRATEGY[_strategyIndex],
          area: _calculateArea(pointsForStrategy, rPoint)
        }
      for (_strategyIndex = 0; _strategyIndex < POINT_STRATEGY.length; _strategyIndex++) {
        pointsForStrategy = _pickPointsForStrategy(pointPositions);
        rPoint = _calcRemainingPoint(pointsForStrategy);
        if (_fitsCanvas(rPoint))
          return {
            rPoint: rPoint,
            strategy: POINT_STRATEGY[_strategyIndex],
            area: _calculateArea(pointsForStrategy, rPoint)
          }
      }        
      _strategyIndex = 0;
    }

    function _findCentreOfMass(pointPositions, rPointData) {
      var currentStrategy = rPointData.strategy,
          rPoint = rPointData.rPoint,
          point = pointPositions[currentStrategy[0]],
          x, y;
      x = Math.abs(point.x - rPoint.x) / 2;
      y = Math.abs(point.y - rPoint.y) / 2;

      if (point.x > rPoint.x)
        x = point.x - x;
      else
        x = point.x + x;

      if (point.y > rPoint.y)
        y = point.y - y;
      else
        y = point.y + y;
      
      return {
        x: x,
        y: y
      };
    }

    function _calculateCircleArea(radius) {
      return Math.PI * radius * radius;
    }

    return {
      getRadius: _getRadius,
      calculateCircleArea: _calculateCircleArea,
      calculateRemainingPoint: _calculateRemainingPoint,
      findCentreOfMass: _findCentreOfMass      
    };    
  };

})();