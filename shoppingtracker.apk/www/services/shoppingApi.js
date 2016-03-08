(function () {
    'use strict';

    angular.module('shoppingApp').factory('shoppingApi', [shoppingApi]);

    function Item(id, name, price, img_thumb) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.img_thumb = img_thumb;
    }
    Item.prototype.getCartItem= function() {
        var cartItem = new Item(this.id, this.name, this.price, this.img_thumb);
        cartItem.qty = 1;  // add qty property
        return cartItem;
    };

    function shoppingApi() {
        var total = 0;
        var cart = [];
 
        var items = [
            new Item("DR01", "Milk (1l)", 0.85, "milk_1L.png"),
            new Item("DR02", "Milk (2l)", 1.45, "milk_2L.png"),
            new Item("BK01", "Sliced Loaf (White)", 0.71, "bread_sl-white.png"),
            new Item("BK02", "Sliced Loaf (Granary)", 0.80, "bread_sl-brown.png"),
            new Item("BV01", "Tea Bags", 2.05, "tea_40bags.png" )
            ];

        function getAllItems(){
            return items;
        }


        function getCartItems() {
            return cart;
        }

        function addItemToCart(id) {
            var cartItem;

            var item = getItemById(id, items);
            if (item) {
                // check if item in Cart
                cartItem = getItemById(id, cart);
                if (cartItem) {
                    cartItem.qty++;
                    total += cartItem.price;
                } else {
                    cartItem = item.getCartItem();
                    total += item.price;
                    cart.push(cartItem);
                    console.log("~Log: item added to cart - " + item.name);

                }
            }
            return total;
        }


        function removeItemFromCart(id) {
            var cartItem = getItemById(id, cart);
            if (cartItem) {
                cartItem.qty--;
                total -= cartItem.price;
                console.log("~Log: item removed from cart - " + cartItem.name);
                if(cartItem.qty === 0) {
                    // remove from cart array 
                    getItemById(id, cart, true);
                }
            } else {
              console.log("~Log: item not found in cart");
            }
            return total;
        }


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

        return {
            getAllItems: getAllItems,
            getCartItems: getCartItems,
            addItemToCart: addItemToCart,
            removeItemFromCart:removeItemFromCart
        };
    }
})();