/**
 * Created by Administrator on 2018/5/6.
 */
angular.module('controllers',[]).controller('projectDifferenceCtrl',
    ['$scope','$rootScope','$stateParams','$state',
        function ($scope,$rootScope,$stateParams,$state) {

            $rootScope.title = "综合项目类别";
            $scope.modifyingGo=function () {
             $state.go("modifying")
            }

        }]);