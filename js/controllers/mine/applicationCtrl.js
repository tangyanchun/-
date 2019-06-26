/**
 * Created by Administrator on 2018/5/5.
 */
angular.module('controllers',[]).controller('applicationCtrl',
    ['$scope','$rootScope','$stateParams','$state',
        function ($scope,$rootScope,$stateParams,$state) {

            $rootScope.title = "选择适用范围";

        }]);