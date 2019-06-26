/**
 * Created by Administrator on 2018/6/1.
 */
angular.module('controllers',[]).controller('employeeTreatmentCardCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','GetUserCourseProjectList',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,GetUserCourseProjectList) {
            $rootScope.title = "疗程卡";
            $scope.param={
                flag:false,
                overdue:"6"
            };

            /*点击筛选*/
            $scope.sel = function(){
                $scope.param.flag = true
            };

            /*点击关闭*/
            $scope.disNone=function () {
                $scope.param.flag = false;
            };

            /*点击选择类型*/
            $scope.selType = function(type){
                $scope.param.overdue = type
            };

            /*点击重置*/
            $scope.reset = function() {
                $scope.param.overdue = '6';
            };

            /*调取疗程卡页面数据*/
            GetUserCourseProjectList.get({cardStyle:"1",sysUserId:$stateParams.sysUserId},function (data) {
                console.log(data);
                $scope.treatmentCard=data.responseData;
                $scope.arr = data.responseData;

            });

            /*点击疗程卡列表跳转到划卡页面*/
            $scope.goTreatmentCard=function (id) {
                $state.go("employeeTreatmentCardDtails",{flowId:id,goodsType:'1'})
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
            };
}]);