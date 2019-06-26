angular.module('controllers',[]).controller('inventoryRecordsPicsCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','ShopStockRecordList','BossUtil','$filter',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,ShopStockRecordList,BossUtil,$filter) {
            $rootScope.title = "入库记录";
            /*日期插件*/

            $scope.param = {
                startDate : BossUtil.getNowFormatDate(),
                startTime: BossUtil.getNowFormatDate(),/*显示值*/
                endTime: BossUtil.getNowFormatDate(),/*显示值*/
                startValue:BossUtil.getNowFormatDate(),/*传值*/
                endValue:BossUtil.getNowFormatDate(),/*传值*/
                inventoryRecordsPics : [],
                name:$stateParams.name
            }
            $scope.param.startTime=$scope.param.startTime.replace(/00/g,'');
            $scope.param.startTime=$scope.param.startTime.replace(/:/g,'');
            $scope.param.endTime=$scope.param.endTime.replace(/00/g,'');
            $scope.param.endTime=$scope.param.endTime.replace(/:/g,'');

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
            var datePickerCallback = function (val,type) {
                if (typeof (val) === 'undefined') {
                } else {
                    var dateValue = $filter('date')(val, 'yyyy-MM-dd') + " 00:00:00";
                    if(type=="start"){
                        $scope.param.startTime = $filter('date')(val, 'yyyy-MM-dd');
                        $scope.param.startValue = $filter('date')(val, 'yyyy-MM-dd') + " 00:00:00";
                    }else{
                        $scope.param.endTime = $filter('date')(val, 'yyyy-MM-dd');
                        $scope.param.endValue = $filter('date')(val, 'yyyy-MM-dd') + " 23:59:59";
                    }
                    $scope.getInfo();
                }
            };

            //主体对象
            $scope.datepickerObjectStart = {
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
                    datePickerCallback(val,"start");
                },
                dateFormat: 'yyyy-MM-dd', //可选
                closeOnSelect: true, //可选,设置选择日期后是否要关掉界面。原本是false。
            };
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
                    datePickerCallback(val,"end");

                },
                dateFormat: 'yyyy-MM-dd', //可选
                closeOnSelect: true, //可选,设置选择日期后是否要关掉界面，原本是false。
            };

            $scope.getInfo  = function(){
                $scope.shopStockRecordRequestDTO = {
                    endTime:$scope.param.endTime,
                    startTime:$scope.param.startValue,
                    stockStyle:"5",
                    shopStoreId: $stateParams.shopStoreId,
                    pageSize:1000,
                    name:$stateParams.name
                }
                ShopStockRecordList.save($scope.shopStockRecordRequestDTO,function(data){
                    $scope.param.inventoryRecordsPics = data.responseData;
                })
            }
            $scope.getInfo()

            $scope.entryDetailsGo=function(entryId){
                var timstamp = (new Date).valueOf();
                $state.go('entryDetails',{id:entryId,dateTime:timstamp})
            }
        }])
