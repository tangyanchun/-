angular.module('controllers',[]).controller('treatmentCardCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','GetUserCourseProjectList','Global','$ionicScrollDelegate',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,GetUserCourseProjectList,Global,$ionicScrollDelegate) {
            $rootScope.title = "疗程卡";
            $scope.param={
                flag:false,
                overdue:"6",
                picFlag:false
            };
            /*点击筛选*/
            $scope.sel = function(){
                $ionicScrollDelegate.$getByHandle('dashboard').scrollTop(false);
                $scope.param.flag = true;
            };
            /*点击关闭*/
            $scope.disNone=function () {
                $scope.param.flag = false;
            };
            /*点击选择类型*/
            $scope.selType = function(type){
                $scope.param.overdue = type;
            };
            /*点击重置*/
            $scope.reset = function() {
                $scope.param.overdue = '6'
            };
            /*调取疗程卡页面数据*/

                GetUserCourseProjectList.get({cardStyle:"1",sysUserId:$stateParams.sysUserId},function (data) {
                    if(data.result==Global.SUCCESS&&data.responseData!=null){
                        $scope.treatmentCard=data.responseData;
                        $scope.arr = data.responseData;
                        $scope.param.picFlag=false;
                        if(data.responseData.length<=0){
                            $scope.param.picFlag=true;
                        }
                    }else{
                        $scope.param.picFlag=true;
                    }


                });


            /*点击疗程卡列表跳转到划卡页面*/
            $scope.goTreatmentCard=function (id) {
                $state.go("treatmentCardDtails",{flowId:id,goodsType:'1'})
            };
            /*点击确定按钮*/
            $scope.selTrue = function(){
                $scope.param.flag = false;

                $scope.treatmentCard = [];

                if($scope.param.overdue == '6'){
                    $scope.treatmentCard=$scope.arr
                }else{
                    for(var i=0;i<$scope.arr.length;i++){
                        if($scope.arr[i].overdue ==$scope.param.overdue){
                            $scope.treatmentCard.push($scope.arr[i])
                        }
                    }
                }
                if($scope.treatmentCard.length<=0){
                    $scope.param.picFlag=true;
                }else{
                    $scope.param.picFlag=false;
                }

            };
        }]);