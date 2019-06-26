/**
 * Created by Administrator on 2018/5/31.
 */
angular.module('controllers',[]).controller('employeeInformationCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetCurrentLoginUserInfo',
        function ($scope,$rootScope,$stateParams,$state,GetCurrentLoginUserInfo) {

            $rootScope.title = "店员资料";

            GetCurrentLoginUserInfo.get(function (data) {
                $scope.userInfo=data.responseData;
                console.log($scope.userInfo);
            });
            
        }]);