/**
 * Created by Administrator on 2018/5/2.
 */
angular.module('controllers',[]).controller('attendanceTodayCtrl',
    ['$scope','$rootScope','$stateParams','$state',
        function ($scope,$rootScope,$stateParams,$state) {

            $rootScope.title = "今日考勤";

        }]);