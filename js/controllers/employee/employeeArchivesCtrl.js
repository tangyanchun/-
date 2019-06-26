/**
 * Created by Administrator on 2018/6/1.
 */
angular.module('controllers',[]).controller('employeeArchivesCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','Detail',"Global",
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,Detail,Global) {
            $rootScope.title = "档案";
            $scope.$on('$ionicView.enter', function() {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                Detail.get({
                    id:$stateParams.id
                },function(data){
                    if(data.result==Global.SUCCESS&&data.responseData!=null){
                        $ionicLoading.hide();
                        $scope.archives = data.responseData;
                        console.log($scope.archives);
                    }
                });
            });

            /*点击账户记录跳转到账户详情*/
            $scope.accountRecordsGo=function (sysUserId) {
                $state.go("accountRecords",{sysUserId:sysUserId})
            };
            /*点击产品跳转到产品详情*/
            $scope.goProduct=function (sysShopId,sysUserId) {
                $state.go("product",{sysShopId:sysShopId,sysUserId:sysUserId})
            };
            /*点击疗程卡跳转到来疗程卡页面*/
            $scope.treatmentCardGo=function (sysUserId) {
                $state.go("treatmentCard",{sysUserId:sysUserId})
            };
            /*点击套卡跳转到套卡页面*/
            $scope.collectionCardGo=function (sysUserId) {
                $state.go("collectionCard",{sysUserId:sysUserId})
            };
            /*点击头像跳转到编辑档案页面*/
            $scope.newUserGo=function () {
                $state.go("employeeNewUser",{id:$stateParams.id})
            };
            /*点击总金额跳转到相对应的页面*/
            $scope.refillCardGo=function (sysShopId,sysUserId) {
                $state.go("refillCard",{sysShopId:sysShopId,sysUserId:sysUserId})
            };
            /*点击总欠款跳转到相应的页面*/
           /* $scope.balanceRecordGo=function () {
                $state.go("employeeBalanceRecord")
            };*/

        }]);
