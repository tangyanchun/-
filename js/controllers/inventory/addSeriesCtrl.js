angular.module('controllers',[]).controller('addSeriesCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','TwoLevelProduct','Global','UpdateTwoLevelTypeInfo','$ionicPopup','$timeout','ThreeLevelProduct',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,TwoLevelProduct,Global,UpdateTwoLevelTypeInfo,$ionicPopup,$timeout,ThreeLevelProduct) {
            $rootScope.title = "添加系列";
            $scope.param = {
                selTrue:[]
            };

            $scope.productBrandGo = function () {
                for(var i=0;i<$scope.requestList.length;i++){
                    if($scope.requestList[i].productTypeName==''&&$scope.requestList[i].status=='0'){
                        alert("系列名不能为空")
                       /* var alertPopup = $ionicPopup.alert({
                            template: '<span style="font-size: 0.3rem;color: #333333;margin-left: 0.2rem">系列名不能为空</span>',
                            /!*okText:'确定'*!/
                        });
                        $timeout(function () {
                            alertPopup.close()
                        },1000)*/
                        return
                    }
                }
                var ary =[]
                for(var i=0;i<$scope.requestList.length;i++){
                    if($scope.requestList[i].status==0)
                    ary.push($scope.requestList[i].productTypeName)
                }
                var nary=ary.sort();
                for(var i=0;i<ary.length;i++){
                    if (nary[i]==nary[i+1]){
                        alert(nary[i]+"已存在，请勿重复添加");
                        return
                    }
                }


                var requestList = {
                    requestList:$scope.requestList
                };
                UpdateTwoLevelTypeInfo.save(requestList,function(data){
                    if(data.result == '0x00001'){
                       /* var alertPopup = $ionicPopup.alert({
                            template: '<span style="font-size: 0.3rem;color: #333333;margin-left: 0.2rem">保存成功</span>',
                            /!*okText:'确定'*!/
                        });
                        $timeout(function () {
                            alertPopup.close()
                        },500)*/
                         $state.go("productBrand")
                    }else {
                        alert("修改未成功")
                    }
                })

            };
            $scope.$on('$ionicView.enter', function() {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                TwoLevelProduct.get({
                   id:$stateParams.id
                },function(data){
                    if(data.result==Global.SUCCESS&&data.responseData!=null){
                        $scope.requestList = data.responseData;
                        $ionicLoading.hide();
                        for(var i=0;i<$scope.requestList.length;i++){
                            $scope.requestList[i].parentId = $stateParams.id;
                            $scope.param.selTrue.push(false)
                        }
                    }
                });
            })
            $scope.selBtnShow = function(index){
                $scope.param.selTrue[index] =!$scope.param.selTrue[index]
            };
            $scope.sel = function(index){
                if ($scope.requestList[index].productTypeName=='') {
                    $scope.requestList.splice(index,1)
                }else{
                    $scope.ThreeLevelProduct = $scope.requestList[index];
                    ThreeLevelProduct.get({
                        pageSize:'1',
                        productTypeOneId:$scope.ThreeLevelProduct.parentId,
                        productTypeTwoId:$scope.ThreeLevelProduct.id,
                        status:'0'
                    },function (data) {
                        $scope.product3List = data.responseData;
                        if($scope.product3List && $scope.product3List[0]){
                            alert("对不起，此系列不允许删除");
                            $scope.param.selTrue[index]=false;
                            return false
                        }else{
                            $scope.requestList[index].status = '1'
                        }
                    })
                }

            };
            $scope.addSeriesLis = function(){
                var obj = {
                    status:"0",
                    productTypeName:"",
                    parentId:$stateParams.id

                };
                $scope.requestList.push(obj)
            }



        }])