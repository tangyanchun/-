/**
 * Created by Administrator on 2018/5/31.
 */
angular.module('controllers',[]).controller('employeeAppointListCtrl',
    ['$scope','$rootScope','$stateParams','$state','BossUtil','$filter','GetClerkScheduleOneDayInfo','GetShopAppointmentInfoByStatus','$ionicLoading','Global',
        function ($scope,$rootScope,$stateParams,$state,BossUtil,$filter,GetClerkScheduleOneDayInfo,GetShopAppointmentInfoByStatus,$ionicLoading,Global) {
          $rootScope.title="我的预约";

            /*日期插件*/
            var date = new Date();
            var seperator1 = "-";
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = year + seperator1 + month + seperator1 + strDate;

            $scope.param =  {
                date: currentdate,
                week:'',
                scheduleDate:'',
                appointList : [],
                picFlag:false/*空白页面的展示 */
            };
                GetClerkScheduleOneDayInfo.get({searchDate:$scope.param.date},function (data) {
                    $scope.param.week = data.responseData.week;
                    $scope.param.scheduleDate = data.responseData.scheduleDate;
                    GetShopAppointmentInfoByStatus.get({searchDate:$scope.param.date},function (data) {
                        if(data.result==Global.SUCCESS&&data.responseData!=null) {
                            $scope.param.appointList = data.responseData;
                            $scope.param.picFlag=false;
                            if(data.responseData.length<=0){
                                $scope.param.picFlag=true;
                            }
                        }else {
                            $scope.param.picFlag=true;
                        }
                        console.log($scope.param.appointList);
                    })
                });

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
                console.log(val);
                if (typeof (val) === 'undefined') {
                } else {
                    $scope.param.date = $filter('date')(val, 'yyyy-MM-dd');
                    GetClerkScheduleOneDayInfo.get({searchDate:$scope.param.date},function (data) {
                        $scope.param.week = data.responseData.week;
                        $scope.param.scheduleDate = data.responseData.scheduleDate;
                        GetShopAppointmentInfoByStatus.get({searchDate:$scope.param.date},function (data) {
                            if(data.result==Global.SUCCESS&&data.responseData!=null) {
                                $scope.param.appointList = data.responseData;
                                $scope.param.picFlag=false;
                                if(data.responseData.length<=0){
                                    $scope.param.picFlag=true;
                                }
                            }else {
                                $scope.param.picFlag=true;
                            }
                            console.log($scope.param.appointList);
                        })
                    })
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
                modalHeaderColor: 'bar-assertive', //可选
                modalFooterColor: 'bar-assertive', //可选
                from: new Date(2008, 8, 2), //可选
                to: new Date(2030, 8, 25),  //可选
                callback: function (val) {  //Mandatory
                    datePickerCallback(val);
                },
                dateFormat: 'yyyy-MM-dd', //可选
                closeOnSelect: true //可选,设置选择日期后是否要关掉界面。呵呵，原本是false。
            };

            $scope.pho=function(num){
                window.location.href = "tel:" + num;
            }
            
            $scope.confirmedGo = function(shopAppointServiceId){
                //这一期暂停
               /*  $state.go("employeeConfirmed",{shopAppointServiceId:shopAppointServiceId})*/
            };
           /*点击已取消预约按钮 查看取消的预约情况*/
            /*$scope.employeeReservation = function(){
               $state.go("employeeReservation")
             }*/

}]);