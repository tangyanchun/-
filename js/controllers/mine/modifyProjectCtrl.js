/**
 * Created by Administrator on 2018/5/5.
 */
angular.module('controllers',[]).controller('modifyProjectCtrl',
    ['$scope','$rootScope','$stateParams','$state','ProjectInfo','UpdateProjectInfo','ImageBase64UploadToOSS','Global','$ionicLoading','$http',
        function ($scope,$rootScope,$stateParams,$state,ProjectInfo,UpdateProjectInfo,ImageBase64UploadToOSS,Global,$ionicLoading,$http) {

            $rootScope.title = "修改项目";
            $scope.param={
                projectId:$stateParams.projectId,/*接受项目列表穿过的id*/

                secondary:"",
                timeLength:"",
            };

            $scope.selectionCategoryGO = function () {
                $state.go("selectionCategory",{projectId:$scope.param.projectId,url:'modifyProject'})
            }
            $scope.addProjectSeriesGo = function () {
                $state.go("addProjectSeries",{projectId:$scope.param.projectId,url:'modifyProject'})
            };
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            })
            ProjectInfo.get({id:$scope.param.projectId},function (data) {
                if(data.result == '0x00001'){
                    $ionicLoading.hide()
                    $scope.settingAddsome.extShopProjectInfoDTO=data.responseData;
                    if($rootScope.settingAddsome.extShopProjectInfoDTO.status=="1"){
                        $scope.param.status=true
                    }else {
                        $scope.param.status=false
                    }
                }
            });

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
                if($rootScope.settingAddsome.extShopProjectInfoDTO.imageList.length>=6){
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
            };
            $scope.projectTheLength = function (type) {
                if(type==0){
                    if($rootScope.settingAddsome.extShopProjectInfoDTO.projectDuration/1==30)return
                    $rootScope.settingAddsome.extShopProjectInfoDTO.projectDuration=$rootScope.settingAddsome.extShopProjectInfoDTO.projectDuration/1-30
                }else{
                    $rootScope.settingAddsome.extShopProjectInfoDTO.projectDuration=$rootScope.settingAddsome.extShopProjectInfoDTO.projectDuration/1+30
                }
            };
            $scope.numLimit=function (style,value) {
                $rootScope.settingAddsome.extShopProjectInfoDTO[style]=value.replace(/[^0-9.0-9]+/,'')
            }
            /*点击保存调取接口*/

            $scope.Preservation=function () {
                if($scope.param.status==true){/*如果为true显示不启动，反之启动*/
                    $rootScope.settingAddsome.extShopProjectInfoDTO.status="1"
                }else {
                    $rootScope.settingAddsome.extShopProjectInfoDTO.status ='0'
                }
                if($rootScope.settingAddsome.extShopProjectInfoDTO.cardType=='0'){
                    $rootScope.settingAddsome.extShopProjectInfoDTO.serviceTimes ='1'
                }
                if($rootScope.settingAddsome.extShopProjectInfoDTO.projectTypeOneName ==''||$rootScope.settingAddsome.extShopProjectInfoDTO.projectTypeTwoName ==''||$rootScope.settingAddsome.extShopProjectInfoDTO.projectName ==''||$rootScope.settingAddsome.extShopProjectInfoDTO.projectDuration ==''||$rootScope.settingAddsome.extShopProjectInfoDTO.oncePrice ==''||$rootScope.settingAddsome.extShopProjectInfoDTO.serviceTimes==''){
                    alert("请检查信息")
                    return
                }



                UpdateProjectInfo.save($scope.settingAddsome.extShopProjectInfoDTO,function (data) {
                    if(data.result=="0x00001"){
                      $state.go("projectList")
                    }else{
                        alert("保存未成功")
                    }
                })
            }
        }]);