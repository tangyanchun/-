/**
 * Created by Administrator on 2018/5/5.
 */
angular.module('controllers',[]).controller('aboutMineCtrl',
    ['$scope','$rootScope','$stateParams','$state',
        function ($scope,$rootScope,$stateParams,$state) {

            $rootScope.title = "关于我们";

        }]);