(function(){

  var LegendController = function() {
    var _container = document.getElementById("legend"),
        _resetLink = document.createElement("a"), 
        _aboutLink = document.createElement("a"), 
        _elements = {};

        _init();

    function _init() {
      _resetLink.innerHTML = "reset"; 
      _resetLink.href = "#"; 

      _aboutLink.innerHTML = "about";
      _aboutLink.href = "#";

      _container.appendChild(_aboutLink);
      _container.appendChild(_resetLink);

      _aboutLink.addEventListener("click", function(){
        alert("author: Maciej Pitucha \nhow to: \n- click on a client area in order to create a point\n- all selected points can be moved around \n- parallelogram will be drawn as soon as it is possible");
      });
    }

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