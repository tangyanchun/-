/**
 * Created by Administrator on 2018/5/3.
 */
angular.module('controllers',[]).controller('cancelDetailsCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetAppointmentInfoById',
        function ($scope,$rootScope,$stateParams,$state,GetAppointmentInfoById) {

            $rootScope.title = "取消预约的详情";
            GetAppointmentInfoById.get({
                shopAppointServiceId:$stateParams.shopAppointServiceId
            },function(data){
                $scope.cancelDetails = data.responseData;
                console.log(data.responseData)
                // if($scope.cancelDetails.shopProjectName.indexOf(";") !=-1){
                //     $scope.cancelDetails.shopProjectName =$scope.cancelDetails.shopProjectName.split(";")
                //     $scope.cancelDetails.appointPeriodDetail =$scope.cancelDetails.appointPeriodDetail.split(";")
                // }

            })
            $scope.pho=function(pho){
                window.location.href = "tel:" + pho;
            }

        }]);