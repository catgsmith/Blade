(function () {
    'use strict';

    angular.module('shoppingApp').controller('ItemsCtrl', ['$scope', 'shoppingApi', '$ionicPopup', ItemsCtrl]);

    function ItemsCtrl($scope, shoppingApi, $ionicPopup) {

        $scope.cart = shoppingApi.getCart(); 
        
        $scope.items = shoppingApi.getAllItems();

        $scope.addItem = function(id) {
            shoppingApi.addItemToCart(id);
        };

        $scope.removeItem = function(id) {
            shoppingApi.removeItemFromCart(id);
        };


        // When change price button is clicked, the popup will be shown...
        $scope.setPrice = function(id) {
            $scope.data = {};
            $scope.priceIsError = false;

            $scope.item = shoppingApi.getItemById(id);

            // Custom popup
            var myPopup = $ionicPopup.show({
                template: '<input type = "text" ng-model = "data.model">',
                title: 'Change Price',
                subTitle: $scope.item.name,
                scope: $scope,

                buttons: [
                    { text: 'Cancel' }, {
                        text: '<b>Save</b>',
                        type: 'button-positive',
                        onTap: function(e) {

                            if (!$scope.data.model || isNaN($scope.data.model) || Number($scope.data.model) < 0) {
                                //don't allow the user to close unless he enters model.
                                if (!$scope.priceIsError) {
                                    $(".popup-sub-title").after("<p id='after_p' style='color:red'>Enter a price below!</p>");
                                    $(".popup-body").children("input:first").css({"color": "red"});
                                    $scope.priceIsError = true;
                                }
                                e.preventDefault();
                            } else {
                                var newPrice = Number($scope.data.model).round(2);
                                return {item:$scope.item, price: newPrice};
                            }
                        }
                    }
                ]
            });

            myPopup.then(function(response) {
                if(response){
                   shoppingApi.setPriceForItem(response.item, response.price);
                }
            });
        };

    } // ItemsCtrl

})();