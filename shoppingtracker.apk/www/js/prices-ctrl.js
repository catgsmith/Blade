(function () {
    'use strict';

    angular.module('shoppingApp').controller('PricesCtrl', ['shoppingApi', PricesCtrl]);

    function PricesCtrl(shoppingApi) {
        var vm = this;
        
        var data = shoppingApi.getAllItems();

        console.log(data);
        vm.items = data;

        vm.addItem = function(id) {
            shoppingApi.addItemToCart(id);
        };
    }
})();