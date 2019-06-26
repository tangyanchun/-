/**
 * Created by Administrator on 2018/5/4.
 */
angular.module('controllers',[]).controller('selectionCategoryCtrl',
    ['$scope','$rootScope','$stateParams','$state','OneLevelProject',
        function ($scope,$rootScope,$stateParams,$state,OneLevelProject) {
            $rootScope.title = "选择类别";

          
            /*调取选择分类的接口*/
            OneLevelProject.get(function (data) {
                if(data.result=='0x00001'&&data.responseData!=null){
                    $scope.selectionCategory=data.responseData;
                }else{
                    $scope.selectionCategory=[]
                }

            });
            $scope.selectType=function (projectTypeOneId,name) {
                $rootScope.settingAddsome.extShopProjectInfoDTO.projectTypeOneName = name
                $rootScope.settingAddsome.extShopProjectInfoDTO.projectTypeOneId = projectTypeOneId
                $rootScope.settingAddsome.extShopProjectInfoDTO.projectTypeTwoName = '';
                $rootScope.settingAddsome.extShopProjectInfoDTO.projectTypeTwoId = '';
                $state.go($stateParams.url,{projectId:$stateParams.projectId})
            }

        }]);