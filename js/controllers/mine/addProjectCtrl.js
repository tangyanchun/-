/**
 * Created by Administrator on 2018/5/5.
 */
angular.module('controllers',[]).controller('addProjectCtrl',
    ['$scope','$rootScope','$stateParams','$state','SaveProjectInfo','ImageBase64UploadToOSS','Global','$ionicLoading','$http',
        function ($scope,$rootScope,$stateParams,$state,SaveProjectInfo,ImageBase64UploadToOSS,Global,$ionicLoading,$http) {

            $rootScope.title = "添加项目";
            $scope.param={
                /*selFlag:true*/
            }
            $scope.cardBox=false;/*点击次卡 点击时效卡显示的卡项*/

            $rootScope.settingAddsome.extShopProjectInfoDTO={
                functionIntr:"",/*功能介绍*/
                oncePrice:"",/*单次价格*/
                marketPrice:"",/*办卡价格*/
                projectTypeOneId:'',/*类型id*/
                projectTypeOneName:"",/*类型名称*/
                projectTypeTwoId:"",/*系列id*/
                projectTypeTwoName:"",/*系列名称*/
                serviceTimes:"",/*包含次数*/
                status:"0",/*启动*/
                visitDateTime:"",/*回访次数*/
                projectName:"",/*项目名称*/
                projectDuration:30,/*时长*/
                imageList:[],/*图片*/
                cardType:"0"/*卡的类型*/,
                effectiveNumberMonth:'',/*有效期*/
                useStyle:"0"
            }


           /* if($rootScope.settingAddsome.extShopProjectInfoDTO.status =='0'){
                $scope.selFlag = true
            }else{
                $scope.selFlag = false
            }*/
            /*选择分类*/
            $scope.selectionCategoryGO=function () {
                $state.go("selectionCategory",{url:"addProject"});
            };
            /*选择系列*/
            $scope.projectSeries=function () {
                if($rootScope.settingAddsome.extShopProjectInfoDTO.projectTypeOneId==""){
                    alert("请先选择类别")
                    return
                }
                $state.go("addProjectSeries",{url:"addProject"});
            };
            /*点击时效卡与次卡*/
            $scope.secondaryCard=function (type,timeLength) {
                if(type !='-1'){
                    $rootScope.settingAddsome.extShopProjectInfoDTO.cardType = type;
                    if(type == '0'){
                        $scope.cardBox=false;
                        $rootScope.settingAddsome.extShopProjectInfoDTO.useStyle='0';
                        $rootScope.settingAddsome.extShopProjectInfoDTO.effectiveNumberMonth=''
                    }else if(type=='5'){
                        $rootScope.settingAddsome.extShopProjectInfoDTO.useStyle='1';
                        $rootScope.settingAddsome.extShopProjectInfoDTO.effectiveNumberMonth=''
                    }else{
                        $scope.cardBox=true;
                        $rootScope.settingAddsome.extShopProjectInfoDTO.effectiveNumberMonth = timeLength
                        $rootScope.settingAddsome.extShopProjectInfoDTO.useStyle='1'
                    }
                }else{
                    $rootScope.settingAddsome.extShopProjectInfoDTO.cardType = '4';
                    $rootScope.settingAddsome.extShopProjectInfoDTO.effectiveNumberMonth = 12
                }


            };
            /*上传图片*/
            $scope.reader = new FileReader();   //创建一个FileReader接口
            $scope.thumb = "";      //用于存放图片的base64
            $scope.img_upload = function(files) {
                if( $rootScope.settingAddsome.extShopProjectInfoDTO.imageList.length>=6){
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
                        $rootScope.settingAddsome.extShopProjectInfoDTO.imageList.push(data.responseData[0]);
                        $ionicLoading.hide();
                    }
                }).error(function (data) {
                    console.log('upload fail');
                    alert("失败");
                })


            };
            $scope.delPic = function(index){
                $rootScope.settingAddsome.extShopProjectInfoDTO.imageList.splice(index,1)
            }

         /*添加保存*/
            $scope.Preservation=function () {
                /*if($scope.param.selFlag ==true){
                    $rootScope.settingAddsome.extShopProjectInfoDTO.status = '0';
                }else{
                    $rootScope.settingAddsome.extShopProjectInfoDTO.status = '1';
                }*/
                if($rootScope.settingAddsome.extShopProjectInfoDTO.cardType=='0'){
                    $rootScope.settingAddsome.extShopProjectInfoDTO.serviceTimes ='1'
                }else{
                    if($rootScope.settingAddsome.extShopProjectInfoDTO.serviceTimes ==""){
                         alert("请输入包含次数")
                        return
                    }
                }

                if($rootScope.settingAddsome.extShopProjectInfoDTO.projectTypeTwoName ==""||$rootScope.settingAddsome.extShopProjectInfoDTO.projectTypeOneName ==""||$rootScope.settingAddsome.extShopProjectInfoDTO.projectName ==""||$rootScope.settingAddsome.extShopProjectInfoDTO.projectDuration ==""||$rootScope.settingAddsome.extShopProjectInfoDTO.oncePrice ==""||$rootScope.settingAddsome.extShopProjectInfoDTO.marketPrice ==""){
                   alert("填入的数据不完整")
                   return
               }
                 SaveProjectInfo.save($rootScope.settingAddsome.extShopProjectInfoDTO,function (data) {
                       if(data.result=="0x00001"){
                           $state.go("basicSetting")
                           $rootScope.settingAddsome.extShopProjectInfoDTO={
                               functionIntr:"",/*功能介绍*/
                               oncePrice:"",/*单次价格*/
                               marketPrice:"",/*办卡价格*/
                               projectTypeOneId:'',/*类型id*/
                               projectTypeOneName:"",/*类型名称*/
                               projectTypeTwoId:"",/*系列id*/
                               projectTypeTwoName:"",/*系列名称*/
                               serviceTimes:"",/*包含次数*/
                               status:"0",/*启动*/
                               visitDateTime:"",/*回访次数*/
                               projectName:"",/*项目名称*/
                               projectDuration:30,/*时长*/
                               imageList:[],/*图片*/
                               cardType:"0"/*卡的类型*/,
                               effectiveNumberMonth:'',/*有效期*/
                               useStyle:"0"
                           }
                       }else{
                           alert("保存未成功")
                       }
                   })
            }
            $scope.projectTheLength = function (type) {
                if(type==0){
                    if($rootScope.settingAddsome.extShopProjectInfoDTO.projectDuration/1==30)return
                    $rootScope.settingAddsome.extShopProjectInfoDTO.projectDuration=$rootScope.settingAddsome.extShopProjectInfoDTO.projectDuration/1-30
                }else{
                    $rootScope.settingAddsome.extShopProjectInfoDTO.projectDuration=$rootScope.settingAddsome.extShopProjectInfoDTO.projectDuration/1+30
                }
            }
            $scope.numLimit=function (style,value) {
                $rootScope.settingAddsome.extShopProjectInfoDTO[style]=value.replace(/[^0-9.0-9]+/,'')
            }
        }]);