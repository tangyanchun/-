/**
 * Created by Administrator on 2018/5/6.
 */
angular.module('controllers',[]).controller('rechargeListCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetRechargeCardList','Global','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,GetRechargeCardList,Global,$ionicLoading) {

            $rootScope.title = "充值卡列表";
            $scope.param={
                filterStr:''
            }
            $scope.$on('$ionicView.enter', function() {
                $scope.getInfoList()
            });
            $scope.getInfoList = function () {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                GetRechargeCardList.get({
                    pageSize:1000,
                    filterStr:$scope.param.filterStr
                },function(data){
                    if(data.result==Global.SUCCESS&&data.responseData!=null){
                        $ionicLoading.hide();
                        $scope.rechargeList = data.responseData;
                    }else{
                        $scope.rechargeList=[]
                    }

                })
            };
            $scope.clearSearch = function () {
                $scope.param.filterStr=''
                $scope.getInfoList()
            }

            $scope.editedRechargeGo =function (id) {
                $state.go("editedRecharge",{id:id})
            }

        }]);