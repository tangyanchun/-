/**
 * Created by Administrator on 2018/5/31.
 */
angular.module('controllers',[]).controller('employeeConfirmedCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetAppointmentInfoById',
        function ($scope,$rootScope,$stateParams,$state,GetAppointmentInfoById) {

            GetAppointmentInfoById.get({shopAppointServiceId:$stateParams.shopAppointServiceId},function (data) {
                console.log(data);
            })

}]);