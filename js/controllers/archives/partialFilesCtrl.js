angular.module('controllers',[]).controller('partialFilesCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','FindArchives','GetBossShopList','BossUtil','$ionicScrollDelegate','DeleteArchiveInfo',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,FindArchives,GetBossShopList,BossUtil,$ionicScrollDelegate,DeleteArchiveInfo) {
            $rootScope.title = "全院档案";
            $scope.param={
                sysShopId:"",
                pageSize:"10000",
                pageNo:"1",
                queryField:"",
                distributionStart:false /*选择档案的多选框*/,
                delFalse:'' /*点击删除*/,
                sysUserId:'',
                archivesId:''

            };
            $scope.$on('$ionicView.enter', function() {
                $scope.getInfo()
            })

            /*点击跳转到预警档案*/
            $scope.switching=function () {
                $state.go("warningFile")
            };
           $scope.goActives=function (id) {
               $state.go("archives",{id:id})
           };
           /*点击切换档案*/
          /* $scope.tabSwitching=function () {
               $scope.param.blackBox=true;
               $scope.param.fileBOx=true;
               GetBossShopList.get(function (data) {
                   if(data.result == "0x00001"){
                       $ionicScrollDelegate.$getByHandle('dashboard').scrollTop(false);//滚动到顶部
                       $scope.switchingList = [];
                       $scope.switchingList = data.responseData;
                   }
               })
           };*/

            $scope.newUser=function () {
                if($scope.info.length<=0)$scope.param.queryField=''
                $state.go("newUser")
            };
            $scope.distributionStart = function () {
              $scope.param.distributionStart = !$scope.param.distributionStart
            };
         /*搜索*/
            $scope.getInfo = function () {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                FindArchives.get({sysShopId:$scope.param.sysShopId,pageSize:$scope.param.pageSize,pageNo:$scope.param.pageNo,queryField:$scope.param.queryField},function (data) {
                    BossUtil.checkResponseData(data,'partialFiles');
                    $ionicLoading.hide();
                    if(data.result == "0x00001"&&data.responseData!=null){
                        $scope.fileList = [];
                        $ionicScrollDelegate.$getByHandle('dashboard').scrollTop(false);
                        $scope.info = data.responseData.info;
                    }else{
                        $scope.info=[]
                    }
                });
            };
            /*取消搜索*/
            $scope.clearSearch=function () {
                  $scope.param.queryField="";
                  $scope.getInfo()
            };

            $scope.del1 = function (id,sysUserId) {
                $scope.param.archivesId = id;
                $scope.param.sysUserId = sysUserId;
                $scope.param.delFalse = true;
            };
            $scope.del=function (type) {
                $scope.param.delFalse = false;
                if(type==0){
                    return
                }
                DeleteArchiveInfo.get({archivesId:$scope.param.archivesId,userId:$scope.param.sysUserId},function (data) {
                    if(data.result=='0x00001'){
                        $scope.getInfo()
                    }
                })
            }



        }]);