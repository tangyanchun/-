
angular.module('controllers',[]).controller('productScopeCtrl',
    ['$scope','$rootScope','$stateParams','$state','Global','SearchShopProductList',
        function ($scope,$rootScope,$stateParams,$state,Global,SearchShopProductList) {
            $scope.param = {
                productList:[]
            }
            SearchShopProductList.get({
                filterStr:""
            },function(data){
                if(data.result==Global.SUCCESS&&data.responseData!=null) {
                    $scope.productScope = data.responseData

                    if ($rootScope.settingAddsome.editedRecharge.productList.length > 0) {
                        for(var  i=0;i<$rootScope.settingAddsome.editedRecharge.productList.length;i++){
                            $scope.param.productList[i]=$rootScope.settingAddsome.editedRecharge.productList[i].shopGoodsTypeId
                        }
                    } else {
                        for (var i = 0; i < $scope.productScope.detailLevel.length; i++) {
                            for (var key in $scope.productScope.detailLevel[i].levelTwoDetail) {
                                $scope.param.productList.push($scope.productScope.detailLevel[i].levelTwoDetail[key].productTypeTwoId)
                            }
                        }
                    }
                }

            });



            $scope.selProductScope = function (domIndex) {
                if ($scope.param.productList.indexOf(domIndex) != -1) {
                    var key = 0;
                    angular.forEach($scope.param.productList, function (val, index) {
                        if (val == domIndex) {
                            $scope.param.productList.splice(key, 1);
                        }
                        key++;
                    })
                } else {
                    $scope.param.productList.push(domIndex);
                }
            }
            $scope.save = function () {
                if($scope.param.productList.length>0){
                    for(var  i=0;i<$scope.param.productList.length;i++){
                        $rootScope.settingAddsome.editedRecharge.productList[i]={shopGoodsTypeId:$scope.param.productList[i],goodsType:"4"}
                    }
                }else{
                    $rootScope.settingAddsome.editedRecharge.productList=$scope.param.productList
                }
                $state.go($stateParams.url,{id:$stateParams.id})
            }

        }])
