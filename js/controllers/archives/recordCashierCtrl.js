angular.module('controllers',[]).controller('recordCashierCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','$ionicPopup','Consumes','Global','BossUtil','$filter','$ionicScrollDelegate',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,$ionicPopup,Consumes,Global,BossUtil,$filter,$ionicScrollDelegate) {
            $rootScope.title = "收银记录";

             $scope.param={
               flag:false,
               goodsType:'6',
               timeIndex:0,
               startDate:"",
               endDate: "",
               startEndIndex:'',
               picFlag:false,
                 startValue:"",
                 endValue:"",
                 searchState:'5'
           };
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
                    if($scope.param.startEndIndex==0){
                        $scope.param.startDate = $filter('date')(val, 'yyyy-MM-dd');
                        $scope.param.startValue = $filter('date')(val, 'yyyy-MM-dd')+' 00:00:00'

                    }else{
                        $scope.param.endDate = $filter('date')(val, 'yyyy-MM-dd');
                        $scope.param.endValue = $filter('date')(val, 'yyyy-MM-dd')+' 23:59:59'
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
                closeOnSelect: true //可选,设置选择日期后是否要关掉界面。呵呵，原本是false。
            };

           $scope.sel = function(){
               $ionicScrollDelegate.$getByHandle('dashboard').scrollTop(false);
               $scope.param.flag = true;

           };
           $scope.selType = function(type){
               $scope.param.searchState = type
           }
           $scope.selTime = function(index){
               if(index!=0){
                   fun_date(index);
               }else{
                   $scope.param.startDate = "";
                   $scope.param.endDate = "";
                   $scope.param.startValue=''
                   $scope.param.endValue=''
               }
               $scope.param.timeIndex = index;

           }
           $scope.selStart = function(index){
               $scope.param.startEndIndex = index

           }
           $scope.selTrue = function(){
               var startDate=$scope.param.startDate;
               startDate = startDate.replace(/-/g,"/");//替换字符，变成标准格式
               var endDate = $scope.param.endDate;
               endDate = endDate.replace(/-/g,"/");//替换字符，变成标准格式
               var d1 = new Date(Date.parse(startDate));
               var d2 =  new Date(Date.parse(endDate));
               if(d1>d2){
                   alert("开始时间大于结束时间");
                   return
               }
               $scope.getInfo();
               $scope.param.flag = false;
           };
           $scope.reset = function() {
               $scope.param.goodsType = '6'
               $scope.param.timeIndex = 0
               $scope.param.startDate = ''
               $scope.param.endDate = ''
               $scope.param.searchState = '5';
               $scope.param.startValue=''
               $scope.param.endValue=''
           };
           $scope.disNone = function(){
               $scope.param.flag = false;
           }
            function fun_date(aa){
                var date1 = new Date(), time1=date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();//time1表示当前时间
                $scope.param.endDate = time1
                $scope.param.endValue = time1+' 23:59:59';
                var date2 = new Date(date1);
                date2.setDate(date1.getDate()+aa);
                var time2 = date2.getFullYear()+"-"+(date2.getMonth()+1)+"-"+date2.getDate();
                $scope.param.startDate =time2
                $scope.param.startValue =time2+' 00:00:00'
            }

            $scope.detailsOfCashierGo=function (flowNo) {
                $state.go("detailsOfCashier",{flowNo:flowNo})
            }
            $scope.getInfo = function(){
                if($scope.param.startDate!=''){
                    $scope.param.startDate=$scope.param.startDate
                }
                if($scope.param.endDate!=''){
                    $scope.param.endDate=$scope.param.endDate
                }
                $scope.userConsumeRequest = {
                    consumeType:'0',
                    goodsType:$scope.param.goodsType,
                    pageSize:1000,
                    sysUserId:$stateParams.sysUserId,
                    startTime:$scope.param.startValue,
                    endTime:$scope.param.endValue,
                    searchState:$scope.param.searchState

                }
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                Consumes.save($scope.userConsumeRequest,function(data){
                    $ionicLoading.hide()
                    if(data.result==Global.SUCCESS&&data.responseData!=null){
                        $scope.recordCashier =data.responseData
                        $scope.param.picFlag=false;
                    }else{
                        $scope.param.picFlag=true;
                    }
                    if(data.responseData.length<=0){
                        $scope.param.picFlag=true;
                    }
                })
            }
            $scope.getInfo()

        }]);
