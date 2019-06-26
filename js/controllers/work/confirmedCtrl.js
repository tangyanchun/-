/**
 * Created by Administrator on 2018/5/3.
 */
angular.module('controllers',[]).controller('confirmedCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetAppointmentInfoById','UpdateAppointmentInfoById','Global','$ionicPopup','$ionicLoading','$timeout',
        function ($scope,$rootScope,$stateParams,$state,GetAppointmentInfoById,UpdateAppointmentInfoById,Global,$ionicPopup,$ionicLoading,$timeout) {
          /*  $rootScope.title = "已确认预约";*/
            $scope.date=$stateParams.date;
            $scope.$on('$ionicView.enter', function() {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                GetAppointmentInfoById.get({
                    shopAppointServiceId:$stateParams.shopAppointServiceId
                },function(data){
                    $ionicLoading.hide()
                    if(data.result==Global.SUCCESS&&data.responseData!=null){
                        $scope.confirmed = data.responseData;
                        $rootScope.title = $scope.confirmed.sysClerkName;
                    }
                })
            })



            /*日期插件*/

            $scope.cancel = function(){
                var alertPopup = $ionicPopup.alert({
                    template: '<span style="font-size: 0.3rem;color: #333333;">确认取消预约吗？</span>',
                    buttons: [
                        {
                            text: '取消'
                        },
                        {
                            onTap: function() {
                                UpdateAppointmentInfoById.get({
                                    shopAppointServiceId:$stateParams.shopAppointServiceId, /*$stateParams.shopAppointServiceId*/
                                    status:"4"
                                },function(data){
                                    if(data.result==Global.SUCCESS){
                                        $state.go('canceled',{date:$stateParams.date,sysClerkId:$stateParams.sysClerkId,sysShopId:$stateParams.sysShopId})
                                    }
                                })
                            },
                            text: '确认',
                            type: 'button-calm'
                        }
                    ]
                });
            };

            $scope.pho=function(num){
                window.location.href = "tel:" + num;
            }


        }]);