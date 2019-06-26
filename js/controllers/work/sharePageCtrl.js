angular.module('controllers',[]).controller('sharePageCtrl',
    ['$scope','$rootScope','$stateParams','$state','CheackUser','BossUtil','Global','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,CheackUser,BossUtil,Global,$ionicLoading) {

            $rootScope.title = "分享赚钱";
            $scope.shareDesc = "一个可以分享赚钱的美妆商城";
            $scope.item = "images/share.png";
            BossUtil.setUserType(Global.userType.BEAUTY_BOSS);
            CheackUser.get(function (data) {
                console.log("jinru")
                BossUtil.checkResponseData(data,'sharePage');
                if(data.result==Global.SUCCESS && data.responseData!=null){
                    console.log("chengg")
                    $scope.shareDesc =  "美享99快时尚"
                }else {
                    console.log("失败")
                    alert("请核对老板账号并重新登录");
                    $state.go("bossLogin",{redirectUrl:"sharePage"});
                }
            })
        }])