/**
 * Created by Administrator on 2018/6/1.
 */
angular.module('controllers',[]).controller('employeeBranchShopCtrl',
    ['$scope','$rootScope','$stateParams','$state',
        function ($scope,$rootScope,$stateParams,$state) {

            $rootScope.title = "美容院分店";
        }]);