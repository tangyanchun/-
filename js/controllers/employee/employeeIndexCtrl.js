/**
 * Created by Administrator on 2018/5/31.
 */
angular.module('controllers',[]).controller('employeeIndexCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetClerkWorkDetail','Global','BossUtil','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,GetClerkWorkDetail,Global,BossUtil,$ionicLoading) {

            $rootScope.title = "";

            BossUtil.setUserType(Global.userType.BEAUTY_CLERK);
            $scope.param = {
                startDate : BossUtil.getNowFormatDate(),
                date:BossUtil.getNowFormatDate()
            };
            $scope.param.date=$scope.param.date.replace(/00/g,'');
            $scope.param.date=$scope.param.date.replace(/:/g,'');
            $scope.$on('$ionicView.enter', function() {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                GetClerkWorkDetail.get({startTime:$scope.param.date+" 00:00:00",endTime:$scope.param.date+" 23:59:59"},function(data){
                    $ionicLoading.hide();
                    BossUtil.checkResponseData(data,"employeeIndex");
                    if(data.result==Global.SUCCESS&&data.responseData!=null)
                    {
                        $ionicLoading.hide();
                        $scope.workHome = data.responseData;
                    }
                });
            });
           $scope.employeeComprehensive = function () {
               $state.go("employeeComprehensive")
           }

}]);