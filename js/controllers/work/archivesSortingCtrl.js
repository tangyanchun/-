angular.module('controllers',[]).controller('archivesSortingCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','FindArchivesByType','BossUtil','$ionicScrollDelegate',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,FindArchivesByType,BossUtil,$ionicScrollDelegate) {
            $rootScope.title = "全院档案";
            $scope.param={
                sysShopId:"",
                pageSize:"10000",
                pageNo:"1",
                queryField:"",
                delFalse:'' ,/*点击删除*/
                findType:'001',
                doru:'0'
            };
            $scope.$on('$ionicView.enter', function() {
                $scope.sorting('001','0')

            });
            $scope.sorting = function (type,style) {
                $scope.param.findType = type;
                $scope.param.doru = style;
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                FindArchivesByType.get({pageSize:$scope.param.pageSize,
                    pageNo:$scope.param.pageNo,queryField:$scope.param.queryField,findType:$scope.param.findType,doru:$scope.param.doru},function (data) {
                    BossUtil.checkResponseData(data,'partialFiles');
                    $ionicLoading.hide();
                    if(data.result == "0x00001"&&data.responseData != null){
                        $scope.fileList = [];
                        $scope.info = data.responseData.info;
                    }else{
                        $scope.info=[]
                    }
                });


            }


            $scope.goActives=function (id) {
                $state.go("archives",{id:id})
            };


        }]);