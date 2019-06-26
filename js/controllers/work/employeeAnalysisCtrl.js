/**
 * Created by Administrator on 2018/5/3.
 */
angular.module('controllers',[]).controller('employeeAnalysisCtrl',
    ['$scope','$rootScope','$stateParams','$state','$filter','BossUtil','GetClerkAchievementList','GetBossShopList','$ionicLoading','Global',
        function ($scope,$rootScope,$stateParams,$state,$filter,BossUtil,GetClerkAchievementList,GetBossShopList,$ionicLoading,Global) {

            $rootScope.title = "员工分析";
             $scope.arr = [];
            /*日期插件*/
            $scope.param = {
                startDate : BossUtil.getNowFormatDate(),
                date: BossUtil.getNowFormatDate(),
                displayShopBox:false,
                sysShopId:'',
                sortBy:"",
                sortRule:"",
                picFlag:false
            }
            $scope.param.date=$scope.param.date.replace(/00/g,'');
            $scope.param.date=$scope.param.date.replace(/:/g,'');

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
                    var dateValue = $filter('date')(val, 'yyyy-MM-dd') + " 00:00:00";
                    $scope.param.date = $filter('date')(val, 'yyyy-MM-dd');
                    $scope.param.sortBy = "";
                    $scope.param.sortRule = '';
                    $scope.getInfo();
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
            var tiemInt = setInterval(function () {
                if($("#tbTest1 thead tr td").length != 0){
                    var ofix1 = new oFixedTable('ofix1', document.getElementById('tbTest1'), {rows: 1, cols: 1});
                    clearTimeout(tiemInt)
                }
            },100)

            $scope.getInfo = function(){
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                GetClerkAchievementList.get({
                    sysShopId:$scope.param.sysShopId,
                    startTime:$scope.param.date.replace(/(^\s*)|(\s*$)/g, "")+' 00:00:00',
                    endTime:$scope.param.date.replace(/(^\s*)|(\s*$)/g, "")+' 23:59:59',
                    sortBy:$scope.param.sortBy,
                    sortRule:$scope.param.sortRule
                },function(data){
                    if(data.result==Global.SUCCESS&&data.responseData!=null) {
                        $ionicLoading.hide();
                        $scope.employeeAnalysis = data.responseData;
                        $scope.param.picFlag=false;
                        if(data.responseData.length<=0){
                            $scope.param.picFlag=true;
                        }
                    }else {
                        $ionicLoading.hide();
                        $scope.param.picFlag=true;
                    }
                })
            }
            $scope.$on('$ionicView.enter', function() {
                $scope.getInfo();
            })
           /* $scope.tabShop=function () {
                $scope.param.displayShopBox=true;
                $scope.param.displayShop=true;
                GetBossShopList.get(function (data) {
                    $scope.shopList=data.responseData;
                });
            };*/
           /* $scope.choseShop = function(id){
                $scope.param.sysShopId = id;
                $scope.param.sortBy = "";
                $scope.param.sortRule = '';
                $scope.getInfo();
                $scope.param.displayShopBox = false;
            };*/
            $scope.sorting =function(sortBy,sortRule){
                $scope.param.sortBy=sortBy;
                $scope.param.sortRule=sortRule;

                $scope.getInfo()

            };
            $scope.noneAll = function () {
                $scope.param.displayShopBox=false;
            }
        }]);