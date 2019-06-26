/**
 * Created by Administrator on 2018/6/14.
 */
angular.module('controllers',[]).controller('employeeAboutMineCtrl',
    ['$scope','$rootScope','$stateParams','$state',
        function ($scope,$rootScope,$stateParams,$state) {

            $rootScope.title = "关于我们";

        }]);