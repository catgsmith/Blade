(function () {
    'use strict';

    // toFixed, it always returns the value as a string
    Number.prototype.round = function(p) {
             p = p || 10;
        return parseFloat( this.toFixed(p) );
    };

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
        var cart = {items : [], total: 0}; // bind item collection and total to cart object
 
        var items = [
            new Item("DR01", "Milk (1l)", 0.85, "milk_1L.png"),
            new Item("DR02", "Milk (2l)", 1.45, "milk_2L.png"),
            new Item("BK01", "Sliced Loaf (White)", 0.71, "bread_sl-white.png"),
            new Item("BK02", "Sliced Loaf (Granary)", 0.80, "bread_sl-brown.png"),
            new Item("BV01", "Tea Bags", 2.05, "tea_40bags.png" )
            ];

        // there is only one cart in this model    
        function getCart() {
            return cart;
        }

        function getAllItems(){
            return items;
        }


        function getCartItems() {
            return cart.items;
        }

        function addItemToCart(id) {
            var cartItem;

            var item = getItemById(id, items);
            if (item) {
                // check if item in Cart
                cartItem = getItemById(id, cart.items);
                if (cartItem) {
                    cartItem.qty++;
                    cart.total += cartItem.price;
                } else {
                    cartItem = item.getCartItem();
                    cart.total += item.price;
                    cart.items.push(cartItem);
                    console.log("~Log: item added to cart - " + item.name);

                }
            }
        }

        function removeItemFromCart(id) {
            var cartItem = getItemById(id, cart.items);
            if (cartItem) {
                cartItem.qty--;
                cart.total -= cartItem.price;
                console.log("~Log: item removed from cart - " + cartItem.name);
                if(cartItem.qty === 0) {
                    // remove from cart array 
                    getItemById(id, cart.items, true);
                }
            } else {
              console.log("~Log: item not found in cart");
            }
        }

        function setPriceForItem(item, newPrice) {
            var diff = 0;
            var oldPrice = item.price;

            var cartItem = getItemById(item.id, cart.items);
            if(cartItem) {
                diff = (newPrice - cartItem.price).round(2) * cartItem.qty;
                cartItem.price = newPrice;
            }
            item.price = newPrice;
            cart.total += diff;
            console.log("Changed price for "+response.item.name+" : was " + oldPrice+" now "+newPrice);
        }


        function getItemById(id, collection, remove) {
            var item_obj = null;
            var indexes;
            
            collection = collection || items; // default items array

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
            getCart: getCart,
            getAllItems: getAllItems,
            getCartItems: getCartItems,
            addItemToCart: addItemToCart,
            removeItemFromCart:removeItemFromCart,
            setPriceForItem:setPriceForItem,
            getItemById: getItemById
        };
    }
})();