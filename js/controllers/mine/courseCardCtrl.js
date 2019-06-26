/**
 * Created by Administrator on 2018/5/6.
 */
angular.module('controllers',[]).controller('courseCardCtrl',
    ['$scope','$rootScope','$stateParams','$state',
        function ($scope,$rootScope,$stateParams,$state) {

            $rootScope.title = "疗程卡";

        }]);