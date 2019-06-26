angular.module('controllers',[]).controller('addProductCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading',
        'BossUtil','$filter','SaveProductInfo','Global','ImageBase64UploadToOSS',
        'GetProductInfoByScanCode','$timeout','$ionicLoading','$http',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,
                  BossUtil,$filter,SaveProductInfo,Global,ImageBase64UploadToOSS,
                  GetProductInfoByScanCode,$timeout,$ionicLoading,$http) {
            $rootScope.title = "添加产品";
            $scope.selFlag =true;
            $scope.setFlag = false;
            $rootScope.settingAddsome.product ={
            productType:"0",
            productTypeOneName:"",
            productTypeOneId:"",
            productTypeTwoName:"",
            productTypeTwoId:"",
            productName:"",
            imageList:[],
            initialPrice:"",
            marketPrice:"",
            productCode:"",
            productSpec:"",
            productUnit:"",
            productPosition:"",
            productFunction:"",
            status:'0',
            introduce:"",
            invalidDate:'',
            effectDate:'',
            qualityPeriod:"",
            productWarningDay:"",
            productWarningNum:"",
            sysShopId:$rootScope.infoShop.sysShopId

        }
            $scope.$on('$ionicView.enter', function() {

            });

               $.ajax({
                 url:"/weixin/beauty/getBeautyConfig",// 跳转到 action
                 async:true,
                 type:'get',
                 data:{url:location.href.split('#')[0]},//得到需要分享页面的url
                 cache:false,
                 dataType:'json',
                 success:function(data) {
                     var configValue = data.responseData;
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


             $scope.scan = function(){
                //扫码添加产品
                wx.scanQRCode({
                    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                    success: function (res) {
                        var result1 = JSON.stringify(res);
                        var result = res.resultStr;
                        GetProductInfoByScanCode.get({
                            code:result
                        },function(data){
                             if(data.result == "0x00001"){
                                $scope.setFlag = true;
                                $rootScope.settingAddsome.product.productName=data.responseData.productName;
                                if(data.responseData.productSpec!=null){
                                    $rootScope.settingAddsome.product.productSpec=data.responseData.productSpec;
                                }
                                if(data.responseData.marketPrice !=null){
                                    $rootScope.settingAddsome.product.marketPrice = data.responseData.marketPrice;
                                }
                                if(data.responseData.productSpecUnit !=null){
                                     $rootScope.settingAddsome.product.productUnit = data.responseData.productSpecUnit;
                                }
                                if(data.responseData.invalidDate!=null){
                                    $rootScope.settingAddsome.product.invalidDate = data.responseData.invalidDate;
                                }
                                if(data.responseData.productCode!=null){
                                    $rootScope.settingAddsome.product.productCode = data.responseData.productCode;
                                }

                             }else{
                                alert("该二维码或条形码无效!");
                             }
                        })

                    },
                     error: function(){
                          alert("未查询到此商品信息,请手动添加！！");
                     }
                });
             }


           /* if($rootScope.settingAddsome.product.status =='0'){
                $scope.selFlag = true
            }else{
                $scope.selFlag = false
            }*/

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
                    var dateValue = $filter('date')(val, 'yyyy-MM-dd') + " 00:00:00";
                    $rootScope.settingAddsome.product.invalidDate = $filter('date')(val, 'yyyy-MM-dd')
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



            $scope.selProductType = function(type){
                $rootScope.settingAddsome.product.productType = type
            }
            /*选择品牌*/
            $scope.selBrandGo = function () {
                $state.go('selBrand',{url:'addProduct'});
            }
            /*选择系列*/
            $scope.selectionSeriesGo=function(){
                if($rootScope.settingAddsome.product.productTypeOneId==''){
                    alert("请先选择品牌")
                    return
                }
                $state.go("selectionSeries",{url:'addProduct'})
            }
            /*选择规格*/
           /* $scope.specificationsGo = function(){
                $state.go("specifications",{url:'addProduct'})

            }*/
            /*选择单位*/
            $scope.unitGo = function(){
                $state.go("unit",{url:'addProduct'})
               ;
            }
            /*适用部位*/
            $scope.applicablePartsGo = function(){
                $state.go("applicableParts",{url:'addProduct'})

            }
            /*选择功效*/
            $scope.efficacyGo = function(){
                $state.go("efficacy",{url:'addProduct'})

            }
            /*上传图片*/
            $scope.reader = new FileReader();   //创建一个FileReader接口
            $scope.thumb = "";      //用于存放图片的base64
            $scope.img_upload = function(files) {
                if($rootScope.settingAddsome.product.imageList.length>=6){
                    alert("图片上传不能大于6张")
                    return
                }
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });


                var form = new FormData();
                // var file = files[0];
                // form.append('file', file);
                for(var i=0;i<files.length;i++){
                    var reader = new FileReader();
                    reader.readAsDataURL(files[i]);
                    form.append("listFile",files[i]);
                }
                form.append('folder', "bossImage");
                $http({
                    method: 'POST',
                    url: '/system/file/imageUploadToOSS',
                    data: form,
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
                }).success(function (data) {
                    if(data.result==Global.SUCCESS&&data.responseData!=null){
                        $rootScope.settingAddsome.product.imageList.push(data.responseData[0]);
                        $ionicLoading.hide();
                    }
                }).error(function (data) {
                    console.log('upload fail');
                    alert("失败");
                })


            };
            $scope.delPic = function(index){
                $rootScope.settingAddsome.product.imageList.splice(index,1)
            };
            $scope.numLimit=function (style,value) {
                $rootScope.settingAddsome.product[style]=value.replace(/[^0-9.0-9]+/,'')
            }




            $scope.save = function(){
                /*if($scope.selFlag ==true){
                    $rootScope.settingAddsome.product.status = '0';
                }else{
                    $rootScope.settingAddsome.product.status = '1';
                }*/
                /* $rootScope.settingAddsome.product.productSpec ==""||  现产品规格不是必填项
                 $rootScope.settingAddsome.product.productUnit ==""|| 单位
                 $rootScope.settingAddsome.product.effectDate ==""|| 生产日期
                 $rootScope.settingAddsome.product.qualityPeriod ==""|| 保质期
                 $rootScope.settingAddsome.product.productWarningDay ==""||   产品有效预警期
                 ||$rootScope.settingAddsome.product.productWarningNum ==""   库存预警数量*/

                if($rootScope.settingAddsome.product.productTypeOneName == ""||$rootScope.settingAddsome.product.productTypeTwoName ==""||$rootScope.settingAddsome.product.productName ==""||$rootScope.settingAddsome.product.initialPrice ==""||$rootScope.settingAddsome.product.marketPrice ==""){
                    alert('信息不完全')
                    return
                }
                if($rootScope.settingAddsome.product.productCode==""){
                    alert('信息不完全')
                    return
                }
                SaveProductInfo.save($rootScope.settingAddsome.product,function(data){
                    if(data.result==Global.SUCCESS&&data.responseData!=null){
                        $state.go("basicSetting")
                        $rootScope.settingAddsome.product ={
                            productType:"0",
                            productTypeOneName:"",
                            productTypeOneId:"",
                            productTypeTwoName:"",
                            productTypeTwoId:"",
                            productName:"",
                            imageList:[],
                            initialPrice:"",
                            marketPrice:"",
                            productCode:"",
                            productSpec:"",
                            productUnit:"",
                            productPosition:"",
                            productFunction:"",
                            status:'0',
                            introduce:"",
                            invalidDate:'',
                            effectDate:'',
                            qualityPeriod:"",
                            productWarningDay:"",
                            productWarningNum:"",
                            sysShopId:$rootScope.infoShop.sysShopId

                        }
                    }else{
                        alert(data.errorInfo);
                        return;
                    }
                })
            }

        }])