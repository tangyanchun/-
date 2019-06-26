angular.module('controllers',[]).controller('listOfItemsCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetShopTwoLevelProjectList','Global','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,GetShopTwoLevelProjectList,Global,$ionicLoading) {

            $scope.param = {
                filterStr:"",
                ids:[],
                id:$stateParams.id,
                list:[],
                fuzzyQuery:""

            }
            $scope.searchProject = function () {
                $scope.param.fuzzyQuery='0'
                $scope.getInfo()
            }
            $scope.getInfo = function(){
                    $ionicLoading.show({
                        content: 'Loading',
                        animation: 'fade-in',
                        showBackdrop: true,
                        maxWidth: 200,
                        showDelay: 0
                    });
                GetShopTwoLevelProjectList.get({
                    filterStr:$scope.param.filterStr,
                    pageNo:1,
                    pageSize:1000,
                    fuzzyQuery:$scope.param.fuzzyQuery
                },function (data) {
                    $ionicLoading.hide();
                    if(data.responseData==null){$scope.listOfItems=[]}
                    if(data.result==Global.SUCCESS&&data.responseData!=null){
                        $scope.listOfItems = data.responseData;
                        if($rootScope.settingAddsome.editorCard.shopProjectInfoDTOS !=null){
                            $scope.param.list = $rootScope.settingAddsome.editorCard.shopProjectInfoDTOS
                            for(var i=0;i<$scope.param.list.length;i++){
                                $scope.param.ids.push($scope.param.list[i].id)
                            }
                        }else{
                            $rootScope.settingAddsome.editorCard.shopProjectInfoDTOS=[]
                        }



                    }
                })
            };

                $scope.getInfo()




            $scope.addProject = function (items,index,indexs) {
                if ($scope.param.ids.indexOf(items.id) != -1) {
                    var key = 0;
                    angular.forEach($scope.param.ids, function (val, index) {
                        if (val== items.id) {
                            $scope.param.ids.splice(key, 1)
                            $scope.param.list.splice(key, 1);
                        }
                        key++;
                    })
                } else {
                    $scope.param.ids.push(items.id)
                    $scope.param.list.push(items);

                }
                $scope.allAarketPrice()
            }
            $scope.allAarketPrice = function () {
                $rootScope.settingAddsome.editorCard.initialPrice =0
                for(var i=0;i<$rootScope.settingAddsome.editorCard.shopProjectInfoDTOS.length;i++){
                    $rootScope.settingAddsome.editorCard.initialPrice =$rootScope.settingAddsome.editorCard.initialPrice+($rootScope.settingAddsome.editorCard.shopProjectInfoDTOS[i].oncePrice)*$rootScope.settingAddsome.editorCard.shopProjectInfoDTOS[i].serviceTimes

                }
            }
            $scope.clearSearch = function () {
                $scope.param.filterStr='';
                $scope.getInfo()
            }
            $scope.editorCardGo = function(){
                $rootScope.settingAddsome.editorCard.shopProjectInfoDTOS=$scope.param.list
                $scope.allAarketPrice()
                $state.go($stateParams.url,{id:$scope.param.id})
            }

        }])
