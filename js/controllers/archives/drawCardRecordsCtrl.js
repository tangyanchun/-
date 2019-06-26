angular.module('controllers',[]).controller('drawCardRecordsCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','UserStampCardRecordList','Global',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,UserStampCardRecordList,Global) {
            $rootScope.title = "划卡记录";
            $scope.param={
                picFlag:false
            }
           $scope.goDrawCardRecordsDetail=function (flowNo) {
               $state.go("drawCardRecordsDetail",{flowNo:flowNo})
           }
            $scope.$on('$ionicView.enter', function() {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                UserStampCardRecordList.get({sysUserId:$stateParams.sysUserId},function(data){
                    $ionicLoading.hide()
                    if(data.result==Global.SUCCESS&&data.responseData!=null){
                        $scope.recordCashier =data.responseData
                        $scope.param.picFlag=false;
                        if(data.responseData.length<=0){
                            $scope.param.picFlag=true;
                        }
                    }else{
                        $scope.param.picFlag=true;
                    }
                })
            })

        }]);