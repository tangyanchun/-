/**
 * Created by Administrator on 2018/5/5.
 */
angular.module('controllers',[]).controller('projectDetailsCtrl',
    ['$scope','$rootScope','$stateParams','$state','ProjectInfo',
        function ($scope,$rootScope,$stateParams,$state,ProjectInfo) {

            $rootScope.title = "项目详情";
            ProjectInfo.get({id:$stateParams.projectId},function (data) {
                $scope.projectInfo=data.responseData;
                console.log($scope.projectInfo.status);
                if( $scope.projectInfo.status=="0"){
                    $scope.projectInfo.status=" 启用"
                }else {
                    $scope.projectInfo.status="不启用"
                }
                if($scope.projectInfo.cardType=='0'){
                    $scope.projectInfo.cardType="次卡"
                }
                if($scope.projectInfo.cardType=='1'){
                    $scope.projectInfo.cardType="月卡"
                }
                if($scope.projectInfo.cardType=='2'){
                    $scope.projectInfo.cardType="季卡"
                }
                if($scope.projectInfo.cardType=='3'){
                    $scope.projectInfo.cardType="半年卡"
                }
                if($scope.projectInfo.cardType=='4'){
                    $scope.projectInfo.cardType="年卡"
                }

                console.log(data)
            })
        }]);