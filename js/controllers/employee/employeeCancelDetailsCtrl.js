/**
 * Created by Administrator on 2018/5/31.
 */

angular.module('controllers',[]).controller('employeeCancelDetailsCtrl',
    ['$scope','$rootScope','$stateParams','$state',
        function ($scope,$rootScope,$stateParams,$state) {

            $rootScope.title = "取消预约的详情";
        }]);