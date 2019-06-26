/**
 * Created by Administrator on 2018/5/5.
 */
angular.module('controllers',[]).controller('addrechargeCardCtrl',
    ['$scope','$rootScope','$stateParams','$state','SaveRechargeCardInfo','Global','$ionicLoading','$http',
        function ($scope,$rootScope,$stateParams,$state,SaveRechargeCardInfo,Global,$ionicLoading,$http) {

            $rootScope.title = "添加充值卡";
            $scope.param={
                appearArr:[false,false,false],
                /*status:true*/
            };
            $rootScope.settingAddsome.editedRecharge={
                name:'',
                amount:"",
                imageList:[],
                introduce:'',
                status:'0',
                timesList:[],/*次卡数组id*/
                periodList:[],/*疗程卡数组id*/
                productList:[]/*产品数组id*/,
                timeDiscount:'',/*单次折扣*/
                periodDiscount:'',/*疗程卡折扣*/
                productDiscount:''/*产品折扣*/
            }
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
                if($rootScope.settingAddsome.editedRecharge[style]!=''){
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
               /* if($rootScope.settingAddsome.editedRecharge.timeDiscount==''&&$rootScope.settingAddsome.editedRecharge.periodDiscount==''&&$rootScope.settingAddsome.editedRecharge.productDiscount==''){
                    alert("请至少选择一个折扣")
                    return
                }*/
               /* if($rootScope.settingAddsome.editedRecharge.timeDiscount!=''&&$rootScope.settingAddsome.editedRecharge.timesList.length<=0){
                    alert("请填写单次卡适用范围")
                    return
                }*/
                if($rootScope.settingAddsome.editedRecharge.timeDiscount==''&&$rootScope.settingAddsome.editedRecharge.timesList.length>0){
                    alert("请填写单次卡折扣")
                    return
                }
               /* if($rootScope.settingAddsome.editedRecharge.periodDiscount!=''&&$rootScope.settingAddsome.editedRecharge.periodList.length<=0){
                    alert("请填写疗程卡适用范围")
                    return
                }*/
                if($rootScope.settingAddsome.editedRecharge.periodDiscount==''&&$rootScope.settingAddsome.editedRecharge.periodList.length>0){
                    alert("请填写疗程卡折扣")
                    return
                }
               /* if($rootScope.settingAddsome.editedRecharge.productDiscount!=''&&$rootScope.settingAddsome.editedRecharge.productList.length<=0){
                    alert("请填写产品适用范围")
                    return
                }*/
                if($rootScope.settingAddsome.editedRecharge.productDiscount==''&&$rootScope.settingAddsome.editedRecharge.productList.length>0){
                    alert("请填写产品折扣")
                    return
                }
                console.log($rootScope.settingAddsome.editedRecharge);
                if(($rootScope.settingAddsome.editedRecharge.timesList.length>0&&($rootScope.settingAddsome.editedRecharge.timeDiscount<0.1||$rootScope.settingAddsome.editedRecharge.timeDiscount>1))||
                    ($rootScope.settingAddsome.editedRecharge.productList.length>0&&($rootScope.settingAddsome.editedRecharge.productDiscount<0.1||$rootScope.settingAddsome.editedRecharge.productDiscount>1))||
                    ($rootScope.settingAddsome.editedRecharge.productList.periodList>0&&($rootScope.settingAddsome.editedRecharge.periodDiscount<0.1||$rootScope.settingAddsome.editedRecharge.periodDiscount>1))){
                    alert('请检查信息')
                    return
                }
                SaveRechargeCardInfo.save($rootScope.settingAddsome.editedRecharge, function (data) {
                    if(data.result==Global.SUCCESS){
                        $state.go("basicSetting")
                        $rootScope.settingAddsome.editedRecharge={
                            name:'',
                            amount:"",
                            imageList:[],
                            introduce:'',
                            status:'0',
                            timesList:[],/*次卡数组id*/
                            periodList:[],/*疗程卡数组id*/
                            productList:[]/*产品数组id*/,
                            timeDiscount:'',/*单次折扣*/
                            periodDiscount:'',/*疗程卡折扣*/
                            productDiscount:''/*产品折扣*/
                        }
                    }else{
                        alert("保存未成功")
                    }

                })
            }

        }]);