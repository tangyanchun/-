/**
 * Created by Administrator on 2018/5/3.
 */
angular.module('controllers',[]).controller('RecordCtrl',
    ['$scope','$rootScope','$stateParams','$state',
        function ($scope,$rootScope,$stateParams,$state) {

            $rootScope.title = "考勤记录";

        }])