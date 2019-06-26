/**
 * Created by Administrator on 2018/5/6.
 */
angular.module('controllers',[]).controller('pricesCtrl',
    ['$scope','$rootScope','$stateParams','$state','OneLevelProject','OneLevelProduct','TwoLevelProject','TwoLevelProduct','ThreeLevelProject','ThreeLevelProduct','GetShopProjectGroups','GetRechargeCardList',
        function ($scope,$rootScope,$stateParams,$state,OneLevelProject,OneLevelProduct,TwoLevelProject,TwoLevelProduct,ThreeLevelProject,ThreeLevelProduct,GetShopProjectGroups,GetRechargeCardList) {

            $rootScope.title = "价目表";
            $scope.param={
                flag: false,
                type:"0",/*项目*/
                select:"0",
                typeIndex:"0",
                productTypeOneId:"",//一级产品id
                productTypeTwoId:"",//二级产品id
                projectTypeOneId:"",//一级项目id
                projectTypeTwoId:"",//二级项目id
                pageSize:"10",/*页面大小*/
                productTypeName:"",/*产品名字*/

                oneName:'',
                twoName:''
            };
            $scope.changeBtn = function (type) {
                $scope.param.type = type;
                 if(type=="2"){
                     GetShopProjectGroups.get({
                         pageSize:$scope.param.pageSize
                     },function (data) {
                         $scope.threeList=data.responseData;
                        console.log(data)
                     })
                 }else if(type=="3"){
                     GetRechargeCardList.get({
                         pageSize:$scope.param.pageSize
                     },function (data) {
                         $scope.threeList=data.responseData;
                         console.log(data)
                     })
                 }
            };
            $scope.getInfoProject = function () {
                OneLevelProject.get(function (data) {
                    $scope.projectList=data.responseData;
                    $scope.param.projectTypeOneId=data.responseData[0].id;
                    $scope.param.oneName=data.responseData[0].projectTypeName;
                    TwoLevelProject.get({id:$scope.param.projectTypeOneId},function (data) {
                        $scope.project2List=data.responseData;
                        $scope.param.projectTypeTwoId=data.responseData[0].id;
                        $scope.param.twoName=data.responseData[0].projectTypeName;
                        console.log(data)
                        ThreeLevelProject.get({
                            projectTypeOneId:$scope.param.projectTypeOneId,
                            pageSize:$scope.param.pageSize,
                            projectTypeTwoId:$scope.param.projectTypeTwoId
                        },function (data) {
                            $scope.threeList=data.responseData;
                            for(var i=0;i< $scope.threeList.length;i++){
                                if($scope.threeList[i].cardType=="1"){
                                    $scope.threeList[i].cardType="月卡"
                                }
                                if($scope.threeList[i].cardType=="2"){
                                    $scope.threeList[i].cardType="季卡"
                                }
                                if($scope.threeList[i].cardType=="3"){
                                    $scope.threeList[i].cardType="半年卡"
                                }
                                if($scope.threeList[i].cardType=="4"){
                                    $scope.threeList[i].cardType="年卡"
                                }
                            }

                        })
                    })
                });
            }
            $scope.getInfoProduct = function () {
                OneLevelProduct.get(function (data) {
                    $scope.projectList=data.responseData;
                    $scope.param.productTypeOneId=data.responseData[0].id;
                    $scope.param.oneName=data.responseData[0].productTypeName;
                    TwoLevelProduct.get({id:$scope.param.projectTypeOneId},function (data) {
                        $scope.project2List=data.responseData;
                        $scope.param.productTypeTwoId=data.responseData[0].id;
                        $scope.param.twoName=data.responseData[0].productTypeName;
                        console.log(data)
                        ThreeLevelProduct.get({
                            productTypeOneId:$scope.param.productTypeOneId,
                            pageSize:$scope.param.pageSize,
                            productTypeTwoId:$scope.param.productTypeTwoId
                        },function (data) {
                            $scope.threeList=data.responseData;
                            for(var i=0;i< $scope.threeList.length;i++){
                                if($scope.threeList[i].cardType=="1"){
                                    $scope.threeList[i].cardType="月卡"
                                }
                                if($scope.threeList[i].cardType=="2"){
                                    $scope.threeList[i].cardType="季卡"
                                }
                                if($scope.threeList[i].cardType=="3"){
                                    $scope.threeList[i].cardType="半年卡"
                                }
                                if($scope.threeList[i].cardType=="4"){
                                    $scope.threeList[i].cardType="年卡"
                                }
                            }

                        })
                    })
                });
            }
            $scope.getInfoProject()

            $scope.selNext = function (type) {
                $scope.param.flag = true;
                $scope.param.type= type
                $scope.project2List=[]
                /*调取一级列表*/
                if(type=="0"){
                    $scope.getInfoProject()
                }else{
                    $scope.getInfoProduct()
                }
            };
            /*点击一级列表调取二级列表*/
            $scope.clickFirst=function (index,id,type,projectTypeName,productTypeName) {
                $scope.param.typeIndex = index;/*点击一级列表改变背景色*/
                if(type=="0"){
                    $scope.param.projectTypeOneId=id;
                    TwoLevelProject.get({id:id},function (data) {
                        $scope.project2List=data.responseData;
                       $scope.param.oneName = projectTypeName
                    })
                }else {
                    $scope.param.productTypeOneId=id;
                    TwoLevelProduct.get({id:id},function (data) {
                        $scope.project2List=data.responseData;
                        $scope.param.oneName = productTypeName
                    })
                }

            };
            $scope.dis = function () {
                $scope.param.flag = false;
            }
            /*点击二级*/
            $scope.clickTwo = function (id,type,projectTypeName,productTypeName) {
                $scope.param.flag = false;
                if(type=="0"){
                    console.log(projectTypeName);
                    $scope.param.twoName = projectTypeName
                     ThreeLevelProject.get({
                         projectTypeOneId:$scope.param.projectTypeOneId,
                         pageSize:$scope.param.pageSize,
                         projectTypeTwoId:id
                     },function (data) {
                         $scope.threeList=data.responseData;
                         for(var i=0;i< $scope.threeList.length;i++){
                             if($scope.threeList[i].cardType=="1"){
                                 $scope.threeList[i].cardType="月卡"
                             }
                             if($scope.threeList[i].cardType=="2"){
                                 $scope.threeList[i].cardType="季卡"
                             }
                             if($scope.threeList[i].cardType=="3"){
                                 $scope.threeList[i].cardType="半年卡"
                             }
                             if($scope.threeList[i].cardType=="4"){
                                 $scope.threeList[i].cardType="年卡"
                             }
                         }

                     })
                }else {
                    $scope.param.twoName = productTypeName
                    ThreeLevelProduct.get({
                        productTypeOneId:$scope.param.productTypeOneId,
                        pageSize:$scope.param.pageSize,
                        productTypeTwoId:id
                    },function (data) {
                        $scope.threeList=data.responseData;
                        for(var i=0;i< $scope.threeList.length;i++){
                            if($scope.threeList[i].cardType=="1"){
                                $scope.threeList[i].cardType="月卡"
                            }
                            if($scope.threeList[i].cardType=="2"){
                                $scope.threeList[i].cardType="季卡"
                            }
                            if($scope.threeList[i].cardType=="3"){
                                $scope.threeList[i].cardType="半年卡"
                            }
                            if($scope.threeList[i].cardType=="4"){
                                $scope.threeList[i].cardType="年卡"
                            }
                        }

                    })
                }
            };
            /*点击充值卡跳转到充值卡详情页面*/
            $scope.rechargeDetails=function (rechargeId) {
                $state.go("rechargeDetails",{rechargeId:rechargeId})
            };
             /*点击套卡跳转到套卡详情页面*/
            $scope.tcardDetails=function (cardId) {
                $state.go("tcardDetails",{cardId:cardId})
            } ;
            /*点击项目跳转到项目详情页面*/
            $scope.projectDetails=function (projectId) {
                $state.go("projectDetails",{projectId:projectId})
            };
            /*点击产品跳转到产品详情页面*/
            $scope.priceShopDetails=function (productId) {
                $state.go("priceShopDetails",{productId:productId})
            }
        }]);