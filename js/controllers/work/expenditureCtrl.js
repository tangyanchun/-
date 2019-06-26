/**
 * Created by Administrator on 2018/5/2.
 */
angular.module('controllers',[]).controller('expenditureCtrl',
    ['$scope','$rootScope','$stateParams','$state',
        function ($scope,$rootScope,$stateParams,$state) {

            $rootScope.title = "支出明细";

        }])