/**
 * Created by Administrator on 2018/5/3.
 */
angular.module('controllers',[]).controller('notBeginningCtrl',
    ['$scope','$rootScope','$stateParams','$state',
        function ($scope,$rootScope,$stateParams,$state) {

            $rootScope.title = "预约未开始";

        }]);