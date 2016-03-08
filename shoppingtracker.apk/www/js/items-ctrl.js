(function () {
    'use strict';

    angular.module('shoppingApp').controller('ItemsCtrl', ['shoppingApi', ItemsCtrl]);

    function ItemsCtrl(shoppingApi) {
        var vm = this;

        vm.total = 0; 
        
        vm.items = shoppingApi.getAllItems();

        vm.cartItems = shoppingApi.getCartItems();

        vm.addItem = function(id) {
            vm.total = shoppingApi.addItemToCart(id);
        };

        vm.removeItem = function(id) {
            vm.total = shoppingApi.removeItemFromCart(id);
        };
    }
})();