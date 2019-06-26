angular.module('controllers',[]).controller('newLibraryCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','AddStock','BossUtil','$filter','Global','GetProductInfoScan',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,AddStock,BossUtil,$filter,Global,GetProductInfoScan) {
            $rootScope.title = "新增入库";
            $scope.sum = $stateParams.sum;
            $scope.invalidDate ="";
            $scope.flag = true;
            $scope.param = {
                startDate : BossUtil.getNowFormatDate(),
                date: [],
                index:"",
                shopStock:[],
                productInfoDate:[]
            };

            if($stateParams.stockStyle=='1'){
                $scope.sum = 1;
                GetProductInfoScan.get({
                    productCode:$stateParams.productCode,
                    shopStoreId:$stateParams.shopStoreId
                },function(data){
                    if(data.result == "0x00001"){
                        $scope.param.productInfoDate = data.responseData;
                        angular.forEach($scope.param.productInfoDate,function (val,index) {
                            var value = {
                                detail:"",
                                invalidDate:val.invalidDate,
                                stockPrice:val.marketPrice,/*进货单价*/
                                shopProcId:val.id,/*产品id*/
                                shopStoreId:$rootScope.shopInfo.shopStoreId,/*仓库id*/
                                stockNumber: "",
                                productCode: val.productCode,
                                productUrl : val.productUrl,
                                productName: val.productName,
                                productUnit: val.productUnit,
                                productSpec: val.productSpec,
                                invalidDateString: val.invalidDate,
                                stockStyle:$stateParams.stockStyle /*0、手动入库 1、扫码入库 2、手动出库 3、扫码出库	*/
                            }
                            $scope.param.shopStock.push(value);
                        })
                    }
                })
            }else{
                angular.forEach($rootScope.shopInfo.entryShopProductList,function (val,index) {
                    var value = {
                        detail:"",
                        invalidDate:val.invalidDate,
                        stockPrice:val.marketPrice,/*进货单价*/
                        shopProcId:val.id,/*产品id*/
                        shopStoreId:$rootScope.shopInfo.shopStoreId,/*仓库id*/
                        stockNumber: "",
                        productCode: val.productCode,
                        productUrl : val.productUrl,
                        productName: val.productName,
                        productUnit: val.productUnit,
                        productSpec: val.productSpec,
                        invalidDateString: val.invalidDate,
                        stockStyle:$stateParams.stockStyle /*0、手动入库 1、扫码入库 2、手动出库 3、扫码出库	*/
                    }
                    $scope.param.shopStock.push(value);
                })
            }
            var disabledDates = [
                new Date(1437719836326),
                new Date(),
                new Date(2015, 7, 10), //months are 0-based, this is August, 10th!
                new Date('Wednesday, August 12, 2015'), //Works with any valid Date formats like long format
                new Date("08-14-2015"), //Short format
                new Date(1439676000000) //UNIX format
            ];
            //方便的年月日设置方式，正和我意，可以随便改了。
            var weekDaysList = ["日", "一", "二", "三", "四", "五", "六"];
            var monthList = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];

            // 日期选择后的回调函数
            var dateShopProductId = '';
            $scope.selDate = function(invalidDate,shopProcId){
                dateShopProductId = shopProcId;
                var shopStock = [];

                angular.forEach($scope.param.shopStock,function (val,index) {
                    if(val.shopProcId == shopProcId){

                        val.invalidDateString = invalidDate;
                        shopStock.push(val);
                    }else{
                        shopStock.push(val);
                    }
                });
                $scope.param.shopStock = shopStock;
            }

            console.log($rootScope.shopInfo.entryShopProductList);
            var datePickerCallback = function (val) {
                if (typeof (val) === 'undefined') {
                } else {
                    console.log( $filter('date')(val, 'yyyy-MM-dd'));
                    console.log(dateShopProductId);
                    angular.forEach($scope.param.shopStock,function (val1,index) {
                        if(val1.shopProcId == dateShopProductId)
                        {
                            val1.invalidDate =  angular.copy($filter('date')(val, 'yyyy-MM-dd'));
                            val1.invalidDateString = angular.copy($filter('date')(val, 'yyyy-MM-dd'));
                        }
                    });
                    console.log($scope.param.shopStock);
                }
            };

            //主体对象
            $scope.datepickerObjectEnd = {
                titleLabel: '选择日期',  //可选
                todayLabel: '今天',  //可选
                closeLabel: '关闭',  //可选
                setLabel: '确定',  //可选
                setButtonType: 'button-assertive',  //可选
                todayButtonType: 'button-assertive',  //可选
                closeButtonType: 'button-assertive',  //可选
                inputDate: new Date(),  //可选，输入值
                mondayFirst: true,  //可选,星期一开头
                disabledDates: disabledDates, //可选
                weekDaysList: weekDaysList, //可选
                monthList: monthList, //可选
                templateType: 'modal', //可选i.e.的模式 modal or popup(兼容模式？)
                showTodayButton: 'true', //可选
                modalHeaderColor: 'bar-positive', //可选
                modalFooterColor: 'bar-positive', //可选
                from: new Date(2008, 8, 2), //可选
                to: new Date(2030, 8, 25),  //可选
                callback: function (val) {  //Mandatory
                    console.log(val)
                    datePickerCallback(val);
                },
                dateFormat: 'yyyy-MM-dd', //可选
                closeOnSelect: true, //可选,设置选择日期后是否要关掉界面。呵呵，原本是false。
            };

            $scope.deleteEntryProduct = function(shopProcId){
                var shopStock = [];
                angular.forEach($scope.param.shopStock,function (val,index) {
                    if(val.shopProcId!=shopProcId){
                        shopStock.push(val);
                    }
                });
                $scope.param.shopStock = shopStock;
                $scope.sum = $scope.sum-1;
            }

            $scope.successfulInventoryGo=function(){
                var timstamp = (new Date).valueOf();
                if($scope.sum>0){
                    if($scope.flag){
                        $scope.flag=false;
                        var list = $scope.param.shopStock;
                        for(var i=0;i<list.length;i++){
                            if(list[i].stockNumber == ''||list[i].invalidDate == ''){/*||list[i].stockPrice == ''  进货单价暂时不是必填项*/
                                alert("请检查信息");
                                $scope.flag=true;
                                return
                            }
                        }
                        $scope.param.shopStock.invalidDateString = $scope.param.shopStock.invalidDate;
                        AddStock.save($scope.param.shopStock,function(data){
                            if(data.result==Global.SUCCESS){
                                $rootScope.shopInfo.entryShopProductList=[];
                                var timstamp = (new Date).valueOf();
                                $state.go("successfulInventory",{id:data.responseData,type:'inbound',dateTime:timstamp})
                            }
                        })
                    }

                }else{
                     alert("入库商品列表不能为空！");
                     $state.go('putInStorage',{name:$stateParams.name,dateTime:timstamp});
                }

            }

            $scope.productPutInStorageMoreGo = function (stockStyle) {
                $state.go("productPutInStorageMore",{stockStyle:stockStyle})
            }

        }])
