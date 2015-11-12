(function(){

  var LegendController = function() {
    var container = document.getElementById("legend"),
        elements = {};

    function _createElement() {
      var element = document.createElement("span");
      container.appendChild(element);
      return element;
    }

    return {
      report: function(id, data) {
        var element = elements[id];
        if (!element) {
          element = _createElement();        
          elements[id] = element
        }
        element.innerHTML = "  " + id + " " + data;
      }
    };
  };

  App.LegendController = LegendController;

})();