angular.module('controllers',[]).controller('addFamilyCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','GetClerkInfoList','Global','GetBossShopList','GetClerkBySearchFile','DelClerkInfo',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,GetClerkInfoList,Global,GetBossShopList,GetClerkBySearchFile,DelClerkInfo) {
            $rootScope.title = "添加家人";
            $scope.param={
                index:0,
                flag:false,
                sysShopId:'',
                searchFile:''
            };
            $scope.$on('$ionicView.enter', function() {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                $scope.search()
            });

            $scope.getInfo=function(){
                GetClerkInfoList.get({
                    sysBossId:"",
                    sysShopId:$scope.param.sysShopId,
                    pageSize:"1000"
                },function(data){
                    if(data.result==Global.SUCCESS&&data.responseData!=null){
                        $ionicLoading.hide();
                        $scope.addFamily = data.responseData
                    }
                })
            };
            $scope.getInfo()



            $scope.addEmployeesGo = function(){
                $state.go('addEmployees')
            }
            $scope.selShop = function () {
                $scope.param.flag = true;
                GetBossShopList.get({},function(data){
                    if(data.result==Global.SUCCESS&&data.responseData!=null) {
                        $scope.shopList = data.responseData;
                    }
                })
            }
            $scope.selShopTrue = function(sysShopId){
                $scope.param.flag = false;
                $scope.param.sysShopId=sysShopId;
                $scope.getInfo()
            }
            $scope.all = function(){
                $scope.param.flag = false;
            }
            $scope.clearSearch = function () {
                $scope.param.searchFile = '';
                $scope.search()
            }
            $scope.search = function () {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                GetClerkBySearchFile.get({
                    searchFile:$scope.param.searchFile
                },function(data){
                    if(data.result==Global.SUCCESS&&data.responseData!=null) {
                        $ionicLoading.hide()
                        $scope.addFamily = data.responseData
                    }
                })
            }
            /*点击删除图标出现弹框*/
            var sysClerkDTO = ''
            $scope.del1 = function (item) {
                sysClerkDTO = item
                $scope.param.delFalse = true;
            }
            $scope.del=function (type) {
                $scope.param.delFalse = false;
                if(type==0){
                    return
                }

                DelClerkInfo.save(sysClerkDTO,function (data) {
                    if(data.result==Global.SUCCESS){
                        if($scope.param.searchFile !=''){
                            $scope.search()
                        }else{
                            $scope.getInfo()
                        }

                    }
                })
            }


        }])
