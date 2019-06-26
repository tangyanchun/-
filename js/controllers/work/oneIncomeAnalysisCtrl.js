/**
 * Created by Administrator on 2018/5/14.
 */
angular.module('controllers',[]).controller('oneIncomeAnalysisCtrl',
    ['$scope','$rootScope','$stateParams','$state','$filter','BossUtil','Global','GetInComeExpenditureDetail','$ionicLoading','$ionicPopup','$timeout',
        function ($scope,$rootScope,$stateParams,$state,$filter,BossUtil,Global,GetInComeExpenditureDetail,$ionicLoading,$ionicPopup,$timeout) {
            /*日期插件*/
            $scope.param = {
                startDate : BossUtil.getNowFormatDate(),
                date:$stateParams.date,
                sysShopId :$stateParams.sysShopId
            }
            $scope.param.date=$scope.param.date.replace(/00/g,'');
            $scope.param.date=$scope.param.date.replace(/:/g,'');
            console.log($scope.param.date);

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
                    console.log(val);
                    var dateValue = $filter('date')(val, 'yyyy-MM-dd') + " 00:00:00";
                    var d1 = new Date(val);
                    var d2 =  new Date();
                    if(d1<d2){
                        $scope.param.date = $filter('date')(val, 'yyyy-MM-dd');
                        $scope.getInfo();
                    }else{
                        alert("当前时间段无法查询")
                        /*var alertPopup = $ionicPopup.alert({
                         template: '<span style="font-size: 0.3rem;color: #333333;margin-left: 0.2rem">当前时间段无法查询</span>',
                         /!*okText:'确定'*!/
                         });
                         $timeout(function () {
                         alertPopup.close()
                         },1000)*/
                    }

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

            $rootScope.title = "";
            $scope.getInfo = function(){
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                GetInComeExpenditureDetail.get({sysShopId:$stateParams.sysShopId,startTime:$scope.param.date+" 00:00:00",
                    endTime:$scope.param.date+" 23:59:59"},function (data) {
                    $ionicLoading.hide()
                    if(data.result==Global.SUCCESS&&data.responseData!=null){
                        $scope.oneIncomeAnalysis = data.responseData;
                    }else{
                        $scope.oneIncomeAnalysis=[]
                    }
                })
            }
            $scope.getInfo()
        }]);