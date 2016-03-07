(function () {
    'use strict';

    angular.module('shoppingApp').controller('PricesCtrl', ['shoppingApi', PricesCtrl]);

    function PricesCtrl(shoppingApi) {
        var vm = this;

        vm.total = 0; 
        
        vm.items = shoppingApi.getAllItems();

        vm.addItem = function(id) {
            vm.total = shoppingApi.addItemToCart(id);
        };

        vm.removeItem = function(id) {
            vm.total = shoppingApi.removeItemFromCart(id);
        };
    }
})();