(function(){

  var LegendController = function() {
    var _container = document.getElementById("legend"),
        _resetLink = document.createElement("a"), 
        _aboutLink = document.createElement("a"), 
        _elements = {};

    _resetLink.innerHTML = "reset"; 
    _resetLink.href = "#"; 

    _aboutLink.innerHTML = "about";
    _aboutLink.href = "#";

    _container.appendChild(_aboutLink);
    _container.appendChild(_resetLink);

    function _createElement() {
      var element = document.createElement("span");
      _container.appendChild(element);
      return element;
    }

    return {
      bindReset: function(callback) {
        _resetLink.addEventListener("click", function(){
          callback();
          Object.keys(_elements).forEach(function(key){
            _elements[key].remove();
          });
          _elements = [];          
        });
      },
      report: function(id, data) {
        var element = _elements[id];
        if (!element) {
          element = _createElement();        
          _elements[id] = element
        }
        element.innerHTML = "  " + id + " " + data;
      }
    };
  };

  App.LegendController = LegendController;

})();