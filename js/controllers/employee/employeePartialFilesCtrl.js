/**
 * Created by Administrator on 2018/6/1.
 */
angular.module('controllers',[]).controller('employeePartialFilesCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','FindArchives','GetBossShopList',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,FindArchives,GetBossShopList) {

            $rootScope.title = "全院档案";

            $scope.param={
                pageSize:"1000",
                pageNo:"1",
                queryField:""
            };
            $scope.$on('$ionicView.enter', function() {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                FindArchives.get({pageSize:$scope.param.pageSize,pageNo:$scope.param.pageNo,queryField:$scope.param.queryField},function (data) {
                    if(data.result == "0x00001"){
                        $scope.fileList = [];
                        $ionicLoading.hide();
                        $scope.info = data.responseData.info;
                        console.log($scope.info);
                    }
                });
            });


            /*点击跳转到预警档案*/
            $scope.switching=function () {
                $state.go("employeeWarningFile")
            };
            /*点击跳转到 疗程卡 套卡页面*/
            $scope.goActives=function (id) {
                $state.go("employeeArchives",{id:id})
            };
            $scope.checkFileBox=function (id) {
                FindArchives.get({pageSize:$scope.param.pageSize,pageNo:$scope.param.pageNo,queryField:$scope.param.queryField},function (data) {
                    if(data.result == "0x00001"){
                        $scope.fileList = [];
                        $scope.info = data.responseData.info;
                    }
                });
            };
            /*点击放大镜根绝姓名搜索*/
            $scope.search=function () {
                FindArchives.get({pageSize:$scope.param.pageSize,pageNo:$scope.param.pageNo,queryField:$scope.param.queryField},function (data) {
                    console.log(data);
                    if(data.result == "0x00001"){
                        $scope.fileList = [];
                        $scope.info = data.responseData.info;
                        console.log($scope.info);
                    }else{
                        $scope.info=[]
                    }
                });
            };
            /*取消搜索*/
            $scope.clearSearch=function () {
                $scope.param.queryField="";
                FindArchives.get({pageSize:$scope.param.pageSize,pageNo:$scope.param.pageNo,queryField:$scope.param.queryField},function (data) {
                    if(data.result == "0x00001"){
                        $scope.fileList = [];
                        $scope.info = data.responseData.info;
                    }
                });
            }
        }]);