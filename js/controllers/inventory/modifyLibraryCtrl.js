angular.module('controllers',[]).controller('modifyLibraryCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','UpdateStockNumber','Global','GetProductInfoAndStock',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,UpdateStockNumber,Global,GetProductInfoAndStock) {
            $rootScope.title = "修改";
            $scope.shopStockNumberDTO = {
                id:"11",
                actualStockPrice:"1",
                actualStockNumber:"2"
            };

            GetProductInfoAndStock.get({
                shopProcId:"5",
                shopStoreId:"651742081"
            },function(data){
                if(data.result==Global.SUCCESS&&data.responseData!=null){
                    $scope.modifyLibrary = data.responseData
                }
            })



            $scope.entryDetailsGo = function(){
                UpdateStockNumber.save($scope.shopStockNumberDTO,function(data){
                    if(data.result==Global.SUCCESS&&data.responseData!=null){
                        $state.go("entryDetails")

                    }
                })


            }

        }])
