/**
 * Created by Administrator on 2018/5/6.
 */
angular.module('controllers',[]).controller('warehouseProductsCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetShopProductLevelInfo','Global','$ionicLoading','$ionicScrollDelegate','SearchShopProductList',
        function ($scope,$rootScope,$stateParams,$state,GetShopProductLevelInfo,Global,$ionicLoading,$ionicScrollDelegate,SearchShopProductList) {

            $rootScope.title = "产品";
            $scope.param = {
                flag: false,
                productType:"0",
                levelOneId:"",
                levelTwoId:"",
                twoLevelList:[],
                levelOneName:"",
                levelTwoName:"",
                filterStr:''
            };

            $scope.modifyProductGo = function(id){
                $state.go("modifyProduct",{id:id})
            }

          /*  $scope.changeBtn = function (type) {/!*点击文字*!/
                $scope.param.levelOneId = "";
                $scope.param.levelTwoId = '';
                $scope.param.productType = type;
                $scope.getInfo()

            };*/
            $scope.selNext = function (type) {/*点击小三角*/
                $ionicScrollDelegate.$getByHandle('dashboard').scrollTop(false);
                $scope.param.levelOneId = "";
                $scope.param.levelTwoId='';
                $scope.param.productType = type;
                $scope.param.flag = true;
                $scope.param.oneLevelList = []
                $scope.param.twoLevelList = []
                $scope.getInfo();
            };
            $scope.selTwo = function (productTypeOneId,productTypeOneName) {/*根据一级查询二级*/
                $scope.param.levelOneId = productTypeOneId;
                $scope.param.levelOneName = productTypeOneName;
                $scope.param.twoLevelList = []
                for(var i=0;i<$scope.warehouseProducts.twoLevelList.length;i++){
                    if( $scope.warehouseProducts.twoLevelList[i].productTypeOneId == productTypeOneId){
                        $scope.param.twoLevelList.push($scope.warehouseProducts.twoLevelList[i])
                    }

                }
            }
            $scope.checkThree = function(productTypeTwoId,productTypeTwoName){
                $scope.param.levelTwoId =productTypeTwoId;
                $scope.param.levelTwoName =productTypeTwoName;
                $scope.param.flag = false;
                $scope.getInfo()
            }

            $scope.all = function () {
                $scope.param.flag = false;
            };

            $scope.$on('$ionicView.enter', function() {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                $scope.getInfo()
            })

            $scope.getInfo = function(){
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                $scope.param.filterStr=''
                GetShopProductLevelInfo.get({
                    productType:$scope.param.productType,
                    levelOneId:$scope.param.levelOneId,
                    levelTwoId:$scope.param.levelTwoId,
                },function(data){
                    if(data.result==Global.SUCCESS&&data.responseData!=null){
                        $scope.warehouseProducts = data.responseData;
                        $scope.detailProductList = data.responseData.detailProductList
                        $ionicLoading.hide();
                        if($scope.param.levelOneId == ''){
                        }
                    }
                })
            }
            $scope.tabSwitching = function () {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                SearchShopProductList.get({filterStr:$scope.param.filterStr},function (data) {
                    if(data.result==Global.SUCCESS&&data.responseData!=null){
                        $scope.detailProductList = data.responseData.detailProduct;
                        $ionicLoading.hide();
                        $scope.param.filterStr=''
                    }
                })
            }

        }]);
