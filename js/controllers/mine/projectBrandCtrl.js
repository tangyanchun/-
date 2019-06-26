/**
 * Created by Administrator on 2018/5/21.
 */
angular.module('controllers',[]).controller('projectBrandCtrl',
    ['$scope','$rootScope','$stateParams','$state','SearchShopProjectList','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,SearchShopProjectList,$ionicLoading) {

            $rootScope.title = "项目类别";
            $scope.addSeriesGo = function(){
                $state.go("projectSeries")
            };
            $scope.addBrandOneGo = function(type,id,projectTypeName,status){
                $state.go("projectSetting",{type:type,id:id,projectTypeName:projectTypeName,status:status});
            };
            $scope.checkSeries=function (id) {
                $state.go("projectSeries",{id:id})
            };
            $scope.$on('$ionicView.enter', function() {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                SearchShopProjectList.get({filterStr:'',useStyle:"2"},function (data) {
                    $ionicLoading.hide();
                    if(data.result=='0x00001'&&data.responseData!=null){
                        $scope.projectBrand = data.responseData.oneAndTwoLevelList
                    }else{
                        $scope.projectBrand=[]
                    }

                })
            })


        }]);