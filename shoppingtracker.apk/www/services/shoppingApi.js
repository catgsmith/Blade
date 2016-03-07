(function () {
    'use strict';

    angular.module('shoppingApp').factory('shoppingApi', [shoppingApi]);

    function shoppingApi() {
        var total = 0;
        var cart = [];
 
        var items = [
          {name: "Milk (1l)", price: 0.85, id: "DR01", img_thumb: "milk_1L.png"}, 
          {name: "Milk (2l)", price: 1.45, id: "DR02", img_thumb: "milk_2L.png"},  
          {name: "Sliced Loaf (White)", price: 0.71, id: "BK01", img_thumb: "bread_sl-white.png"}, 
          {name: "Sliced Loaf (Granary)", price: 0.80, id: "BK02", img_thumb: "bread_sl-brown.png"},
          {name: "Tea Bags", price: 2.05, id: "BV01", img_thumb: "tea_40bags.png" }];

        function getItemById(id, collection, remove) {
            var item_obj = null;
            var indexes;

            if (collection.length > 0) {
                indexes = $.map(collection, function(obj, index) {
                    if (obj.id == id) {
                        return index;
                    }
                });

                if (indexes.length > 0) {
                    var first = indexes[0];
                    item_obj = collection[first];
                    if(remove !== undefined && remove) {
                      collection.splice(first,1); // remove item from collection
                    }
                }
            }
            return item_obj;
        }


        function getAllItems(){
            return items;
        }

        function addItemToCart(id) {
            var item = getItemById(id, items);
            if (item) {
                total += item.price;
                cart.push(item);
                console.log("~Log: item added to cart - " + item.name);
            }
            return total;
        }
        function removeItemFromCart(id) {
            var item = getItemById(id, cart, true);
            if (item) {
                total -= item.price;
                console.log("~Log: item removed from cart - " + item.name);
            } else {
              console.log("~Log: item not found in cart");
            }
            return total;
        }

        function getCartItems() {
            return cart;
        }

        return {
            getAllItems: getAllItems,
            addItemToCart: addItemToCart,
            removeItemFromCart:removeItemFromCart
        };
    }
})();