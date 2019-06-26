/**
 * Created by Administrator on 2018/5/22.
 */
angular.module('controllers',[]).controller('addProjectSeriesCtrl',
    ['$scope','$rootScope','$stateParams','$state','TwoLevelProject',
        function ($scope,$rootScope,$stateParams,$state,TwoLevelProject) {

            $rootScope.title = "";

            TwoLevelProject.get({id:$scope.settingAddsome.extShopProjectInfoDTO.projectTypeOneId},function (data) {
                $scope.seriesList=data.responseData;
                if($scope.seriesList.length<=0){
                    alert("此类别无系列")
                }
            });
            $scope.selectSeries=function (seriesId,seriesName) {
                $rootScope.settingAddsome.extShopProjectInfoDTO.projectTypeTwoId=seriesId
                $rootScope.settingAddsome.extShopProjectInfoDTO.projectTypeTwoName=seriesName
                $state.go($stateParams.url,{projectId:$stateParams.projectId})

            }
            
        }]);