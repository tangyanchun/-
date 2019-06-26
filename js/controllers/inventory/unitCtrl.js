angular.module('controllers',[]).controller('unitCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading) {
            $rootScope.title = "单位";

            $scope.param = {
                unit:[
                    "瓶",'件','片','盒','支','个','套','只','打','卷','包','桶','箱','袋','双','管','灌'
                ]
            }
            $scope.unit = function (unitName) {
                $state.go($stateParams.url)
                $rootScope.settingAddsome.product.productUnit =unitName
            }

        }])