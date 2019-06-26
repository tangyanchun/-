angular.module('controllers',[]).controller('importAddressBookCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading) {
            $rootScope.title = "通讯录导入";

        }]);