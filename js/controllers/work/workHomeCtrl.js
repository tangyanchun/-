/**
 * Created by Administrator on 2018/5/2.
 */
angular.module('controllers',[]).controller('workHomeCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetBossAchievement','Global','BossUtil','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,GetBossAchievement,Global,BossUtil,$ionicLoading) {

            $rootScope.title = "今日工作";
            BossUtil.setUserType(Global.userType.BEAUTY_BOSS);
            $scope.$on('$ionicView.enter', function() {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay:0
                });
                GetBossAchievement.get({},function(data){
                    $ionicLoading.hide();
                    BossUtil.checkResponseData(data,'workHome');
                    if(data.result==Global.SUCCESS&&data.responseData!=null)
                    {
                        $scope.workHome = data.responseData;
                    }
                })
            })


}])