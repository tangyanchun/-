angular.module('controllers',[]).controller('outboundCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','GetShopProductLevelInfo','GetProductInfoScan',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,GetShopProductLevelInfo,GetProductInfoScan) {
            $rootScope.title = "出库";
            $scope.sum = 0;
            $scope.param = {
                flag: false,
                type: 0, /*客装产品  易耗品*/
                selType: 2, /*扫码出库  手动出库*/
                indexs: [],/*出库产品*/
                ids:[],
                detailProductList:[],
                searchProductList:[],
                searchContent :"",
                oneLevelList:[],
                twoLevelList:[],
                multiSelectFlag:false,
                selectProductTypeOneId:'',
                selectProductList:'',
            };
            $scope.$on('$ionicView.enter', function() {
                     $rootScope.shopInfo.entryShopProductList = [];
                     $scope.sum = 0;
                     $scope.param.ids = [];
                     $scope.param.indexs = [];
             })

            GetShopProductLevelInfo.get({productType:$scope.param.type},function(data){
                $scope.param.detailProductList = data.responseData.detailProductList;
                $scope.param.oneLevelList = data.responseData.oneLevelList;
                $scope.param.selectProductTypeOneId = $scope.param.oneLevelList[0].productTypeOneId;
                $scope.param.twoLevelList = data.responseData.twoLevelList;
            })

            $scope.changeBtn = function (type) {
                 if($scope.param.type != type){
                    $scope.param.type = type;
                    if($scope.param.multiSelectFlag){
                       GetShopProductLevelInfo.get({productType:type},function(data){

                           $scope.param.oneLevelList = data.responseData.oneLevelList;
                           $scope.param.selectProductTypeOneId = $scope.param.oneLevelList[0].productTypeOneId;
                           $scope.param.twoLevelList = data.responseData.twoLevelList;
                       })
                    }else{
                        $scope.param.multiSelectFlag = !$scope.param.multiSelectFlag;

                        GetShopProductLevelInfo.get({productType:type},function(data){
                           $scope.param.oneLevelList = data.responseData.oneLevelList;
                           $scope.param.selectProductTypeOneId = $scope.param.oneLevelList[0].productTypeOneId;
                           $scope.param.twoLevelList = data.responseData.twoLevelList;
                        })
                    }

                }else{
                  if($scope.param.multiSelectFlag){
                      $scope.param.multiSelectFlag = !$scope.param.multiSelectFlag;
                   }else{
                       $scope.param.multiSelectFlag = !$scope.param.multiSelectFlag;
                       GetShopProductLevelInfo.get({productType:type},function(data){
                           $scope.param.oneLevelList = data.responseData.oneLevelList;
                           $scope.param.selectProductTypeOneId = $scope.param.oneLevelList[0].productTypeOneId;
                           $scope.param.twoLevelList = data.responseData.twoLevelList;
                       })
                   }
                }

            };

            $scope.chooseTwoLevelList = function (productTypeOneId) {
                $scope.param.selectProductTypeOneId = productTypeOneId;
                GetShopProductLevelInfo.get({productType:$scope.param.type},function(data){
                   $scope.param.twoLevelList = data.responseData.twoLevelList;
               })
            }

           /* $scope.selNext = function () {
                $scope.param.flag = true;
            };*/
            $scope.all = function () {
                $scope.param.multiSelectFlag = false;
            };

         /*   $scope.threeMess = function () {
                $scope.param.flag = false;
            }*/

             $.ajax({
                 url:"/weixin/beauty/getBeautyConfig",// 跳转到 action
                 async:true,
                 type:'get',
                 data:{url:location.href.split('#')[0]},//得到需要分享页面的url
                 cache:false,
                 dataType:'json',
                 success:function(data) {
                     var configValue = data.responseData;
                     console.log(configValue);
                     if(configValue!=null ){
                         timestamp = configValue.timestamp;//得到时间戳
                         nonceStr = configValue.nonceStr;//得到随机字符串
                         signature = configValue.signature;//得到签名
                         appid = configValue.appid;//appid

                         //微信配置
                         wx.config({
                             debug: false,
                             appId: appid,
                             timestamp:timestamp,
                             nonceStr: nonceStr,
                            signature: signature,
                             jsApiList: [
                                 'scanQRCode'
                             ] // 功能列表
                         });
                         wx.ready(function () {
                             // config信息验证后会执行ready方法，
                             // 所有接口调用都必须在config接口获得结果之后，
                             // config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，
                             // 则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，
                             // 则可以直接调用，不需要放在ready函数中。
                         })
                     }else{
                     }
                 },
                 error : function() {
                 }
             });

            $scope.selType = function (type) {
                $scope.param.selType = type;
                var timstamp = (new Date).valueOf();
                 if(type=='3'){
                    //扫码出库
                    wx.scanQRCode({
                        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                        scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                        success: function (res) {
                            var result1 = JSON.stringify(res);
                            var result = res.resultStr;
                            GetProductInfoScan.get({
                                productCode:result,
                                shopStoreId:$rootScope.shopInfo.shopStoreId
                            },function(data){
                                 if(data.result == "0x00001"){
                                     $state.go("AddOutbound",{shopStoreId:$rootScope.shopInfo.shopStoreId,stockStyle:$scope.param.selType,name:$stateParams.name,productCode:result,dateTime:timstamp});
                                 }else{
                                    alert("未找到该商品,请先添加该商品！");
                                 }
                            })
                        },
                          error : function() {
                            alert("未查询到此商品,请手动添加！");
                          }
                    });
                }
            }

            $scope.selProduct = function (domIndex,id) {
                if($scope.sum<30){
                    $rootScope.shopInfo.entryShopProductList = [];

                    if($scope.param.type=='0'){
                        $scope.param.selectProductList = '客装产品';
                    } else if($scope.param.type=='1'){
                        $scope.param.selectProductList = '院装产品';
                    } else if($scope.param.type=='2'){
                        $scope.param.selectProductList = '易耗品';
                    }

                    if ($scope.param.indexs.indexOf(domIndex) != -1) {
                        var key = 0;
                        angular.forEach($scope.param.indexs, function (val, index) {
                            if (val == domIndex) {
                                $scope.param.indexs.splice(key, 1);
                                $scope.param.ids.splice(key, 1);
                            }
                            key++;
                        })
                    } else {
                        $scope.param.indexs.push(domIndex);
                        $scope.param.ids.push(id);
                    }

                    var key1 = 0;

                    angular.forEach($scope.param.indexs,function (val,index) {
                        angular.forEach($scope.param.detailProductList,function (val1,index1) {
                            if(val==index1)
                            {
                                $scope.param.selectProductList = $scope.param.selectProductList+','+val1.productTypeTwoName;
                                $rootScope.shopInfo.entryShopProductList.push(val1);
                                key1++;
                            }
                        })
                    })
                   $scope.sum = key1;
                }else{
                    alert("一次性只能选择30种产品");
                }
            };

           /*出库记录*/
            $scope.outboundRecordsGo = function(){

                $state.go("outboundRecords",{shopStoreId:$rootScope.shopInfo.shopStoreId,name:$stateParams.name})
            }

            $scope.search = function(){
                $scope.param.searchProductList = [];
                GetShopProductLevelInfo.get({productType:$scope.param.type},function(data){
                    $scope.param.detailProductList = data.responseData.detailProductList;
                    angular.forEach($scope.param.detailProductList,function (value,key) {
                        if(value.productTypeOneName.indexOf($scope.param.searchContent)!=-1||
                            value.productName.indexOf($scope.param.searchContent)!=-1||
                            (value.productCode+"").indexOf($scope.param.searchContent)!=-1)
                        {
                            $scope.param.searchProductList.push(value);
                        }
                    })
                    $scope.param.detailProductList = angular.copy($scope.param.searchProductList);
                })
            }

            $scope.clearSearch = function()
            {
                $scope.param.searchContent = "";
                GetShopProductLevelInfo.get({productType:$scope.param.type},function(data){
                    $scope.param.detailProductList = data.responseData.detailProductList;
                    $scope.param.oneLevelList = data.responseData.oneLevelList;
                    $scope.param.twoLevelList = data.responseData.twoLevelList;
                })
            }

            $scope.chooseProductList = function (productTypeTwoId) {
                $scope.param.indexs = [];
                $scope.param.ids=[];
                $scope.sum = 0;
                $rootScope.shopInfo.entryShopProductList =[];
                GetShopProductLevelInfo.get({levelOneId:$scope.param.selectProductTypeOneId,
                    levelTwoId:productTypeTwoId,productType:$scope.param.type},function(data){
                    $scope.param.detailProductList = data.responseData.detailProductList;
                    $scope.param.oneLevelList = data.responseData.oneLevelList;
                    $scope.param.twoLevelList = data.responseData.twoLevelList;
                    $scope.param.multiSelectFlag=false;
                })
            }

            /*下一步*/
            $scope.AddOutboundGo = function(){
                var timstamp = (new Date).valueOf();
                if($scope.param.selType=="2"){
                    if($scope.sum>0){
                        if($rootScope.shopInfo.entryShopProductList.length<=0){
                            alert("请选择产品");
                            return
                        }
                        $state.go("AddOutbound",{shopStoreId:$rootScope.shopInfo.shopStoreId,stockStyle:$scope.param.selType,name:$stateParams.name,sum:$scope.sum,dateTime:timstamp})
                    }else{
                        alert("请选择产品");
                        return
                    }

                }else{
                    alert("请切换到手动出库！");
                }

            }

}])