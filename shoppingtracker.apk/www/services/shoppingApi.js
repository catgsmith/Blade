(function () {
    'use strict';

    angular.module('shoppingApp').factory('shoppingApi', [shoppingApi]);

    function shoppingApi() {
        var total = 0;
 
        var items = [
          {name: "Milk (1l)", price: 0.85, id: "01"}, 
          {name: "Milk (2l)", price: 1.45, id: "02" },  
          {name: "Sliced Loaf (White)", price: 0.70, id: "03" }, 
          {name: "Sliced Loaf (Brown)", price: 0.80, id: "04" },
          {name: "Sliced Loaf (White)", price: 2.05, id: "05" }]; 


        function getAllItems(){
            return items;
        }

        function addItemToCart(id) {
            // TODO : Fetch item value from id
            total += 10.20;
            return total;
        }

        return {
            getAllItems: getAllItems,
            addItemToCart: addItemToCart
        };
    }
})();