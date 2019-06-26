/**
 * Created by Administrator on 2018/5/6.
 */
angular.module('controllers',[]).controller('projectListRadioCtrl',
    ['$scope','$rootScope','$stateParams','$state',
        function ($scope,$rootScope,$stateParams,$state) {

            $rootScope.title = "项目列表";

        }]);