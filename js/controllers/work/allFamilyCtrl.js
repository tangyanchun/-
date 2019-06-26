/**
 * Created by Administrator on 2018/5/2.
 */
angular.module('controllers',[]).controller('allFamilyCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetFamilyList','Global','BossUtil','$filter','$ionicLoading','$timeout',
        function ($scope,$rootScope,$stateParams,$state,GetFamilyList,Global,BossUtil,$filter,$ionicLoading,$timeout) {

            $rootScope.title = "全部家人";
            $scope.param = {
                startDate : $stateParams.startDate,
                endDate:$stateParams.endDate,
                picFlag:false,
                sysShopId:$stateParams.sysShopId
            };
            $scope.param.startDate=$scope.param.startDate.replace(/00/g,'')
            $scope.param.startDate=$scope.param.startDate.replace(/:/g,'')
            $scope.param.endDate=$scope.param.endDate.replace(/00/g,'')
            $scope.param.endDate=$scope.param.endDate.replace(/:/g,'')
            $scope.selDate = function (style) {
                $scope.param.style=style
            }
 /*日期插件*/
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
            var datePickerCallback = function (val) {
                if (typeof (val) === 'undefined') {
                } else {
                    $timeout(function () {
                        $scope.param[$scope.param.style] =$filter('date')(val, 'yyyy-MM-dd');
                    },500)
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
                    datePickerCallback(val);
                },
                dateFormat: 'yyyy-MM-dd', //可选
                closeOnSelect: true, //可选,设置选择日期后是否要关掉界面。呵呵，原本是false。
            };
            $scope.getInfo = function () {
                var d1 = new Date($scope.param.startDate);
                var d2 =  new Date($scope.param.endDate);
                if(d1>d2){
                    alert("开始时间不能大于结束时间");
                    return
                }
                start =d1.getTime();
                end =d2.getTime();
                var time =0
                time =end-start;
                if(Math.floor(time/86400000)>31){
                    alert("最大时间间隔不能超过31天");
                    return
                }
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                })
                GetFamilyList.get({
                    endTime:$scope.param.endDate.replace(/(^\s*)|(\s*$)/g, "")+" 23:59:59",
                    startTime:$scope.param.startDate.replace(/(^\s*)|(\s*$)/g, "")+" 00:00:00",
                    pageSize:1000,
                    sysShopId:$stateParams.sysShopId
                },function(data){
                    if(data.result==Global.SUCCESS&&data.responseData!=null) {
                        $ionicLoading.hide();
                        $scope.allFamily = data.responseData
                        $scope.param.picFlag=false;
                        if(data.responseData.length<=0){
                            $scope.param.picFlag=true;
                        }
                    }else if(data.result==Global.SUCCESS&&data.responseData==null){
                        $ionicLoading.hide();
                        $scope.param.picFlag=true;
                    }
                })
            };
            $scope.beautyAllGo = function (sysShopClerkId) {
                $state.go("beautyAll",{sysClerkId:sysShopClerkId,startDate:param.startDate,endDate:param.endDate,nameType:'allFamily'})
            }

            $scope.$on('$ionicView.enter', function() {
                $scope.getInfo()
            })



        }]);