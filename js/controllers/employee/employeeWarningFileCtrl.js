/**
 * Created by Administrator on 2018/6/1.
 */
angular.module('controllers',[]).controller('employeeWarningFileCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','GetEarlyWarningList','Global',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,GetEarlyWarningList,Global) {

            $rootScope.title = "预警档案";
            $scope.queryType = "one";
            $scope.archiveCount = 0;

            $scope.chooseTab = function(type){
                $scope.queryType = type;
                $scope.archiveCount = 0;
                $scope.getInfo()
            };

            $scope.getInfo = function(){
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                GetEarlyWarningList.get({
                    pageNo:1,
                    pageSize:100,
                    queryType:$scope.queryType
                },function(data){
                    if(data.result==Global.SUCCESS&&data.responseData!=null){
                        $ionicLoading.hide();
                        $scope.warningFile = data.responseData;
                        $scope.param.picFlag=false;
                        if(data.responseData.length<=0){
                            $scope.param.picFlag=true;
                        }
                    }else if(data.result==Global.SUCCESS&&data.responseData==null){
                        $ionicLoading.hide();
                        $scope.param.picFlag=true;
                    }
                })
            };

            $scope.$on('$ionicView.enter', function() {
                $scope.param={
                    picFlag:false
                };
                $scope.getInfo()
            });

            $scope.archivesGo = function(id){
                $state.go("employeeArchives",{id:id})
            }

        }]);
