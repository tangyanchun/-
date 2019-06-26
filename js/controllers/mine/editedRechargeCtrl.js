/**
 * Created by Administrator on 2018/5/5.
 */
angular.module('controllers',[]).controller('editedRechargeCtrl',
    ['$scope','$rootScope','$stateParams','$state','RechargeCardDetail','Global','$http','GetGoodsUseScope','UpdateRechargeCardInfo','ImageBase64UploadToOSS','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,RechargeCardDetail,Global,$http,GetGoodsUseScope,UpdateRechargeCardInfo,ImageBase64UploadToOSS,$ionicLoading) {
            $rootScope.title = "编辑充值卡";
            $scope.param={
                appearArr:[false,false,false],
                status:false,
                id:$stateParams.id
            };

                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                })
                RechargeCardDetail.get({
                    id: $stateParams.id
                }, function (data) {
                    if (data.result == Global.SUCCESS && data.responseData != null) {
                        $rootScope.settingAddsome.editedRecharge = data.responseData;
                        if ($rootScope.settingAddsome.editedRecharge.status == '0') {
                            $scope.param.status = false
                        } else {
                            $scope.param.status = true
                        }
                        GetGoodsUseScope.get({
                            shopRechargeCardId: $stateParams.id
                        }, function (data) {
                            if (data.responseData.timesList != undefined || data.responseData.periodList != undefined || data.responseData.productList != undefined) {
                                $rootScope.settingAddsome.editedRecharge.timesList = data.responseData.timesList;
                                $rootScope.settingAddsome.editedRecharge.periodList = data.responseData.periodList;
                                $rootScope.settingAddsome.editedRecharge.productList = data.responseData.productList;
                            } else {
                                $rootScope.settingAddsome.editedRecharge.timesList = new Array;
                                $rootScope.settingAddsome.editedRecharge.periodList = new Array;
                                $rootScope.settingAddsome.editedRecharge.productList = new Array;
                            }
                            for(var i=0;i<$scope.param.appearArr.length;i++){
                                $scope.param.appearArr[i]=true
                            }
                            if ($rootScope.settingAddsome.editedRecharge.productDiscount==null) {
                                $rootScope.settingAddsome.editedRecharge.productDiscount=1
                            }
                            if ($rootScope.settingAddsome.editedRecharge.periodDiscount==null) {
                                $rootScope.settingAddsome.editedRecharge.periodDiscount=1
                            }
                            if ($rootScope.settingAddsome.editedRecharge.timeDiscount==null) {
                                $rootScope.settingAddsome.editedRecharge.timeDiscount=1
                            }

                            $ionicLoading.hide()


                        })

                    }
                });


            /*上传图片*/
            $scope.reader = new FileReader();   //创建一个FileReader接口
            $scope.thumb = "";      //用于存放图片的base64
            $scope.img_upload = function(files) {
                if($rootScope.settingAddsome.editedRecharge.imageList.length>=6){
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
                        $rootScope.settingAddsome.editedRecharge.imageList.push(data.responseData[0]);
                        $ionicLoading.hide();
                    }
                }).error(function (data) {
                    console.log('upload fail');
                    alert("失败");
                })
            };
            $scope.delPic = function(index){
                $rootScope.settingAddsome.editedRecharge.imageList.splice(index,1)
            }
            $scope. appear=function (index) {
                $scope.param.appearArr[index ] =!$scope.param.appearArr[index ]
            }

            $scope.discount = function(style){
                $rootScope.settingAddsome.editedRecharge[style] = $rootScope.settingAddsome.editedRecharge[style].replace(/[^\d.]/g,'')

            }
            $scope.discounts = function (style) {
                if($rootScope.settingAddsome.editedRecharge[style]!=''&&$rootScope.settingAddsome.editedRecharge[style]!=null){
                    if($rootScope.settingAddsome.editedRecharge[style]>1||$rootScope.settingAddsome.editedRecharge[style]<0.1){
                        $rootScope.settingAddsome.editedRecharge[style] ='';
                        alert('折扣价格范围为0-1')
                    }
                }
            };
            $scope.numLimit=function (style,value) {
                $rootScope.settingAddsome.editedRecharge[style]=value.replace(/[^0-9.0-9]+/,'')
            }
            $scope.save = function () {
                if($rootScope.settingAddsome.editedRecharge.name==""){
                    alert("请填写充值卡名称")
                    return
                }
                if ($rootScope.settingAddsome.editedRecharge.amount == "") {
                    alert("请填写充值面额")
                    return
                }
               /* if($rootScope.settingAddsome.editedRecharge.timeDiscount==''&&$rootScope.settingAddsome.editedRecharge.periodDiscount==''&&$rootScope.settingAddsome.editedRecharge.productDiscount==''&&$rootScope.settingAddsome.editedRecharge.timeDiscount==null&&$rootScope.settingAddsome.editedRecharge.periodDiscount==null&&$rootScope.settingAddsome.editedRecharge.productDiscount==null){
                    alert("请至少选择一个折扣");
                    return
                }*/
               /* if($rootScope.settingAddsome.editedRecharge.timeDiscount!=''&&$rootScope.settingAddsome.editedRecharge.timesList.length<=0&&$rootScope.settingAddsome.editedRecharge.timeDiscount!=null){
                    alert("请填写单次卡适用范围")
                    return
                }*/
                if(($rootScope.settingAddsome.editedRecharge.timeDiscount==''&&$rootScope.settingAddsome.editedRecharge.timesList.length>0)||($rootScope.settingAddsome.editedRecharge.timeDiscount==null&$rootScope.settingAddsome.editedRecharge.timesList.length>0)){
                    alert("请填写单次卡折扣");
                    return
                }
               /* if($rootScope.settingAddsome.editedRecharge.periodDiscount!=''&&$rootScope.settingAddsome.editedRecharge.periodList.length<=0&&$rootScope.settingAddsome.editedRecharge.periodDiscount!=null){
                    alert("请填写疗程卡适用范围")
                    return
                }*/
                if(($rootScope.settingAddsome.editedRecharge.periodDiscount==''&&$rootScope.settingAddsome.editedRecharge.periodList.length>0)||($rootScope.settingAddsome.editedRecharge.periodDiscount==null&&$rootScope.settingAddsome.editedRecharge.periodList.length>0)){
                    alert("请填写疗程卡折扣")
                    return
                }
               /* if($rootScope.settingAddsome.editedRecharge.productDiscount!=''&&$rootScope.settingAddsome.editedRecharge.productList.length<=0&&$rootScope.settingAddsome.editedRecharge.productDiscount!=null){
                    alert("请填写产品适用范围")
                    return
                }*/
                if(($rootScope.settingAddsome.editedRecharge.productDiscount==''&&$rootScope.settingAddsome.editedRecharge.productList.length>0)||($rootScope.settingAddsome.editedRecharge.productDiscount==null&&$rootScope.settingAddsome.editedRecharge.productList.length>0)){
                    alert("请填写产品折扣")
                    return
                }
             if ($scope.param.status == true) {
                    $rootScope.settingAddsome.editedRecharge.status = '1'
                } else {
                    $rootScope.settingAddsome.editedRecharge.status = '0'
                }

                if(($rootScope.settingAddsome.editedRecharge.timesList.length>0&&($rootScope.settingAddsome.editedRecharge.timeDiscount<0.1||$rootScope.settingAddsome.editedRecharge.timeDiscount>1))||
                    ($rootScope.settingAddsome.editedRecharge.productList.length>0&&($rootScope.settingAddsome.editedRecharge.productDiscount<0.1||$rootScope.settingAddsome.editedRecharge.productDiscount>1))||
                    ($rootScope.settingAddsome.editedRecharge.productList.periodList>0&&($rootScope.settingAddsome.editedRecharge.periodDiscount<0.1||$rootScope.settingAddsome.editedRecharge.periodDiscount>1))){
                    return
                }

                UpdateRechargeCardInfo.save($rootScope.settingAddsome.editedRecharge,function (data) {
                    if(data.result==Global.SUCCESS){
                        $state.go("basicSetting")
                    }else{
                        alert("保存未成功")
                    }
                    
                })
            }




        }])